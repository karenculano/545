/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useId } from 'react';
import classNames from 'classnames';
import InlineCheckbox from '../InlineCheckbox';
import RadioButton from '../RadioButton';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

export interface TableSelectRowProps {
  /**
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ariaLabel?: string;

  /**
   * Specify whether this row is selected, or not
   */
  checked: boolean;

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Provide an `id` for the underlying input control
   */
  id: string;

  /**
   * Provide a `name` for the underlying input control
   */
  name: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (
    value: boolean,
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: React.MouseEventHandler<HTMLInputElement>;

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio?: boolean;
}

const TableSelectRow = ({
  ariaLabel: deprecatedAriaLabel,
  ['aria-label']: ariaLabel,
  checked,
  id,
  name,
  onSelect,
  onChange,
  disabled,
  radio,
  className,
}: TableSelectRowProps) => {
  const prefix = usePrefix();
  const uniqueNameId = useId();
  const selectionInputProps = {
    id,
    name: name ? name : uniqueNameId,
    onClick: onSelect,
    onChange,
    checked,
    disabled,
  };
  const InlineInputComponent = radio ? RadioButton : InlineCheckbox;
  const tableSelectRowClasses = classNames(`${prefix}--table-column-checkbox`, {
    ...(className && { [className]: true }),
    [`${prefix}--table-column-radio`]: radio,
  });
  return (
    <td className={tableSelectRowClasses} aria-live="off">
      <InlineInputComponent
        {...selectionInputProps}
        {...(radio && {
          labelText: ariaLabel || deprecatedAriaLabel,
          hideLabel: true,
        })}
        {...(!radio && { 'aria-label': ariaLabel || deprecatedAriaLabel })}
      />
    </td>
  );
};
TableSelectRow.propTypes = {
  /**
   * Specify the aria label for the underlying input control
   */
  ['aria-label']: PropTypes.string,
  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the aria label for the underlying input control
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),
  /**
   * Specify whether this row is selected, or not
   */
  checked: PropTypes.bool.isRequired,

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,
};

export default TableSelectRow;
