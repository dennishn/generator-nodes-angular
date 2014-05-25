'use strict';
var util = require('util'),
  ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForConstantValue = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "input",
    name: "module",
    message: "Which module does this controller belong to? '" + this.name + "' : "
  }], function (props) {

    this.module_value = props.module;

    cb();
  }.bind(this));
};

Generator.prototype.createControllerFiles = function createControllerFiles() {

  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    'app/' + this.module_value + '/',
    this.options['add-index'] || true,
    this.module
  );
};
