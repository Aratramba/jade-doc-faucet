'use strict';
/* global require */

var spawn = require('tape-spawn');
var test = require('tape');
 
test('spawn jade-doc-faucet', function (assert){
  var st = spawn(assert, 'jade-doc ./fixtures/mixins.jade | node cli.js');
  st.stdout.match('Generating Jade-doc\n\n* mixin - <div>this is a mixin foo</div><div>this …\n\nJade-doc complete\n');
  st.end();
});