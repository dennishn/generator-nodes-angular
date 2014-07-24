'use strict';
var util = require('util'),
  path = require('path'),
  ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.type = 'factories';

  this.option('api', {
    desc: 'Adding api skeleton',
    type: String,
    required: 'true'
  });
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

  if (this.options['api']) {
    console.log('Adding the API skeleton');
    this.inject = '$resource';
  } else {
    this.inject = '$rootScope';
  }

  this.generateSourceAndTest(
    'factory',
    'spec/factories',
    'common/factories',
    this.options['add-index'] || true
  );
};

Generator.prototype.createDocumentation = function createDocumentation() {
  this.template(
    '../styleguide/doc.html',
    path.join(this.env.options.appPath, 'styleguide/pages/documentation/application/factories/' + this.name, this.name.toLowerCase() + '.html')
  )
};
