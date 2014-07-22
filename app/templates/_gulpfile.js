'use strict';
// generated on 2014-05-24 using generator-nodes-angular 0.0.1

var gulp = require('gulp');


// load plugins
var $ = require('gulp-load-plugins')();
var deploy = require("gulp-gh-pages");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Settings
var settings = {
    port: 9000,
    devPaths: {
        app: 'src',
        sass: 'src/scss',
        css: 'src/css',
        images: 'src/img',
        fonts: 'src/fonts',
        application: 'src/app',
        common: 'src/common',
        javascript: 'src/js'
    },
    distPaths: {
        app: 'dist',
        css: 'dist/css',
        images: 'dist/img',
        fonts: 'dist/fonts',
        application: 'dist/app',
        javascript: 'dist/js'
    }
};

gulp.task('styles', function () {
    return gulp.src(settings.devPaths.sass + '/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 2 version'))
        .pipe(gulp.dest(settings.devPaths.css))
        .pipe(reload({stream:true}))
        .pipe($.size());
});

gulp.task('sg-styles', function () {
    return gulp.src('src/styleguide/assets/scss/docs.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 2 version'))
        .pipe(gulp.dest('src/styleguide/assets/css'))
        .pipe(reload({stream:true}))
        .pipe($.size());
});

gulp.task('jshint', function () {
    return gulp.src([
            settings.devPaths.application + '/**/*.js',
            settings.devPaths.common + '/**/*.js',
            settings.devPaths.javascript + '/**/*.js']
        , { dot: true })
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('html', ['styles'], function () {
    var jsFilter = $.filter('/**/*.js');
    var cssFilter = $.filter('/**/*.css');

    return gulp.src([settings.devPaths.app + '/**/*.html', '!src/bower_components/**/*.html', '!src/styleguide/**/*.html'])
        .pipe($.useref.assets({searchPath: [settings.devPaths.app]}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest(settings.distPaths.app))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src(settings.devPaths.images + '/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(settings.distPaths.images))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
        $.bowerFiles(),
        gulp.src(settings.devPaths.fonts + '/**/*')
    )
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(settings.distPaths.fonts))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src([settings.devPaths.app + '/*.*', '!' + settings.devPaths.app + '/*.html'], { dot: true })
        .pipe(gulp.dest(settings.distPaths.app));
});

gulp.task('html-sg', function () {
    var jsFilter = $.filter('/**/*.js');
    var cssFilter = $.filter('/**/*.css');

    return gulp.src('src/styleguide/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('styleguide/'))
        .pipe($.size());
});
gulp.task('generate-sg-project', function () {
    return gulp.src(['dist/**/*.*'], { dot: true })
        .pipe(gulp.dest('styleguide/'));
});
gulp.task('generate-sg', function () {
    return gulp.src(['src/styleguide/assets/**/*.*'], { dot: true })
        .pipe(gulp.dest('styleguide/assets'));
});

gulp.task('deploy-sg', function() {
    return gulp.src('styleguide')
        .pipe($.subtree());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', settings.distPaths.app], { read: false }).pipe($.clean());
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras']);
gulp.task('build-sg', ['build', 'generate-sg-project', 'generate-sg', 'html-sg']);
gulp.task('serve', ['wiredep', 'watch']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('browser-sync', ['styles'], function () {
    browserSync.init([
            settings.devPaths.app + '/**/*.html',
            '!styleguide/**/*.{html,md}',
            'styleguide/assets/**.*',
            settings.devPaths.css + '/**/*.css',
            settings.devPaths.application + '/**/*.js',
            settings.devPaths.common + '/**/*.js',
            settings.devPaths.javascript + '/**/*.js',
            settings.devPaths.images + '/**/*'
        ], {
        server: {
            baseDir: [settings.devPaths.app, '.tmp'],
            directory: true
        },
        debugInfo: true,
        open: false,
        host: "127.0.0.1"
    }, function (err, bs) {
        require('opn')(bs.options.url);
        console.log('Started connect web server on ' + bs.options.url);
    });
});

gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;
    gulp.src(settings.devPaths.app + '/index.html')
        .pipe(wiredep({
            exclude: [
                'modernizr.js',
                'foundation.css'
                ]
        }))
        .pipe(gulp.dest(settings.devPaths.app));

    gulp.src('src/styleguide/layouts/*.html')
        .pipe(wiredep({
            exclude: [
                'modernizr.js',
                'foundation.css'
            ],
            ignorePath: '../'
        }))
        .pipe(gulp.dest('src/styleguide/layouts'));
});

gulp.task('watch', ['browser-sync'], function () {

    gulp.watch(settings.devPaths.app + '/**/*.html', reload);
    gulp.watch(settings.devPaths.sass + '/**/*.scss', ['styles']);
    gulp.watch('src/styleguide/assets/scss/**/*.scss', ['sg-styles']);
    gulp.watch(settings.devPaths.application + '/**/*.js', ['jshint']);
    gulp.watch(settings.devPaths.common + '/**/*.js', ['jshint']);
    gulp.watch(settings.devPaths.javascript + '/**/*.js', ['jshint']);
    gulp.watch(settings.devPaths.images + '/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);

});
