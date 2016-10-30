var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');

var sassOption = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

//watch
gulp.task('watch', function(){
	gulp.watch('../src/scss/**/*.scss', ['sass-compile']);
});

//style
gulp.task('sass-compile', function(){
	return gulp.src(['../src/scss/**/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass(sassOption).on('error', sass.logError))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('../src/css'));
})
