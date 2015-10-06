'use strict';
/* global require */

var test = require('tape');
var through2 = require('through2');
var jdf = require('.');


/**
 * Dumb test to check if output markdown is as expected
 */

test('test input / output', function(assert){
  assert.plan(1);

  var stream = through2(function(chunk, enc, next){
    this.push(chunk);
    next();
  });


  stream.push(JSON.stringify({"meta":{"name":"foo"},"file":"test/fixtures/test.jade","source":"div.foo","output":"<div class=\"foo\"></div>"}));
  stream.push(null);
  stream.pipe(jdf);

  jdf.on('data', function(data){
    var actual = data.toString();
    var expected = '* foo - <div class="foo"></div>\n';
    assert.equal(actual, expected, 'output should be correct.');

  });
});