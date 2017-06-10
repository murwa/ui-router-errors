var uglify = require('gulp-uglify'),
    gulp = require('gulp'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src(['src/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ basename: "ui-router-errors", suffix: ".min", extname: ".js" }))
        .pipe(gulp.dest('dist/'));
});
