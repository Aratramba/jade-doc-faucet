#!/usr/bin/env node
'use strict';
/* global require, process */


var meow = require('meow');
var faucet = require('./index');

meow({
  help: [
    'Usage',
    '  $ pug-doc --input file.jade | pug-doc-faucet',
    '',
  ]
});

process.stdin.pipe(faucet.in);
faucet.out.pipe(process.stdout);