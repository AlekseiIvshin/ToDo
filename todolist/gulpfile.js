'use strict';
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var babelify = require('babelify');
var sourceStream = require('vinyl-source-stream');

var paths = {
  app: __dirname + '/app',
  temp: __dirname + '/tmp',
  hybrid: __dirname + '/hybrid/www',
  scripts: '/scripts',
  styles: '/styles',
  fonts: '/fonts',
  index: '/index.html'
};

// Task serve should 1) creates 'tmp' directory and builds app in it; 2) starts webserver; 3) uses change watchers
gulp.task('serve', ['build.temp', 'watch', 'webserver']);

// Task build should builds application and copies it in hybrid/www
gulp.task('build', ['build.temp', 'build.hybrid']);

// Task add watchers for app resources
gulp.task('watch' , ['watch.scripts', 'watch.styles', 'watch.index']);

// Task should builds application into temp direcotry
gulp.task('build.temp', ['build.index', 'build.appjs', 'build.styles']);

// Tasks copies builded app into hybrid/www
gulp.task('build.hybrid', function() {
  gulp
    .src(paths.temp + '/**')
    .pipe(gulp.dest(paths.hybrid));
});

// Task builds index file in temp directory
gulp.task('build.index', ['build.libs'], function() {
  gulp
    .src(paths.app + paths.index)
    .pipe(gulp.dest(paths.temp));
});

// Task builds scripts files in temp directory
gulp.task('build.appjs', function() {
  browserify({
   entries: paths.app + paths.scripts + '/app.jsx',
   debug: true,
   paths: ['node_modules',
     'app/scripts',
     'app/scripts/components',
     'app/scripts/components/common',
     'app/scripts/components/todoList',
     'app/scripts/components/todoForm']
 })
   .transform(babelify, {presets: 'react'})
   .bundle()
   .pipe(sourceStream('app.js'))
   .pipe(gulp.dest(paths.temp + paths.scripts));
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

gulp.task('build.libs', function() {
  gulp
    .src([paths.app + paths.scripts + '/libs/**'])
    .pipe(gulp.dest(paths.temp + paths.scripts));
});

// Task starts webserver
gulp.task('webserver', function() {
  gulp.src(paths.temp)
    .pipe(webserver({
      liveload: true,
      directoryListing: true,
      open: 'http://localhost:8000/index.html#/'
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
