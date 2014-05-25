'use strict';
var util = require('util'),
	ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.generateSourceAndTest(
    'directive',
    'spec/directive',
    'common/directives',
    this.options['add-index'] || true
  );
};
