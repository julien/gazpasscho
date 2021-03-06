'use strict';

var gulp = require('gulp');
var metal = require('gulp-metal');

metal.registerTasks({
	taskPrefix: 'me:',
	bundleCssFileName: 'gazpasscho.css',
	bundleFileName: 'gazpasscho.js',
	moduleName: 'gazpasscho',
});

gulp.task('build', ['me:build'], () => {
	gulp
		.src('node_modules/lexicon-ux/src/fonts/alloy-font-awesome/font/**/*')
		.pipe(gulp.dest('build/fonts/alloy-font-awesome/font/'));
	gulp
		.src('node_modules/lexicon-ux/build/css/font-awesome.css')
		.pipe(gulp.dest('build/css'));
});
