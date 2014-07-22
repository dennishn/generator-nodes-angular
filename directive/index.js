'use strict';
var util = require('util'),
    path = require('path'),
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

Generator.prototype.createDocumentation = function createDocumentation() {
  this.template(
    'styleguide/doc.html',
    path.join(this.env.options.appPath, 'styleguide/pages/documentation/directives/' + this.name, this.name.toLowerCase() + '.html')
  )
}
