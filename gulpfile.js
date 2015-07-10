var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var is_production = argv._[0] === 'prod_build';

var config = {
  docRoot: 'public/',
  sourcePath: 'source/'
};

var onError = notify.onError(function (error) {
  return error.message;
});

var onScriptError = notify.onError(function (error) {
  return error.toString();
});

gulp.task('default', ['styles', 'scripts', 'watch', 'connect']);

gulp.task('prod_build', ['styles', 'scripts', 'connect']);

gulp.task('styles', function() {
    gulp.src(config.sourcePath + 'sass/styles.sass')
      .pipe(gulpif(!is_production, sourcemaps.init()))
      .pipe(sass().on('error', onError))
      .pipe(gulpif(!is_production, sourcemaps.write()))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulpif(!is_production, sourcemaps.init()))
      .pipe(gulpif(!is_production, sourcemaps.write()))
      .pipe(gulpif(is_production, minifyCSS()))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.docRoot))
      .pipe(gulpif(!is_production, livereload()))
      .pipe(notify({message: 'Styles updated', onLast: true}));
});

gulp.task('scripts', function() {
  var opts = {
    entries: config.sourcePath + 'js/app.js',
    debug: !is_production,
    paths: [config.sourcePath + 'js', config.sourcePath + 'templates'],
    transform: ['node-underscorify']
  };
  return browserify(opts)
      .bundle()
      .on('error', onScriptError)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulpif(!is_production, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(!is_production, sourcemaps.write('./')))
      .pipe(gulpif(is_production, uglify()))
      .pipe(gulp.dest(config.docRoot))
      .pipe(gulpif(!is_production, livereload()))
      .pipe(notify({message: 'Scripts updated', onLast: true}));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(config.sourcePath + 'sass/**/*.sass', ['styles']);
  gulp.watch(config.sourcePath + 'js/**/*.js', ['scripts']);
  gulp.watch(config.sourcePath + 'templates/**/*.html', ['scripts']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: process.env.PORT || 8080,
    livereload: !is_production
  });
});
