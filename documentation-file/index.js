'use strict';
var util = require('util'),
    path = require('path'),
    ScriptBase = require('../script-base.js'),
    angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createExampleFiles = function createExampleFiles() {
  this.template(
      '../documentation.tpl.html',
      path.join(this.env.options.appPath, 'styleguide/pages/' + this.name + '.html')
  )
};
