/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

export default class TooltipDefinition extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Definition Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element - The element functioning as a text field.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element.ownerDocument, 'keydown', event => {
        // ESC
        if (event.which === 27) {
          this.allowTooltipVisibility({ visible: false });
        }
      })
    );
    this.manage(
      on(this.element, 'mouseenter', () =>
        this.allowTooltipVisibility({ visible: true })
      )
    );
    this.manage(
      on(this.element, 'focus', event => {
        if (eventMatches(event, this.options.selectorTriggerButton)) {
          this.allowTooltipVisibility({ visible: true });
        }
      })
    );
  }

  allowTooltipVisibility = ({ visible }) => {
    const tooltipTriggerButton = this.element.matches(
      this.options.selectorTriggerButton
    )
      ? this.element
      : this.element.querySelector(this.options.selectorTriggerButton);

    if (!tooltipTriggerButton) {
      return;
    }

    if (visible) {
      tooltipTriggerButton.classList.remove(this.options.classTooltipHidden);
    } else {
      tooltipTriggerButton.classList.add(this.options.classTooltipHidden);
    }
  };

  /**
   * The component options.
   *
   * If `options` is specified in the constructor,
   * {@linkcode TooltipDefinition.create .create()},
   * or {@linkcode TooltipDefinition.init .init()},
   * properties in this object are overriden for the instance being
   * created and how {@linkcode TooltipDefinition.init .init()} works.
   * @property {string} selectorInit The CSS selector to find definition tooltip UIs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tooltip-definition]',
      selectorTriggerButton: `.${prefix}--tooltip__trigger.${prefix}--tooltip--a11y`,
      classTooltipHidden: `${prefix}--tooltip--hidden`,
    };
  }

  /**
   * The map associating DOM element and definition tooltip UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}
