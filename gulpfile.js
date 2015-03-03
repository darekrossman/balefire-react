var gulp = require('gulp');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');

gulp.task('browsersync', ['bundle'], function(){
  return browserSync({
    proxy: 'http://localhost:3333/balefire',
    files: ['**/dist/bundle.js', '**/*.css', '**/*.html']
  })  
})


gulp.task('bundle', function(){
  var bundler = browserify({
    debug: false,
    cache: {}, packageCache: {}, fullPaths: true
  });
  bundler.add('./node_modules/regenerator/runtime.js')
  bundler.add('./js/main.js', {entry: true});
  bundler.transform('babelify', {experimental: true});
  
  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle() {
    gutil.log('Browserifying...')
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .on('end', function(){
        gutil.log('(bundle) Finished browserifying')
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist/'));
  }

  return bundle();
})

gulp.task('sass', function () {
  return gulp.src(['css/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
});

gulp.task('set-watching', function(){
  global.isWatching = true;
})


gulp.task('watch', ['set-watching', 'bundle', 'sass', 'browsersync'], function(){
  gulp.watch('css/**/*.scss', ['sass']);
}); 

gulp.task('build', ['bundle', 'sass']);
