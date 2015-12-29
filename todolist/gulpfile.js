'use strict';
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var browserifyHandlebars = require('browserify-handlebars');
var minifyHTML = require('gulp-minify-html');

var paths = {
  app: __dirname + '/app',
  temp: __dirname + '/tmp',
  hybrid: __dirname + '/hybrid/www',
  scripts: '/scripts',
  styles: '/styles',
  fonts: '/fonts',
  index: '/index.html',
  templates: '/templates'
};

// Task serve should 1) creates 'tmp' directory and builds app in it; 2) starts webserver; 3) uses change watchers
gulp.task('serve', ['build.temp', 'watch', 'webserver']);

// Task build should builds application and copies it in hybrid/www
gulp.task('build', ['build.temp', 'build.hybrid']);

// Task add watchers for app resources
gulp.task('watch' , ['watch.scripts', 'watch.styles', 'watch.index', 'watch.templates']);

// Task should builds application into temp direcotry
gulp.task('build.temp', ['build.index', 'build.templates', 'build.appjs', 'build.styles']);

// Tasks copies builded app into hybrid/www
gulp.task('build.hybrid', function() {
  gulp
    .src(paths.temp + '/**')
    .pipe(gulp.dest(paths.hybrid));
});

// Task builds index file in temp directory
gulp.task('build.index', ['build.indexlibs'], function() {
  gulp
    .src(paths.app + paths.index)
    .pipe(gulp.dest(paths.temp));
});

// Task builds scripts files in temp directory
gulp.task('build.appjs', function() {
  gulp
    .src(paths.app + paths.scripts + '/app.js')
    .pipe(browserify({
          debug: true,
          transform: [browserifyHandlebars],
          paths: ['node_modules', 'app/scripts/',
            'app/scripts/common/presenter',
            'app/scripts/common/model',
            'app/scripts/common/router',
            'app/scripts/inspection',
            'app/scripts/equipment',
            'app/templates/minified/inspection',
            'app/templates/minified/equipment']
        }))
    .pipe(gulp.dest(paths.temp + paths.scripts));
});

// Task builds index file in temp directory
gulp.task('build.templates', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  gulp
    .src([paths.app + paths.templates + '/**', '!' + paths.app + paths.templates + '/minified', '!' + paths.app + paths.templates + '/minified/**'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.app + paths.templates + '/minified'));
});

// Task builds styles files in temp directory
gulp.task('build.styles', ['build.fonts'], function() {
  gulp
    .src(paths.app + paths.styles + '/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.temp + paths.styles));
});

// Task copy fonts
gulp.task('build.fonts', function() {
  gulp
    .src(paths.app + paths.fonts + '/**')
    .pipe(gulp.dest(paths.temp + paths.fonts));

});

gulp.task('build.indexlibs', function() {
  gulp
    .src(paths.app + paths.scripts + '/cssua**.js')
    .pipe(gulp.dest(paths.temp + paths.scripts));
});

// Task starts webserver
gulp.task('webserver', function() {
  gulp.src(paths.temp)
    .pipe(webserver({
      liveload: true,
      directoryListing: true,
      open: 'http://localhost:8000/index.html#/equipment'
	}));
});

// Adds watchers for styles
gulp.task('watch.styles', function() {
  gulp.watch(paths.app + paths.styles + '/**', ['build.styles']);
});

// Adds watchers for scripts
gulp.task('watch.scripts', function() {
  gulp.watch(paths.app + paths.scripts+ '/**', ['build.appjs']);
});

// Adds watchers for index
gulp.task('watch.index', function() {
  gulp.watch(paths.app + paths.index, ['build.index']);
});

// Adds watchers for templates
gulp.task('watch.templates', function() {
  gulp.watch([paths.app + paths.templates + '/**', '!' + paths.app + paths.templates + '/minified/**'], ['build.templates', 'build.appjs']);
});
