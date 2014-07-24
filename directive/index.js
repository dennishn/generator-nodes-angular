'use strict';
var util = require('util'),
    path = require('path'),
	ScriptBase = require('../script-base.js'),
    angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.type = 'directives';
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForHtml = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "confirm",
    name: "html",
    message: "Does this Directive need a html template ?",
    default: true
  }], function (props) {

    this.html = props.html;

    cb();
  }.bind(this));
};
Generator.prototype.askForScss = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "confirm",
    name: "scss",
    message: "Does this Directive need a scss template ?",
    default: true
  }], function (props) {

    this.scss = props.scss;

    cb();
  }.bind(this));
};

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.generateSourceAndTest(
    'directive',
    'spec/directive',
    'common/directives/' + this.name,
    this.options['add-index'] || true
  );
  if(this.scss) {
    this.template(
      '../scss/blank.scss',
      path.join(this.env.options.appPath, 'common/directives/' + this.name, '_' + this.name.toLowerCase() + '.scss')
    );
  }
  if(this.html) {
    this.template(
        '../simple.tpl.html',
        path.join(this.env.options.appPath, 'common/directives/' + this.name, this.name.toLowerCase() + '.tpl.html')
    )
  }
};

Generator.prototype.createDocumentation = function createDocumentation() {
  this.template(
    '../styleguide/doc.html',
    path.join(this.env.options.appPath, 'styleguide/pages/documentation/application/directives/' + this.name, this.name.toLowerCase() + '.html')
  )
}

Generator.prototype.createStyle = function createStyle() {
    var config = {
        file: path.join(this.env.options.appPath, 'scss/main.scss'),
        needle: '/* ---> Do not delete this comment (Directives) <--- */',
        splicable: ['@import "../common/directives/' + this.name + '/' + this.name.toLowerCase() + '";']
    }
    if(this.scss) {
        angularUtils.rewriteFile(config);
    }
}
