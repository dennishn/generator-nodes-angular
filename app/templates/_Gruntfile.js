module.exports = function(grunt) {
  // var hljs = require('highlight.js');
  // hljs.LANGUAGES['scss'] = require('./src/styleguide/helpers/scss.js')(hljs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        marked: {
          highlight: function(code, lang) {
            return require('highlight.js').highlightAuto(code).value;
          }
        },
        collections: [
          {
            name: 'component',
            sortby: 'sort',
            sortorder: 'ascending'
          }
        ]
      },
      dist: {
        options: {
          flatten: false,
          assets: 'src/styleguide/assets',
          projectassets: '..',
          data: ['src/styleguide/data/*.json'],
          helpers: ['src/styleguide/helpers/*.js', '*-helpers', '*-helper'],
          partials: ['src/styleguide/partials/**/*.{html,scss}'],
          layoutdir: 'src/styleguide/layouts',
          layout: 'default.html'
        },
        expand: true,
        cwd: 'src/styleguide',
        src: ['pages/**/*.{html,md}'],
        dest: 'src/styleguide',
        flatten: true
      }
    },

    clean: ['src/styleguide/*.html'],

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },
      assemble_all: {
        files: ['src/styleguide/{includes,layouts}/**/*.html'],
        tasks: ['assemble'],
        options: {livereload:false}
      },
      assemble_pages: {
        files: ['src/styleguide/pages/**/*.{html,md}'],
        tasks: ['assemble'],
        options: {livereload:false}
      }
    },
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'watch']);
};
