'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

  this.generateSourceAndTest(
    'service',
    'spec/services',
    'common/services',
    this.options['add-index'] || true
  );
};
