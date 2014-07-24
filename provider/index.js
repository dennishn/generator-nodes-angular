// 'use strict';
// var util = require('util'),
//   ScriptBase = require('../script-base.js');


// var Generator = module.exports = function Generator() {

//   ScriptBase.apply(this, arguments);

//   this.option('skip', {
//     desc: 'Skip the boilerplate code',
//     type: String,
//     required: 'false'
//   });
// };

// util.inherits(Generator, ScriptBase);

// Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

// 	if (this.options['skip']) {
//   	console.log('boilerplate code for provider is not added!');
//   	this.skip = true;
// 	} else {
//     this.skip = false;
// 	}

//   this.generateSourceAndTest(
//     'provider',
//     'spec/provider',
//     'common/providers',
//     this.options['add-index'] || true
//   );
// };


'use strict';
var util = require('util'),
    path = require('path'),
    ScriptBase = require('../script-base.js'),
    angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForHtml = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: "confirm",
    name: "html",
    message: "Does this Provider need a html template ?",
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
    message: "Does this Provider need a scss template ?",
    default: true
  }], function (props) {

    this.scss = props.scss;

    cb();
  }.bind(this));
};

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.generateSourceAndTest(
    'provider',
    'spec/provider',
    'common/providers',
    this.options['add-index'] || true
  );
  if(this.scss) {
    this.template(
      '../scss/blank.scss',
      path.join(this.env.options.appPath, 'common/providers/' + this.name, '_' + this.name.toLowerCase() + '.scss')
    );
  }
  if(this.html) {
    this.template(
        '../main.tpl.html',
        path.join(this.env.options.appPath, 'common/providers/' + this.name, this.name.toLowerCase() + '.tpl.html')
    )
  }
};

Generator.prototype.createDocumentation = function createDocumentation() {
  this.template(
    '../styleguide/doc.html',
    path.join(this.env.options.appPath, 'styleguide/pages/documentation/application/providers/' + this.name, this.name.toLowerCase() + '.html')
  )
}

Generator.prototype.createStyle = function createStyle() {
    var config = {
        file: path.join(this.env.options.appPath, 'scss/main.scss'),
        needle: '/* ---> Do not delete this comment (Services) <--- */',
        splicable: ['@import "../common/providers/' + this.name + '/' + this.name.toLowerCase() + '";']
    }
    angularUtils.rewriteFile(config);
}
