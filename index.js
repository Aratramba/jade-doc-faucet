'use strict';
/* global require, module */

var JSONStream = require('JSONStream');
var truncate = require('truncate');
var chalk = require('chalk');
var through2 = require('through2');

/**
 * Pretty terminal output for pug-doc stream
 */

var outStream = through2(function(chunk, enc, next){
  this.push(chunk.toString());
  next();
});


var inStream = JSONStream.parse('*');
inStream.on('data', function(obj){
  var line = [];

  // show if name is present
  if(typeof obj.meta.name !== 'undefined'){
    line.push(obj.meta.name);
    line.push(' - ');
  }

  // add truncated html output
  line.push(chalk.dim(truncate(obj.output, 40)));

  outStream.push(line.join('') +'\n');
});

outStream.push(chalk.green('Generating Pug-doc\n'));

inStream.on('end', function(){
  outStream.push(chalk.green('Pug-doc complete'));
});

module.exports = {
  in: inStream,
  out: outStream
};