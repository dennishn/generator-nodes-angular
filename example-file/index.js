'use strict';
var util = require('util'),
    path = require('path'),
    ScriptBase = require('../script-base.js'),
    angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForExampleValues = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "list",
    name: "type",
    message: "What kind of example would you like ?",
    choices: [
        'elements',
        'modules',
        'components',
        'ui-blocks',
        'layouts',
        'pages',
        'directive',
        'service',
        'provider'
    ]
  }], function (props) {

    this.type = props.type;

    cb();
  }.bind(this));
};


Generator.prototype.createExampleFiles = function createExampleFiles() {
  this.template(
      '../example.tpl.html',
      path.join(this.env.options.appPath, 'styleguide/partials/examples/' + this.type + '/' + this.name + '.html')
  )
};
