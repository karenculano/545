import { componentsX } from '../../src/globals/js/feature-flags';
import EventManager from '../utils/event-manager';
import flattenOptions from '../utils/flatten-options';
import DataTableV2 from '../../src/components/data-table-v2/data-table-v2';
import HTML from '../../html/data-table-v2/data-table-v2.html';
import ExpandableHTML from '../../html/data-table-v2/data-table-v2--expandable.html';

describe('DataTableV2', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new DataTableV2();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new DataTableV2(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should set default options', function() {
      const table = new DataTableV2(document.createElement('div'));
      expect(flattenOptions(table.options)).toEqual({
        selectorInit: '[data-table-v2]',
        selectorToolbar: '.bx--table--toolbar',
        selectorActions: '.bx--batch-actions',
        selectorCount: '[data-items-selected]',
        selectorActionCancel: '.bx--batch-summary__cancel',
        selectorCheckbox: '.bx--checkbox',
        selectorExpandCells: '.bx--table-expand-v2',
        selectorExpandableRows: '.bx--expandable-row-v2',
        selectorParentRows: '.bx--parent-row-v2',
        selectorChildRow: '[data-child-row]',
        selectorTableStickyHeader: '.bx--data-table-v2--sticky-header',
        selectorTableBody: 'tbody',
        selectorTableThead: 'thead',
        selectorTableSort: '.bx--table-sort-v2',
        selectorTableSelected: '.bx--data-table-v2--selected',
        selectorToolbarSearchContainer: '.bx--toolbar-search-container-hidden',
        selectorTableTruncated: '.bx--data-table-v2--overflow-truncate',
        selectorHeaderLabels: '.bx--table-header-label',
        selectorTableCellContent: '.bx--table-cell-content',
        selectorSearchMagnifier: '.bx--search-magnifier',
        selectorSearchInput: '.bx--search-input',
        classExpandableRow: 'bx--expandable-row-v2',
        classExpandableRowHidden: 'bx--expandable-row--hidden-v2',
        classExpandableRowHover: 'bx--expandable-row--hover-v2',
        classTableSortAscending: 'bx--table-sort-v2--ascending',
        classTableSortActive: 'bx--table-sort-v2--active',
        classActionBarActive: 'bx--batch-actions--active',
        classTableSelected: 'bx--data-table-v2--selected',
        classToolbarSearchActive: 'bx--toolbar-search-container-active',
        classTooltipActive: 'bx--data-table-v2--truncated',
        eventBeforeExpand: 'data-table-v2-beforetoggleexpand',
        eventAfterExpand: 'data-table-v2-aftertoggleexpand',
        eventBeforeSort: 'data-table-v2-beforetogglesort',
        eventAfterSort: 'data-table-v2-aftertogglesort',
        eventTrigger: '[data-event]',
        eventParentContainer: '[data-parent-row]',
      });
    });
  });

  describe('Initial tasks', function() {
    let container;
    let element;
    let table;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Expandable rows should be removed from the DOM', function() {
      const rows = [...element.querySelectorAll('tbody > tr')];

      rows.forEach(row => {
        expect(row.classList.contains('[data-child-row]')).toBe(false);
      });
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Row Expansion', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = ExpandableHTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Should toggle the row on click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.querySelector('[data-child-row]')).toBeTruthy();
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(document.querySelector('[data-child-row]')).toBeFalsy();
    });

    it('Should emit an event on row expansion click', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      const spyToggleRowExpandEvent = jasmine.createSpy();
      events.on(element.ownerDocument.body, 'data-table-v2-aftertoggleexpand', spyToggleRowExpandEvent);
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleRowExpandEvent).toHaveBeenCalled();
    });

    it('The event should trigger the function', function() {
      const firstRowExpand = document.querySelector('[data-event="expand"]');
      spyOn(table, '_rowExpandToggle');
      firstRowExpand.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(table._rowExpandToggle).toHaveBeenCalled();
    });

    afterEach(function() {
      events.reset();
      table.release();
      document.body.removeChild(container);
    });
  });

  describe('Sort', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;
    let firstSort;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      firstSort = element.querySelector('[data-event="sort"]');
      table = new DataTableV2(element);
    });

    it('Should toggle the class on click', function() {
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(firstSort.classList.contains('bx--table-sort-v2--ascending')).toBe(true);
    });

    it('Should emit an event on sort click', function() {
      const spyToggleSortEvent = jasmine.createSpy();
      events.on(element.ownerDocument.body, 'data-table-v2-aftertogglesort', spyToggleSortEvent);
      firstSort.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(spyToggleSortEvent).toHaveBeenCalled();
    });

    afterEach(function() {
      firstSort.classList.remove('bx--table-sort-v2--ascending');
      firstSort.dataset.previousValue = '';
      events.reset();
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Action bar', function() {
    const events = new EventManager();
    let element;
    let table;
    let container;

    beforeAll(function() {
      container = document.createElement('div');
      container.innerHTML = HTML;
      document.body.appendChild(container);
      element = document.querySelector('[data-table-v2]');
      table = new DataTableV2(element);
    });

    it('Should toggle the action bar on checkbox select', function() {
      const firstSelect = document.querySelector('[data-event="select"]');
      firstSelect.click();

      const batchActions = element.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(true);

      firstSelect.click();

      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(false);
    });

    // it('Should close the action bar on a cancel click', function() {});

    // it('Should close the action bar on ESC key', function() {});

    it('Should select all checkboxes on select all event', function() {
      const firstSelect = document.querySelector('[data-event="select-all"]');
      firstSelect.click();

      const batchActions = element.querySelector('.bx--batch-actions');
      expect(batchActions.classList.contains('bx--batch-actions--active')).toBe(true);
    });

    afterEach(function() {
      table._actionBarCancel();
      events.reset();
    });

    afterAll(function() {
      document.body.removeChild(container);
      table.release();
    });
  });

  describe('Toggle active search bar', function() {
    let table;
    let container;
    let dt;

    beforeEach(function() {
      /* istanbul ignore if */
      if (componentsX) {
        container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);
        dt = document.querySelector('.bx--data-table-v2');
        table = new DataTableV2(container);
      }
    });

    it('Should open search bar on click', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-hidden');
        const magnifier = document.querySelector('.bx--search-magnifier');
        magnifier.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(true);
      }
    });

    it('Should close search bar on click', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-hidden');
        search.classList.add('bx--toolbar-search-container-active');
        dt.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(false);
      }
    });

    it('Should open search bar on keydown', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-hidden');
        const magnifier = document.querySelector('.bx--search-magnifier');
        const event = new CustomEvent('keydown', { bubbles: true });
        event.which = 13;
        magnifier.dispatchEvent(event);
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(true);
      }
    });

    it('Should close search bar on keydown', function() {
      /* istanbul ignore if */
      if (componentsX) {
        const search = document.querySelector('.bx--toolbar-search-container-hidden');
        const btn = document.querySelector('.bx--btn');
        search.classList.add('bx--toolbar-search-container-active');
        const event = new CustomEvent('keydown', { bubbles: true });
        event.which = 27;
        btn.dispatchEvent(event);
        expect(search.classList.contains('bx--toolbar-search-container-active')).toBe(false);
      }
    });

    afterEach(function() {
      /* istanbul ignore if */
      if (componentsX) {
        document.body.removeChild(container);
        table.release();
      }
    });
  });
});
