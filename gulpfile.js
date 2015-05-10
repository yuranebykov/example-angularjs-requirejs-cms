var gulp = require('gulp'),
    sass  = require('gulp-sass');

var server = require('./server');

var tinylr;
function startLivereload() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
}

function notifyLivereload(event) {
    var filename = require('path').relative('/', event.path);

    tinylr.changed({
        body: {
            files: [filename]
        }
    });
}

function watchFiles() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('*.html', notifyLivereload);
    gulp.watch('js/*.js', notifyLivereload);
    gulp.watch('css/*.css', notifyLivereload);
}

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
    server({livereload: true});
    startLivereload();
    watchFiles();
});