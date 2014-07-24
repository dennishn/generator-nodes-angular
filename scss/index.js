'use strict';
var util = require('util'),
    path = require('path'),
    ScriptBase = require('../script-base.js'),
    angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForScssType = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "list",
    name: "type",
    message: "What kind of example would you like ?",
    choices: [
        'mixins',
        'functions',
        'base',
        'elements',
        'modules',
        'components',
        'ui-blocks',
        'layouts',
        'pages',
        'plugins'
    ]
  }], function (props) {

    this.type = props.type;

    cb();
  }.bind(this));
};


Generator.prototype.createDocumentationFiles = function createDocumentationFiles() {
  this.template(
      '../styleguide/doc.html',
      path.join(this.env.options.appPath, 'styleguide/pages/documentation/styleguide/' + this.type + '/' + this.name + '.html')
  )
};

Generator.prototype.createScss = function createScss() {
  this.template(
      '../mixins.scss',
      path.join(this.env.options.appPath, 'scss/' + this.type + '/_' + this.name + '.scss')
  )
};

Generator.prototype.createStyle = function createStyle() {
    var config = {
        file: path.join(this.env.options.appPath, 'scss/main.scss'),
        needle: '/* ---> Do not delete this comment (' + this.type + ') <--- */',
        splicable: ['@import "../' + this.type + '/' + this.name.toLowerCase() + '";']
    }
    angularUtils.rewriteFile(config);
}
