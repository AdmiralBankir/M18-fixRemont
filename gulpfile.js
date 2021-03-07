'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var svgstore = require('gulp-svgstore');
var del = require('del');

gulp.task('css', function () {
  return gulp.src('source/css/style.css')
    .pipe(plumber())
    .pipe(
      postcss([autoprefixer(), atImport()])
    )
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/css/*.css', gulp.series('css', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return gulp.src('js/**')
    .pipe(gulp.dest('build/js'));
})

gulp.task('sprite', function () {
  return gulp.src('source/img/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite_auto.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('img', function () {
  return gulp.src('source/img/*')
    .pipe(gulp.dest('build/img'));
})

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'js', 'img', 'css', 'html'));
gulp.task('start', gulp.series('build', 'server'));
