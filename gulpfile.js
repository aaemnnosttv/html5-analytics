var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');

gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))  
})
 
gulp.task('compress', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('build', ['clean','lint','compress']);
gulp.task('default', ['build']);
