/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';

const { prefix } = settings;

// Finding nodes in a ListBox
export const findListBoxNode = (wrapper) =>
  wrapper.find(`.${prefix}--list-box`);
export const findMenuNode = (wrapper) =>
  wrapper.find(`.${prefix}--list-box__menu`);
export const findMenuItemNode = (wrapper, index) =>
  wrapper.find('ListBoxMenuItem').at(index);
export const findMenuIconNode = (wrapper) =>
  wrapper.find(`.${prefix}--list-box__menu-icon`);
export const findFieldNode = (wrapper) =>
  wrapper.find(`.${prefix}--list-box__field`);
export const findComboboxNode = (wrapper) =>
  wrapper.find(`.${prefix}--list-box[role="combobox"]`);
export const findPopupNode = (wrapper) =>
  wrapper.find('[aria-haspopup="listbox"]').hostNodes();

// Actions
export const openMenu = (wrapper) => findFieldNode(wrapper).simulate('click');

// Common assertions, useful for validating a11y props are set when needed
export const assertMenuOpen = (wrapper, mockProps) => {
  expect(findMenuNode(wrapper).children().length).toBe(mockProps.items.length);
  expect(findMenuIconNode(wrapper).prop('className')).toEqual(
    expect.stringContaining(`${prefix}--list-box__menu-icon--open`)
  );
  expect(findPopupNode(wrapper).prop('aria-expanded')).toBe(true);
};
export const assertMenuClosed = (wrapper) => {
  expect(findMenuIconNode(wrapper).prop('className')).toEqual(
    expect.stringContaining(`${prefix}--list-box__menu-icon`)
  );
  expect(findMenuIconNode(wrapper).prop('className')).not.toEqual(
    expect.stringContaining(`${prefix}--list-box__menu-icon--open`)
  );
  expect(findPopupNode(wrapper).prop('aria-expanded')).toBe(false);
};

/**
 * `GenericItem` corresponds to an item in a collection that is passed to
 * MultiSelect that is in a predictable shape and works with the default
 * `itemToString` out of the box.
 * @param {number} index
 *
 * @returns {{id: string, label: string, value: string}}
 */
export const generateGenericItem = (index) => ({
  id: `id-${index}`,
  label: `Item ${index}`,
  value: index,
});

/**
 * `CustomItem` corresponds to a potentially different item structure that
 * might be passed into MultiSelect that we would need to supply a custom
 * `itemToString` method for
 * @param {number} index
 *
 * @returns {{field: string, value: string}}
 */
export const generateCustomItem = (index) => ({
  field: `Item ${index}`,
  value: `Custom value ${index}`,
});

/**
 * Returns an Array filled by values generated by the `generator` function
 * @param {number} amount Number of elements to generate
 *
 * @returns {Array<object>} Array of objects generated by `generator`
 */
export const generateItems = (amount, generator) =>
  Array(amount)
    .fill(null)
    .map((_, i) => generator(i));

export const customItemToString = ({ field }) => field;
