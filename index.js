'use strict';
/* global require, module, console */

var JSONStream = require('JSONStream');
var truncate = require('truncate');
var chalk = require('chalk');


/**
 * Pretty terminal output for jade-doc stream
 */

var stream = JSONStream.parse('*');
stream.on('data', function(obj){
  var line = [];
  line.push('* '+ obj.meta.name);
  line.push(' - ');
  line.push(chalk.dim(truncate(obj.output, 40)));

  console.log(line.join(''));
});

console.log(chalk.green('Generating Jade-doc\n'));

stream.on('end', function(){
  console.log(chalk.green('Jade-doc complete'));
});

module.exports = stream;