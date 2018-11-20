'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

const steps = [
  {
    state: 'complete',
    label: 'First step',
  },
  {
    state: 'current',
    label: 'Second step',
  },
  {
    state: 'incomplete',
    label: 'Third step',
  },
  {
    state: 'incomplete',
    label: 'Fourth step',
    invalid: true,
  },
  {
    state: 'incomplete',
    label: 'Fifth step',
    disabled: true,
  },
];

module.exports = {
  context: {
    prefix,
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'Progress Indicator',
      context: {
        steps,
      },
    },
  ],
};
