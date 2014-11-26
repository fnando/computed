var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');
var watch = require('gulp-watch');
var uglify = require('gulp-uglifyjs');
var sequence = require('run-sequence');

gulp.task('spec', function(){
  return gulp
    .src('spec/**/*_spec.js')
    .pipe(jasmine({
        integration: true
      , vendor: [
            'bower_components/es6-shim/es6-shim.js'
          , 'bower_components/es5-shim/es5-shim.js'
          , 'computed.js'
        ]
      , keepRunner: 'spec'
    }))
  ;
});

gulp.task('watch', function(){
  return gulp
    .watch(['computed.js', 'spec/**/*.js'], ['default'])
  ;
});

gulp.task('minify', function(){
  return gulp
    .src('computed.js')
    .pipe(uglify('computed.min.js'))
    .pipe(gulp.dest('.'))
  ;
});

gulp.task('default', function(next){
  return sequence('spec', 'minify', next);
});
