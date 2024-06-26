/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './MultiSelect.mdx';

import MultiSelect from '.';
import FilterableMultiSelect from './FilterableMultiSelect';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  subcomponents: {
    FilterableMultiSelect,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    downshiftProps: {
      table: { disable: true },
    },
    compareItems: {
      table: { disable: true },
    },
    sortItems: {
      table: { disable: true },
    },
    initialSelectedItems: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    items: {
      table: { disable: true },
    },
    light: {
      table: {
        disable: true,
      },
    },
    locale: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onMenuChange: {
      table: { disable: true },
    },
    itemToElement: {
      table: { disable: true },
    },
    itemToString: {
      table: { disable: true },
    },
    selectedItems: {
      table: { disable: true },
    },
    open: {
      table: { disable: true },
    },
    titleText: {
      table: { disable: true },
    },
    translateWithId: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];

export const Playground = (args) => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

Playground.args = {
  size: 'md',
  type: 'default',
  titleText: 'This is a MultiSelect Title',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  open: false,
  warnText: 'whoopsie!',
  invalidText: 'whoopsie!',
  label: 'This is a label',
  clearSelectionDescription: 'Total items selected: ',
  useTitleInItem: false,
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
};

Playground.argTypes = {
  selectionFeedback: {
    options: ['top', 'fixed', 'top-after-reopen'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  direction: {
    options: ['top', 'bottom'],
    control: { type: 'radio' },
  },
  type: {
    options: ['inline', 'default'],
    control: { type: 'radio' },
  },
  titleText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  clearSelectionDescription: {
    control: {
      type: 'text',
    },
  },
  useTitleInItem: {
    control: {
      type: 'text',
    },
  },
  clearSelectionText: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: { type: 'boolean' },
  },
};

export const Default = () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
};

export const Test = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <FilterableMultiSelect
        style={{ marginTop: '3rem' }}
        key={'t1'}
        helperText="ABOVE"
        label="label"
        titleText={'Title'}
        itemToString={(item) => item}
        items={[
          'AAAB1',
          'AAAB2',
          'AAAB3',
          'AAAB4',
          'AAAB5',
          'AAAB6',
          'AAAB7',
          'AAAB8',
          'AAAB9',
          'AAABA',
          'AAABB',
          'AAABC',
          'AAABD',
          'AAABF',
        ]}
      />

      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Overview</Tab>
        </TabList>

        <div>
          <FilterableMultiSelect
            style={{ marginTop: '3rem' }}
            key={'t1'}
            helperText="INTABS"
            label="label"
            titleText={'Title'}
            itemToString={(item) => item}
            items={[
              'AAAB1',
              'AAAB2',
              'AAAB3',
              'AAAB4',
              'AAAB5',
              'AAAB6',
              'AAAB7',
              'AAAB8',
              'AAAB9',
              'AAABA',
              'AAABB',
              'AAABC',
              'AAABD',
              'AAABF',
            ]}
          />
        </div>

        <TabPanels>
          <TabPanel>
            <FilterableMultiSelect
              style={{ marginTop: '3rem' }}
              key={'t1'}
              helperText="INTABS"
              label="label"
              titleText={'Title'}
              itemToString={(item) => item}
              items={[
                'AAAB1',
                'AAAB2',
                'AAAB3',
                'AAAB4',
                'AAAB5',
                'AAAB6',
                'AAAB7',
                'AAAB8',
                'AAAB9',
                'AAABA',
                'AAABB',
                'AAABC',
                'AAABD',
                'AAABF',
              ]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <FilterableMultiSelect
        style={{ marginTop: '3rem' }}
        key={'t1'}
        helperText="BELOW"
        label="label"
        titleText={'Title'}
        itemToString={(item) => item}
        items={[
          'AAAB1',
          'AAAB2',
          'AAAB3',
          'AAAB4',
          'AAAB5',
          'AAAB6',
          'AAAB7',
          'AAAB8',
          'AAAB9',
          'AAABA',
          'AAABB',
          'AAABC',
          'AAABD',
          'AAABF',
        ]}
      />
    </div>
  );
};

export const WithInitialSelectedItems = () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example-2"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
};

export const Filterable = (args) => {
  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

Filterable.argTypes = {
  onChange: {
    action: 'onChange',
  },
};

export const WithLayerMultiSelect = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Multiselect Label"
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
      </div>
    )}
  </WithLayer>
);

export const _FilterableWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <FilterableMultiSelect
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
      </div>
    )}
  </WithLayer>
);

export const _Controlled = () => {
  const [selectedItems, setSelectedItems] = useState(
    items.filter((item) => item.id === 'downshift-1-item-0')
  );

  const onSelectionChanged = (value) => {
    action('changed items')(value);
    setSelectedItems(value);
  };

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        id="carbon-multiselect-example-controlled"
        titleText="Multiselect title"
        label="Multiselect label"
        items={items}
        selectedItems={selectedItems}
        onChange={(data) => onSelectionChanged(data.selectedItems)}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
      <br />
      <ButtonSet>
        <Button
          id="all"
          onClick={() =>
            setSelectedItems(items.filter((item) => !item.disabled))
          }>
          Select all
        </Button>
        <Button
          id="clear"
          kind="secondary"
          onClick={() => setSelectedItems([])}>
          Clear
        </Button>
      </ButtonSet>
    </div>
  );
};
