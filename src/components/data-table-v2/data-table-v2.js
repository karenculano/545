/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import debounce from 'lodash.debounce';
import { componentsX } from '../../globals/js/feature-flags';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class DataTableV2 extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends   EventedState
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  constructor(element, options) {
    super(element, options);

    this.container = element.parentNode;
    this.toolbarEl = this.element.querySelector(this.options.selectorToolbar);
    this.batchActionEl = this.element.querySelector(this.options.selectorActions);
    this.countEl = this.element.querySelector(this.options.selectorCount);
    this.cancelEl = this.element.querySelector(this.options.selectorActionCancel);
    this.tableHeaders = this.element.querySelectorAll('th');
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
    this.expandCells = [];
    this.expandableRows = [];
    this.parentRows = [];
    this._handleDebouncedResize = debounce(this._addOverflowTooltip, 200);
    this.stickyTable = this.element.querySelector(this.options.selectorTableStickyHeader);

    this.refreshRows();
    this._addOverflowTooltip();

    this.element.addEventListener('mouseover', evt => {
      const eventElement = eventMatches(evt, this.options.selectorChildRow);

      if (eventElement) {
        this._expandableHoverToggle(eventElement, true);
      }

      if (this.stickyTable) {
        const tbodyEvent = eventMatches(evt, this.options.selectorTableBody);
        const theadEvent = eventMatches(evt, this.options.selectorTableThead);
        const thead = this.stickyTable.querySelector(this.options.selectorTableThead);
        const tbody = this.stickyTable.querySelector(this.options.selectorTableBody);

        if (tbodyEvent) {
          this.deactivateScroll(thead, tbody);
        }

        if (theadEvent) {
          this.deactivateScroll(tbody, thead);
        }
      }
    });

    this.element.addEventListener('click', evt => {
      const eventElement = eventMatches(evt, this.options.eventTrigger);
      if (eventElement) {
        this._toggleState(eventElement, evt);
      }

      if (componentsX) {
        this._handleDocumentClick(evt);
      }
    });

    this.element.addEventListener('keydown', evt => {
      this._keydownHandler(evt);
    });

    this.state = {
      checkboxCount: 0,
    };

    this.element.ownerDocument.defaultView.addEventListener('resize', this._handleDebouncedResize);
  }

  activateScroll(target) {
    const thead = this.stickyTable.querySelector(this.options.selectorTableThead);
    const tbody = this.stickyTable.querySelector(this.options.selectorTableBody);
    target.addEventListener('scroll', evt => {
      this._scrollHandler(thead, tbody, evt);
    });
  }

  deactivateScroll(target, newScroll) {
    const thead = this.stickyTable.querySelector(this.options.selectorTableThead);
    const tbody = this.stickyTable.querySelector(this.options.selectorTableBody);
    target.removeEventListener('scroll', evt => {
      this._scrollHandler(thead, tbody, evt);
    });

    this.activateScroll(newScroll);
  }

  _scrollHandler(thead, tbody, evt) {
    const source = evt.target;
    const target = evt.target === thead ? tbody : thead;
    target.scrollLeft = source.scrollLeft;
  }

  _handleDocumentClick(evt) {
    const searchContainer = this.element.querySelector(this.options.selectorToolbarSearchContainer);
    const searchEvent = eventMatches(evt, this.options.selectorSearchMagnifier);
    const activeSearch = searchContainer.classList.contains(this.options.classToolbarSearchActive);

    if (searchContainer && searchEvent) {
      this.activateSearch(searchContainer);
    }

    if (activeSearch) {
      this.deactivateSearch(searchContainer, evt);
    }
  }

  activateSearch(container) {
    const input = container.querySelector(this.options.selectorSearchInput);
    container.classList.add(this.options.classToolbarSearchActive);
    input.focus();
  }

  deactivateSearch(container, evt) {
    const trigger = container.querySelector(this.options.selectorSearchMagnifier);
    const input = container.querySelector(this.options.selectorSearchInput);
    const svg = trigger.querySelector('svg');
    if (input.value.length === 0 && evt.target !== input && evt.target !== trigger && evt.target !== svg) {
      container.classList.remove(this.options.classToolbarSearchActive);
      input.focus();
    }
  }

  _sortToggle = detail => {
    const { element, previousValue } = detail;

    toArray(this.tableHeaders).forEach(header => {
      const sortEl = header.querySelector(this.options.selectorTableSort);

      if (sortEl !== null && sortEl !== element) {
        sortEl.classList.remove(this.options.classTableSortActive);
        sortEl.classList.remove(this.options.classTableSortAscending);
      }
    });

    if (!previousValue) {
      element.dataset.previousValue = 'ascending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.add(this.options.classTableSortAscending);
    } else if (previousValue === 'ascending') {
      element.dataset.previousValue = 'descending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.remove(this.options.classTableSortAscending);
    } else if (previousValue === 'descending') {
      element.removeAttribute('data-previous-value');
      element.classList.remove(this.options.classTableSortActive);
      element.classList.remove(this.options.classTableSortAscending);
    }
  };

  _selectToggle = detail => {
    const { element } = detail;
    const { checked } = element;

    // increment the  count
    this.state.checkboxCount += checked ? 1 : -1;
    this.countEl.textContent = this.state.checkboxCount;

    const row = element.parentNode.parentNode;

    row.classList.toggle(this.options.classTableSelected);

    // toggle on/off batch action bar
    this._actionBarToggle(this.state.checkboxCount > 0);
  };

  _selectAllToggle = ({ element }) => {
    const { checked } = element;

    const inputs = toArray(this.element.querySelectorAll(this.options.selectorCheckbox));

    this.state.checkboxCount = checked ? inputs.length - 1 : 0;

    inputs.forEach(item => {
      item.checked = checked;

      const row = item.parentNode.parentNode;
      if (checked && row) {
        row.classList.add(this.options.classTableSelected);
      } else {
        row.classList.remove(this.options.classTableSelected);
      }
    });

    this._actionBarToggle(this.state.checkboxCount > 0);

    if (this.batchActionEl) {
      this.countEl.textContent = this.state.checkboxCount;
    }
  };

  _actionBarCancel = () => {
    const inputs = toArray(this.element.querySelectorAll(this.options.selectorCheckbox));
    const row = toArray(this.element.querySelectorAll(this.options.selectorTableSelected));

    row.forEach(item => {
      item.classList.remove(this.options.classTableSelected);
    });

    inputs.forEach(item => {
      item.checked = false;
    });

    this.state.checkboxCount = 0;
    this._actionBarToggle(false);

    if (this.batchActionEl) {
      this.countEl.textContent = this.state.checkboxCount;
    }
  };

  _actionBarToggle = toggleOn => {
    const transition = evt => {
      this.batchActionEl.removeEventListener('transitionend', transition);

      if (evt.target.matches(this.options.selectorActions)) {
        if (this.batchActionEl.dataset.active === 'false') {
          this.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          this.batchActionEl.setAttribute('tabIndex', 0);
        }
      }
    };

    if (toggleOn) {
      this.batchActionEl.dataset.active = true;
      this.batchActionEl.classList.add(this.options.classActionBarActive);
    } else if (this.batchActionEl) {
      this.batchActionEl.dataset.active = false;
      this.batchActionEl.classList.remove(this.options.classActionBarActive);
    }
    if (this.batchActionEl) {
      this.batchActionEl.addEventListener('transitionend', transition);
    }
  };

  _addOverflowTooltip = () => {
    const truncatedTable = this.element.querySelector(this.options.selectorTableTruncated);
    if (truncatedTable) {
      const headerThs = toArray(truncatedTable.querySelectorAll('th'));
      const tbodyTds = toArray(truncatedTable.querySelectorAll('td'));
      const allCells = headerThs.concat(tbodyTds);

      const truncatedCells = allCells.filter(cell => cell.classList.contains(this.options.classTooltipActive));

      const thsToAddClass = headerThs.filter(th => {
        const span = th.querySelector(this.options.selectorHeaderLabels);
        if (span) {
          return span.scrollWidth > span.offsetWidth;
        }
        return null;
      });

      const tdsToAddClass = tbodyTds.filter(td => {
        const span = td.querySelector(this.options.selectorTableCellContent);
        if (span) {
          return span.scrollWidth > span.offsetWidth;
        }
        return null;
      });

      requestAnimationFrame(() => {
        truncatedCells.forEach(cell => {
          cell.classList.remove(this.options.classTooltipActive);
          cell.removeAttribute('tabindex');
        });

        thsToAddClass.forEach(th => {
          th.classList.add(this.options.classTooltipActive);
          th.tabIndex = 0;
        });

        tdsToAddClass.forEach(td => {
          td.classList.add(this.options.classTooltipActive);
          td.tabIndex = 0;
        });
      });
    }
  };

  _expandableRowsInit = expandableRows => {
    expandableRows.forEach(item => {
      if (!componentsX) {
        item.classList.remove(this.options.classExpandableRowHidden);
        this.tableBody.removeChild(item);
      }
    });
  };

  _rowExpandToggle = ({ element, initialEvt }) => {
    const parent = eventMatches(initialEvt, this.options.eventParentContainer);

    const index = this.expandCells.indexOf(element);
    if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
      element.dataset.previousValue = 'collapsed';
      parent.classList.add(this.options.classExpandableRow);
      if (!componentsX) {
        this.tableBody.insertBefore(this.expandableRows[index], this.parentRows[index + 1]);
      }
    } else {
      parent.classList.remove(this.options.classExpandableRow);
      if (!componentsX) {
        this.tableBody.removeChild(parent.nextElementSibling);
      }
      element.dataset.previousValue = 'expanded';
    }
  };

  _expandableHoverToggle = element => {
    element.previousElementSibling.classList.add(this.options.classExpandableRowHover);

    const mouseout = () => {
      element.previousElementSibling.classList.remove(this.options.classExpandableRowHover);
      element.removeEventListener('mouseout', mouseout);
    };

    element.addEventListener('mouseout', mouseout);
  };

  _toggleState = (element, evt) => {
    const data = element.dataset;
    const label = data.label ? data.label : '';
    const previousValue = data.previousValue ? data.previousValue : '';
    const initialEvt = evt;

    this.changeState({
      group: data.event,
      element,
      label,
      previousValue,
      initialEvt,
    });
  };

  _keydownHandler = evt => {
    const searchContainer = this.element.querySelector(this.options.selectorToolbarSearchContainer);
    const searchEvent = eventMatches(evt, this.options.selectorSearchMagnifier);
    const activeSearch = searchContainer.classList.contains(this.options.classToolbarSearchActive);

    if (evt.which === 27) {
      this._actionBarCancel();
    }

    if (searchContainer && searchEvent && evt.which === 13) {
      this.activateSearch(searchContainer);
    }

    if (activeSearch && evt.which === 27) {
      this.deactivateSearch(searchContainer, evt);
    }
  };

  _changeState(detail, callback) {
    this[this.constructor.eventHandlers[detail.group]](detail);
    callback();
  }

  refreshRows = () => {
    const newExpandCells = toArray(this.element.querySelectorAll(this.options.selectorExpandCells));
    const newExpandableRows = toArray(this.element.querySelectorAll(this.options.selectorExpandableRows));
    const newParentRows = toArray(this.element.querySelectorAll(this.options.selectorParentRows));

    // check if this is a refresh or the first time
    if (this.parentRows.length > 0) {
      const diffParentRows = newParentRows.filter(newRow => !this.parentRows.some(oldRow => oldRow === newRow));

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        const diffExpandableRows = diffParentRows.map(newRow => newRow.nextElementSibling);
        const mergedExpandableRows = [...toArray(this.expandableRows), ...toArray(diffExpandableRows)];
        this._expandableRowsInit(diffExpandableRows);
        this.expandableRows = mergedExpandableRows;
      }
    } else if (newExpandableRows.length > 0) {
      this._expandableRowsInit(newExpandableRows);
      this.expandableRows = newExpandableRows;
    }

    this.expandCells = newExpandCells;
    this.parentRows = newParentRows;
  };

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  // UI Events
  static eventHandlers /* #__PURE_CLASS_PROPERTY__ */ = {
    expand: '_rowExpandToggle',
    sort: '_sortToggle',
    select: '_selectToggle',
    'select-all': '_selectAllToggle',
    'action-bar-cancel': '_actionBarCancel',
  };

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-table-v2]',
      selectorToolbar: `.${prefix}--table--toolbar`,
      selectorActions: `.${prefix}--batch-actions`,
      selectorCount: '[data-items-selected]',
      selectorActionCancel: `.${prefix}--batch-summary__cancel`,
      selectorCheckbox: `.${prefix}--checkbox`,
      selectorExpandCells: `.${prefix}--table-expand-v2`,
      selectorExpandableRows: `.${prefix}--expandable-row-v2`,
      selectorParentRows: `.${prefix}--parent-row-v2`,
      selectorChildRow: '[data-child-row]',
      selectorTableStickyHeader: `.${prefix}--data-table-v2--sticky-header`,
      selectorTableBody: 'tbody',
      selectorTableThead: 'thead',
      selectorTableSort: `.${prefix}--table-sort-v2`,
      selectorTableSelected: `.${prefix}--data-table-v2--selected`,
      selectorToolbarSearchContainer: `.${prefix}--toolbar-search-container-hidden`,
      selectorTableTruncated: `.${prefix}--data-table-v2--overflow-truncate`,
      selectorHeaderLabels: `.${prefix}--table-header-label`,
      selectorTableCellContent: `.${prefix}--table-cell-content`,
      selectorSearchMagnifier: `.${prefix}--search-magnifier`,
      selectorSearchInput: `.${prefix}--search-input`,
      classExpandableRow: `${prefix}--expandable-row-v2`,
      classExpandableRowHidden: `${prefix}--expandable-row--hidden-v2`,
      classExpandableRowHover: `${prefix}--expandable-row--hover-v2`,
      classTableSortAscending: `${prefix}--table-sort-v2--ascending`,
      classTableSortActive: `${prefix}--table-sort-v2--active`,
      classActionBarActive: `${prefix}--batch-actions--active`,
      classTableSelected: `${prefix}--data-table-v2--selected`,
      classToolbarSearchActive: `${prefix}--toolbar-search-container-active`,
      classTooltipActive: `${prefix}--data-table-v2--truncated`,
      eventBeforeExpand: 'data-table-v2-beforetoggleexpand',
      eventAfterExpand: 'data-table-v2-aftertoggleexpand',
      eventBeforeSort: 'data-table-v2-beforetogglesort',
      eventAfterSort: 'data-table-v2-aftertogglesort',
      eventTrigger: '[data-event]',
      eventParentContainer: '[data-parent-row]',
    };
  }
}

export default DataTableV2;
