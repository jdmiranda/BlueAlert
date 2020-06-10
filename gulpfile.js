(function() {
    'use strict';

    var gulp = require('gulp'),
        browserSync = require('browser-sync'),
        runSequence = require('run-sequence'),
        watch = require('gulp-watch');
    var reload = browserSync.reload;

    gulp.task('default', ['watch'],
        function(done) {
            browserSync({
                open: true,
                port: 8080,
                server: {
                    baseDir: './',
                    index: 'index.html'
                }
            }, done);
        }
    );

    gulp.task('watch', function() {
        // Scripts
        watch(['./**/*.js', './**/*.html', './**/*.css'], reload);
    });
})();
