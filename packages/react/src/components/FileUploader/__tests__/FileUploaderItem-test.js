/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import { getByLabel, getByText } from '@carbon/test-utils/dom';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { FileUploaderItem } from '../';
import { keys } from '../../../internal/keyboard';

const statuses = ['uploading', 'edit', 'complete'];

describe('FileUploaderItem', () => {
  describe('automated accessibility tests', () => {
    it.each(statuses)(
      'should have no axe violations with status %s',
      async (status) => {
        const { container } = render(
          <FileUploaderItem uuid="test" name="test" status={status} />
        );
        await expect(container).toHaveNoAxeViolations();
      }
    );
  });

  it('should support calling `onDelete` if the user interacts with the filename during editing', () => {
    const onDelete = jest.fn();
    const description = 'test-description';
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const edit = render(
      <FileUploaderItem
        uuid="edit"
        name="edit"
        iconDescription={description}
        status="edit"
        onDelete={onDelete}
      />
    );

    let removeFile = getByLabel(edit.container, 'test-description - edit');
    Simulate.click(removeFile);
    expect(onDelete).toHaveBeenCalledTimes(1);

    Simulate.keyDown(removeFile, keys.Enter);
    expect(onDelete).toHaveBeenCalledTimes(2);

    Simulate.keyDown(removeFile, keys.Space);
    expect(onDelete).toHaveBeenCalledTimes(3);

    onDelete.mockReset();

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const uploading = render(
      <FileUploaderItem
        uuid="uploading"
        name="uploading"
        iconDescription={description}
        status="uploading"
        onDelete={onDelete}
      />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    removeFile = getByText(uploading.container, description);

    Simulate.click(removeFile);
    expect(onDelete).not.toHaveBeenCalled();

    Simulate.keyDown(removeFile, keys.Enter);
    expect(onDelete).not.toHaveBeenCalled();

    Simulate.keyDown(removeFile, keys.Space);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('should enable the replace button when the singleUpload prop is true', () => {
    render(
      <FileUploaderItem
        uuid="edit"
        name="edit"
        iconDescription="description"
        status="edit"
        singleUpload
      />
    );

    expect(screen.getByLabelText('Replace')).toBeInTheDocument();
  });
});
