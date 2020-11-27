/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const ContextMenu = React.forwardRef(function ContextMenu(
  { children, open },
  ref
) {
  const options = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node);
    }
  });

  const classes = classnames(`${prefix}--context-menu`, {
    [`${prefix}--context-menu--open`]: open,
  });

  return (
    <ul ref={ref} className={classes}>
      {options}
    </ul>
  );
});

ContextMenu.propTypes = {
  /**
   * Specify the children of the ContextMenu
   */
  children: PropTypes.node,

  /**
   * Specify whether the ContextMenu is currently open
   */
  open: PropTypes.bool,
};

export default ContextMenu;
