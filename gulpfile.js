const gulp = require('gulp');
const htmlPartial = require('gulp-html-partial');

gulp.task('build', function () {
    gulp.src(['Views/*.html'])
        .pipe(htmlPartial({basePath: 'Views/Partials/'}))
        .pipe(gulp.dest('public'));
        
    gulp.src('Scripts/*.js')
        .pipe(gulp.dest('public/Scripts'))
    gulp.src('Style/*.css')
        .pipe(gulp.dest('public/Style'))
    gulp.src('flags/**/*.svg')
        .pipe(gulp.dest('public/flags'))
});