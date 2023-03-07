/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import AccordionItem from './AccordionItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('AccordionItem', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<AccordionItem data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render and match snapshot', () => {
      const { container } = render(
        <AccordionItem title="Test title" className="extra-class">
          Lorem ipsum.
        </AccordionItem>
      );

      expect(container).toMatchSnapshot();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<AccordionItem className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(<AccordionItem title="Test title" disabled />);

      expect(screen.getByText('Test title')).toBeDisabled();
    });

    it('should call onClick when expected', () => {
      const onClick = jest.fn();
      render(<AccordionItem title="Test title" onClick={onClick} />);

      userEvent.click(screen.getByText('Test title'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should call onHeadingClick prop when expected', () => {
      const onHeadingClick = jest.fn();
      render(<AccordionItem onHeadingClick={onHeadingClick} />);

      userEvent.click(screen.getByText('Test title'));

      expect(onHeadingClick).toHaveBeenCalled();
    });

    it('should respect open prop', () => {
      render(<AccordionItem open />);

      expect(screen.getByRole('button').toHaveAttribute('aria-expanded', true));
    });

    it('should respect renderToggle prop', () => {
      const renderToggle = jest.fn();
      render(<AccordionItem renderToggle={renderToggle} />);

      expect(renderToggle).toHaveBeenCalled();
    });

    it('should respect title prop', () => {
      render(<AccordionItem title="Test title" />);

      expect(screen.getByText('Test title')).toBeInTheDocument();
    });
  });

  describe('behaves as expected', () => {
    it('should close an open AccordionItem panel when the Esc key is pressed', () => {
      render(
        <AccordionItem title="A heading" open>
          Lorem ipsum.
        </AccordionItem>
      );
      userEvent.keyboard(screen.getByRole('button'), '{esc}');

      expect(
        screen.getByRole('button').toHaveAttribute('aria-expanded', false)
      );
    });

    it('should not close an open AccordionItem panel if the Esc key is pressed in the panel', () => {
      const wrapper = mount(
        <AccordionItem title="A heading" open>
          <input data-test-id="input" />
        </AccordionItem>
      );
      wrapper.find('[data-test-id="input"]').simulate('keydown', {
        key: 'Escape',
        keyCode: 27,
        which: 27,
      });
      expect(
        wrapper
          .find(`.${prefix}--accordion__item`)
          .hasClass(`${prefix}--accordion__item--active`)
      ).toBe(true);
    });
  });
});
