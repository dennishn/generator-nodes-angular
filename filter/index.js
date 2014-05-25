'use strict';
var util = require('util'),
	ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {
  this.generateSourceAndTest(
    'filter',
    'spec/filter',
    'common/filters',
    this.options['add-index'] || true
  );
};
