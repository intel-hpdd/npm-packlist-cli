#!/usr/bin/env node

// Copyright (c) 2018 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

const packlist = require('npm-packlist');
const sep = require('path').sep;
const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2), {
  alias: {
    output: ['o']
  },
  default: {
    output: 'json'
  },
  unknown(x) {
    throw new Error('got unknown arg: ' + x);
  }
});

const buildPaths = x =>
  x.split(sep).reduce((prev, _, idx, arr) => {
    const y = arr.slice(0, idx + 1).join(sep);

    return prev.concat(y);
  }, []);

const uniq = xs => [...new Set(xs)];

switch (args.output.toLowerCase()) {
  case 'json':
    packlist({ path: process.cwd() })
      .then(xs => JSON.stringify(xs, null, 2))
      .then(console.log);
    break;
  case 'make':
    packlist({ path: process.cwd() }).then(xs => {
      const out = xs
        .map(x => x.replace(' ', '\\ '))
        .map(buildPaths)
        .reduce((a, b) => a.concat(b), [])
        .sort();

      console.log(uniq(out).join(' '));
    });
    break;
  default:
    throw new Error('got unknow output type');
}
