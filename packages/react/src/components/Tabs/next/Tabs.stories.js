/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Tabs, { TabList, Tab, TabPanels, TabPanel } from './Tabs';
import TabsSkeleton from './Tabs.Skeleton';

import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react';

export default {
  title: 'Components/Tabs',
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  parameters: {
    component: Tabs,
    subcomponents: {
      Tab,
    },
  },
};

export const Default = () => (
  <Tabs>
    <TabList>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab>Tab Label 3</Tab>
      <Tab>Tab Label 4</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Skeleton = () => {
  const isLoading = true;

  return (
    <div style={{ maxWidth: '100%' }}>
      {isLoading ? (
        <TabsSkeleton />
      ) : (
        <Tabs>
          <Tab id="tab-1" label="Tab label 1">
            <p>Content for first tab goes here.</p>
          </Tab>
          <Tab id="tab-2" label="Tab label 2">
            <p>Content for second tab goes here.</p>
          </Tab>
          <Tab id="tab-3" label="Tab label 3" disabled>
            <p>Content for third tab goes here.</p>
          </Tab>
          <Tab
            id="tab-4"
            label="Tab label 4 shows truncation"
            title="Tab label 4 shows truncation">
            <p>Content for fourth tab goes here.</p>
          </Tab>
          <Tab label={<div>Custom Label</div>}>
            <p>Content for fifth tab goes here.</p>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export const Contained = () => (
  <Tabs>
    <TabList contained>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab>Tab Label 3</Tab>
      <Tab>Tab Label 4</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

// export const Contained = () => (
//   <ContainedTabs>
//     <ContainedTab id="tab-1" label="Tab label 1">
//       <p>Content for first tab goes here.</p>
//     </ContainedTab>
//     <ContainedTab id="tab-2" label="Tab label 2">
//       <p>Content for second tab goes here.</p>
//       <Button>With a button</Button>
//     </ContainedTab>
//     <ContainedTab id="tab-3" label="Tab label 3" disabled>
//       <p>Content for third tab goes here.</p>
//     </ContainedTab>
//     <ContainedTab
//       id="tab-4"
//       label="Tab label 4 shows truncation"
//       title="Tab label 4 shows truncation">
//       <p>Content for fourth tab goes here.</p>
//     </ContainedTab>
//     <ContainedTab label={<div>Custom Label</div>}>
//       <p>Content for fifth tab goes here.</p>
//     </ContainedTab>
//   </ContainedTabs>
// );
