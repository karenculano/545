/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'update-icon-import-path');
