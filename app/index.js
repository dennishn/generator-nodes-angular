'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    angularUtils = require('../util.js'),
    git = require('simple-git')();


var fs = require('fs');

var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.env.options.angularDeps = "";

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'true'
  });

  this.scriptAppName = this.appname + angularUtils.appName(this);

  args = ['main'];

   if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'src';
  }

  this.appPath = this.env.options.appPath;

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install']

    });

  });

  var enabledComponents = [];

  if (this.resourceModule) {
    enabledComponents.push('angular-resource/angular-resource.js');
  }

  if (this.cookiesModule) {
    enabledComponents.push('angular-cookies/angular-cookies.js');
  }

  if (this.sanitizeModule) {
    enabledComponents.push('angular-sanitize/angular-sanitize.js');
  }

  if (this.routeModule) {
    enabledComponents.push('angular-route/angular-route.js');
  }

  if (this.animateModule) {
    enabledComponents.push('angular-animate/angular-animate.js');
  }

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.welcome = function welcome() {

  // welcome message
  if (!this.options['skip-welcome-message']) {

    console.log('Welcome to the Nodes Angular.js WebApp Generator.\n');
    // have Yeoman greet the user.
    console.log(this.yeoman);
  }
};

Generator.prototype.askForLib = function askFor() {
  var cb = this.async();
  this.prompt([{
  type: "confirm",
    name: "jquery",
    message: "Would you like to include jQuery?",
    default: true
  }], function (props) {
      this.jquery = props.jquery;

      cb();
  }.bind(this));
};


Generator.prototype.askForModernizr = function askFor() {
  var cb = this.async();
  this.prompt([{
    type: 'confirm',
    name: 'modernizr',
    message: 'Would you like to include Modernizr ?',
    default: true
  }], function (props) {
    this.modernizr = props.modernizr;

    cb();
  }.bind(this));
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which Angular modules would you like to include ?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: true
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: true
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }, {
      value: 'routeModule',
      name: 'angular-route.js',
      checked: true
    }, {
      value: 'animateModule',
      name: 'angular-animate.js',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.routeModule = hasMod('routeModule');
    this.animateModule = hasMod('animateModule');

    var angMods = [];

    if (this.cookiesModule) {
      angMods.push("'ngCookies'");
    }

    if (this.resourceModule) {
      angMods.push("'ngResource'");
    }

    if (this.sanitizeModule) {
      angMods.push("'ngSanitize'");
    }

    if (this.routeModule) {
      angMods.push("'ngRoute'");
      this.env.options.ngRoute = true;
    }

    if (this.animateModule) {
      angMods.push("'ngAnimate'");
    }

    if (angMods.length) {
      this.env.options.angularDeps = this.env.options.angularDeps + angMods.join(", ");
    }

    this.angularModules = this.env.options.angularDeps;
    this.ngRoute = this.env.options.ngRoute;

    cb();
  }.bind(this));
};

Generator.prototype.askForFramework = function askForFramework() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'framework',
    message: 'Would you like to include a framework ?',
    choices: [{
      value: 'foundation',
      name: 'Foundation',
      checked: false
    }, {
      value: 'bootstrap',
      name: 'Bootstrap',
      checked: false
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.framework.indexOf(mod) !== -1; };
    this.foundation = hasMod('foundation');
    this.bootstrap = hasMod('bootstrap');

    var frameworkMods = [];

    if (this.foundation) {
      frameworkMods.push("'foundation'");
    }

    if (this.bootstrap) {
      frameworkMods.push("'bootstrap'");
    }

    if (frameworkMods.length) {
      this.env.options.frameworkDeps = this.env.options.frameworkDeps + frameworkMods.join(", ");
    }

    this.frameworkModules = this.env.options.frameworkDeps;

    cb();
  }.bind(this));
};

Generator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/app');
  this.mkdir('src/app/main');
  this.mkdir('src/common');
  this.mkdir('src/img');
  this.mkdir('src/fonts');

  this.mkdir('src/scss');
  this.mkdir('src/scss/elements');
  this.mkdir('src/scss/modules');
  this.mkdir('src/scss/components');
  this.mkdir('src/scss/ui-blocks');
  this.mkdir('src/scss/layouts');
  this.mkdir('src/scss/pages');
  this.mkdir('src/scss/plugins');

  this.mkdir('src/styleguide/assets');
  this.mkdir('src/styleguide/assets/js');
  this.mkdir('src/styleguide/assets/scss');
  // this.mkdir('src/styleguide/assets/scss/elements');
  // this.mkdir('src/styleguide/assets/scss/modules');
  // this.mkdir('src/styleguide/assets/scss/components');
  // this.mkdir('src/styleguide/assets/scss/ui-blocks');
  // this.mkdir('src/styleguide/assets/scss/layouts');
  // this.mkdir('src/styleguide/assets/scss/pages');
  // this.mkdir('src/styleguide/assets/scss/plugins');

  this.mkdir('src/styleguide/data');

  this.mkdir('src/styleguide/layouts');

  this.mkdir('src/styleguide/pages');
  this.mkdir('src/styleguide/pages/documentation');
  // this.mkdir('src/styleguide/pages/documentation/styles');
  // this.mkdir('src/styleguide/pages/documentation/application');
  // this.mkdir('src/styleguide/pages/documentation/libs');

  this.mkdir('src/styleguide/partials');

  this.mkdir('tests/e2e/');
  this.mkdir('tests/api/');

  this.jsFile = this.engine(this.read('../../templates/app.js'), this);
  this.write(path.join(this.appPath, '/app/app.js'), this.jsFile);

  this.startControllerFile = this.engine(this.read('../../templates/main.js'), this);
  this.write(path.join(this.appPath, '/app/main/main.js'), this.startControllerFile);

  this.scssFile = this.engine(this.read('../../templates/main.scss'), this);
  this.write(path.join(this.appPath, '/scss/main.scss'), this.scssFile);

  // this.functionssFile = this.engine(this.read('../../templates/functions.scss'), this);
  // this.write(path.join(this.appPath, '/scss/_functions.scss'), this.functionssFile);

  // this.mixinsFile = this.engine(this.read('../../templates/mixins.scss'), this);
  // this.write(path.join(this.appPath, '/scss/_mixins.scss'), this.mixinsFile);

  this.variablesFile = this.engine(this.read('../../templates/variables.scss'), this);
  this.write(path.join(this.appPath, '/scss/_variables.scss'), this.variablesFile);

  this.normalizeFile = this.engine(this.read('../../templates/normalize.scss'), this);
  this.write(path.join(this.appPath, '/scss/_normalize.scss'), this.normalizeFile);

  this.homeFile = this.engine(this.read('../../templates/main.tpl.html'), this);
  this.write(path.join(this.appPath, '/app/main/main.tpl.html'), this.homeFile);

  this.testConfigAPIFile = this.engine(this.read('../../templates/testConfigAPI.js'), this);
  this.write('./tests/all_api.js', this.testConfigAPIFile);

  this.testConfigE2EFile = this.engine(this.read('../../templates/testConfigE2E.js'), this);
  this.write('./tests/all_e2e.js', this.testConfigE2EFile);

  this.testFile = this.engine(this.read('../../templates/sampleTest.js'), this);
  this.write('./tests/e2e/sample_test.js', this.testFile);

  this.copy('_fonts.scss', path.join(this.appPath, '/scss/fonts.scss'));
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_.bowerrc', '.bowerrc');
  this.copy('_gulpfile.js', 'gulpfile.js');
};

Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('_.gitignore', '.gitignore');
  this.copy('_README.md', 'README.md');
};


Generator.prototype.readIndex = function readIndex() {

  this.indexFile = this.engine(this.read('../../templates/index.html'), this);

};

Generator.prototype.createIndexHtml = function createIndexHtml() {

  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.gitIsTheShit = function() {
    // function(repo, path, then)
    var cb = this.async(),
        me = this;

    git.submoduleAdd('https://github.com/dennishn/nodes_styleguide.git', 'styleguide', function(error) {
        if (error) me.logger.error(error);

        git.checkout('master', function(error) {
            if (error) me.logger.error(error);

            cb();
        });
    });

};
