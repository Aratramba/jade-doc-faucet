'use strict';
/* global require */


var jdf = require('../index');
var JSONStream = require('JSONStream');
var through2 = require('through2');
var test = require('tape');

 
test('spawn pug-doc-faucet', function (assert){


  var stream = through2({ objectMode: true },
    function(chunk, enc, next){
      this.push(chunk);
      next();
    }, 
    function(cb){
      cb();
    }
  );

  var assertStream = through2();
  var counter = 0;
  assert.plan(3);

  assertStream.on('data', function(data){
    var actual = data.toString();
    var expected;

    switch(counter){
      case 0:
      expected = 'Generating Pug-doc\n';
      break;

      case 1:
      expected = 'extends - <div class=\'some-tag\'>this is some tag f…\n';
      break;

      case 2:
      expected = 'Pug-doc complete';
      break;
    }

    assert.equal(actual, expected);
    ++counter;
  });

  stream.pipe(JSONStream.stringify()).pipe(jdf.in);
  jdf.out.pipe(assertStream);

  stream.push({
    'meta': {
      'name': 'extends',
      'locals': {
        'foo': 'foo'
      }
    },
    'file': 'test/fixtures/extends.jade',
    'source': 'extends tag.jade',
    'output': '<div class=\'some-tag\'>this is some tag foo</div><div class=\'some-other-tag\'>this is some other tag</div>'
  });
  stream.end();
});



