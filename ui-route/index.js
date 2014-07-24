'use strict';
var path = require('path'),
  util = require('util'),
  ScriptBase = require('../script-base.js'),
  angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.hookFor('nodes-angular:controller');
  this.hookFor('nodes-angular:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
    angularUtils.rewriteFile({
      file: path.join(this.env.options.appPath, 'app/app.js'),
      needle: '.otherwise',
      splicable: [
        '\t\t.state(\'' + this.name + '\', {',
        '\t\t\turl: \'/' + this.name + '\',',
        '\t\t\ttemplateUrl: \'app/' + this.name + '.html\',',
        '\t\t\tcontroller: \'' + this.classedName + 'Ctrl\'',
        '\t\t})'
      ]
    });
};
