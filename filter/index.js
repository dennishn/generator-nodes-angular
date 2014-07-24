'use strict';
var util = require('util'),
    path = require('path'),
	ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.type = 'filters';
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

Generator.prototype.createDocumentation = function createDocumentation() {
  this.template(
    '../styleguide/doc.html',
    path.join(this.env.options.appPath, 'styleguide/pages/documentation/application/filters/' + this.name, this.name.toLowerCase() + '.html')
  )
};
