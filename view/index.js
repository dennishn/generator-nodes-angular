'use strict';
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  this.option('c', {
    desc: 'Skip adding the controller',
    type: String,
    required: 'true'
  });

  if(!this.options['c']) {
    this.hookFor('nodes-angular:controller');
  }

  this.sourceRoot(path.join(__dirname, '../templates'));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.template(
    'view.html',
    path.join(
      this.env.options.appPath,
      'app/' + this.name,
      this.name.toLowerCase() + '.tpl.html'
    )
  );
};
