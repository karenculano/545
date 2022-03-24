/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { files } = require('@carbon/styles/files');
const fs = require('fs-extra');
const path = require('path');

async function build() {
  await Promise.all(
    files.map(async (file) => {
      const filepath = path.resolve(__dirname, '..', file.filepath);

      await fs.ensureFile(filepath);
      await fs.writeFile(
        filepath,
        `// Code generated by carbon-components. DO NOT EDIT.
//
// Copyright IBM Corp. 2018, 2018
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@forward '${file.importPath}';
`
      );
    })
  );
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
