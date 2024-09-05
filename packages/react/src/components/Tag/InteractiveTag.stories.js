/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { default as Tag } from '.';
import { default as SelectableTag } from './SelectableTag';
import { default as OperationalTag } from './OperationalTag';
import { default as DismissibleTag } from './DismissibleTag';
import { Asleep } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import mdx from './InteractiveTag.mdx';
import './storyInteractiveTag.scss';
import { Text } from '../Text';
import Button from '../Button';

export default {
  title: 'Experimental/unstable__InteractiveTag',
  component: SelectableTag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Selectable = (args) => {
  return (
    <>
      <SelectableTag
        renderIcon={Asleep}
        text="Tag content with a long text description"
        className="some-class"
        {...args}
      />
      <SelectableTag
        renderIcon={Asleep}
        text="Tag content"
        className="some-class"
        {...args}
      />
    </>
  );
};

Selectable.args = {
  disabled: false,
};

Selectable.argTypes = {
  as: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  selected: {
    control: 'false',
    description: 'Specify the state of the selectable tag.',
  },
  title: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Operational = (args) => {
  const [open, setOpen] = useState(false);
  const [openHighContrast, setOpenHighContrast] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <OperationalTag
          type="red"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content with a long text description"
          {...args}
        />
        <OperationalTag
          type="magenta"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="purple"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="blue"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cyan"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="teal"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="green"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cool-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="warm-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
      </div>

      <h4>Interactive examples</h4>
      <div
        id="operational-tag"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '1rem',
        }}>
        {/* High contrast example */}
        <Popover open={openHighContrast} highContrast>
          <OperationalTag
            onClick={() => {
              setOpenHighContrast(!openHighContrast);
            }}
            aria-expanded={openHighContrast}
            renderIcon={Asleep}
            text="Tag content"
            className="some-class"
            {...args}
          />
          <PopoverContent className="popover-content">
            <Text as="p">Tag 1 name</Text>
            <Text as="p">Tag 2 name</Text>
            <Text as="p">Tag 3 name</Text>
            <Text as="p">Tag 4 name</Text>
            <Text as="p">Tag 5 name</Text>
          </PopoverContent>
        </Popover>

        <Popover open={open}>
          <OperationalTag
            onClick={() => {
              setOpen(!open);
            }}
            aria-expanded={open}
            renderIcon={Asleep}
            text="Tag content"
            className="some-class"
            {...args}
          />
          <PopoverContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
              }}>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 1 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 2 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 3 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 4 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 5 name'}
              </Tag>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

Operational.args = {
  disabled: false,
  size: 'md',
};

Operational.argTypes = {
  id: {
    control: false,
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  as: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
  selected: {
    table: {
      disable: true,
    },
  },
  type: {
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Dismissible = (args) => {
  const tags = [
    {
      type: 'red',
      text: 'Tag content with a long text description',
      tagTitle: 'Provide a custom title to the tag',
    },
    {
      type: 'magenta',
      text: 'Tag content 1',
    },
    {
      type: 'purple',
      text: 'Tag content 2',
    },
    {
      type: 'blue',
      text: 'Tag content 3',
    },
    {
      type: 'cyan',
      text: 'Tag content 4',
    },
    {
      type: 'teal',
      text: 'Tag content 5',
    },
    {
      type: 'green',
      text: 'Tag content 6',
    },
    {
      type: 'gray',
      text: 'Tag content 7',
    },
    {
      type: 'cool-gray',
      text: 'Tag content 8',
    },
    {
      type: 'warm-gray',
      text: 'Tag content 9',
    },
    {
      type: 'high-contrast',
      text: 'Tag content 10',
    },
    {
      type: 'outline',
      text: 'Tag content 11',
    },
  ];

  const [renderedTags, setRenderedTags] = useState(tags);

  const handleClose = (removedTag) => {
    const newTags = renderedTags.filter((tag) => tag !== removedTag);
    setRenderedTags(newTags);
  };

  const resetTabs = () => {
    setRenderedTags(tags);
  };

  return (
    <>
      <Button
        aria-label="Re-render all tags in the screen"
        style={{ marginBottom: '3rem' }}
        onClick={resetTabs}>
        Reset
      </Button>
      <br />
      {renderedTags.map((tag, index) => (
        <DismissibleTag
          key={index}
          type={tag.type}
          className="some-class"
          renderIcon={Asleep}
          text={tag.text}
          tagTitle={tag.tagTitle}
          title={`Dismiss ${tag.text}`}
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag);
          }}
          {...args}
        />
      ))}
    </>
  );
};

Dismissible.args = {
  disabled: false,
  size: 'md',
};

Dismissible.argTypes = {
  as: {
    table: {
      disable: true,
    },
  },
  filter: {
    table: {
      disable: true,
    },
  },
  selected: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};
