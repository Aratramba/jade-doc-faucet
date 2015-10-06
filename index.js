'use strict';
/* global require, module, console */

var truncate = require('truncate');
var through2 = require('through2');
var chalk = require('chalk');


/**
 * Pretty terminal output for jade-doc stream
 */

var stream = through2(function(chunk, enc, next){
  var obj = JSON.parse(chunk);

  var line = [];
  line.push('* '+ obj.meta.name);
  line.push(' - ');
  line.push(chalk.dim(truncate(obj.output, 40)));
  line.push('\n');

  this.push(line.join(''));
  next();
});

console.log(chalk.green('Generating Jade-doc\n'));

stream.on('finish', function(){
  console.log(chalk.green('Jade-doc complete'));
});

module.exports = stream;