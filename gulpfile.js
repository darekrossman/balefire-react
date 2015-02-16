var gulp = require('gulp');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var es6ify = require('es6ify');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browsersync', ['bundle'], function(){
  return browserSync({
    server: {baseDir: './'},
    files: ['**/js/bundle.js', '**/*.css', '**/*.html']
  })  
})

gulp.task('bundle', function(){
  var bundler = browserify(watchify.args);
  bundler.add('./js/app.js');
  bundler.transform('reactify');
  bundler.transform('es6ify');
  
  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle() {
    gutil.log('Browserifying...')
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .on('end', function(){
        gutil.log('Finished browserifying')
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./js'));
  }

  return bundle();
})

gulp.task('sass', function () {
  return gulp.src(['css/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
});

gulp.task('set-watching', function(){
  global.isWatching = true;
})


gulp.task('watch', ['set-watching', 'bundle', 'browsersync'], function(){
  gulp.watch('css/**/*.scss', ['sass']);
}); 

gulp.task('build', ['bundle', 'sass']);
