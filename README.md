Nodes Angular.js Generator
=====================

---------------

> Yeoman generator for AngularJS using a modular approach to filestructure and naming. Opinionated about the front-end workflow at Nodes.

----------

Whats included:
----------

 1. **Gulp**
 2. **Browser-sync**
 3. **JSHint**
 4. **Wiredep** (Include bower based dependencies easily)
 4. **Protractor** (E2E tests)
 5. **Sass** (Modular approach based on Atomic Design principles)
 6. **AngularJS** (Modular approach based on best practices and recommendations for non-monolithic apps) 
 7. Inlcude **Bootstrap** or **Foundation** (both optional)
 8. Include **jQuery**, and **Modernizr** (both optional)

---------

## Usage

Install `generator-nodes-angular`:
```
npm install -g git+https://github.com/dennishn/generator-nodes-angular.git
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo nodes-angular`, optionally passing an app name:
```
yo nodes-angular [app-name]
```

Run `gulp` for building and `gulp serve` for preview

---

App Structure
---------------
```
 - src/
    |- app/
        |- [module]/
            |- [module.js]
            |- [module.tpl.html]
    |- common/
        |- directives/
        |- factories/
        |- filters/
        |- services/
        |- providers/
    |- scss/
        |- elements/
        |- modules/
        |- components/
        |- ui-blocks/
        |- layouts/
        |- pages/
        |- plugins/
        |- main.scss
        |- fonts.scss
        |- _variabels.scss
        |- _functions.scss
        |- _mixins.scss
        |- _normalize.scss
    |- fonts/
    |- img/
    |- js/
    |- index.html
```

----------

## Generators

Available sub-generators:

Non-angular:
* [nodes-angular:font](https://github.com/dennishn/generator-nodes-angular/blob/master/font/USAGE.md)

Angular:
* [nodes-angular:controller](https://github.com/dennishn/generator-nodes-angular/blob/master/controller/USAGE.md)
* [nodes-angular:directive](https://github.com/dennishn/generator-nodes-angular/blob/master/directive/USAGE.md)
* [nodes-angular:filter](https://github.com/dennishn/generator-nodes-angular/blob/master/filter/USAGE.md)
* [nodes-angular:route](https://github.com/dennishn/generator-nodes-angular/blob/master/route/USAGE.md)
* [nodes-angular:service](https://github.com/dennishn/generator-nodes-angular/blob/master/service/USAGE.md)
* [nodes-angular:provider](https://github.com/dennishn/generator-nodes-angular/blob/master/provider/USAGE.md)
* [nodes-angular:factory](https://github.com/dennishn/generator-nodes-angular/blob/master/factory/USAGE.md)
* [nodes-angular:value](https://github.com/dennishn/generator-nodes-angular/blob/master/value/USAGE.md)
* [nodes-angular:constant](https://github.com/dennishn/generator-nodes-angular/blob/master/constant/USAGE.md)
* [nodes-angular:view](https://github.com/dennishn/generator-nodes-angular/blob/master/view/USAGE.md)
* [nodes-angular:test](https://github.com/dennishn/generator-nodes-angular/blob/master/test/USAGE.md)

-----------------------------------


License
---------------

The MIT License
