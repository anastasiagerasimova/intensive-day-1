
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');

//Gulp task для  компиляции SASS в SCC
gulp.task('scss', function() {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});

//Gulp task для поднятия локального сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

// Следим за файлами и обновляем браузер
gulp.task('watch', function() {
    watch(['./src/*.html', './src/*.css', './src/*.js', './src/img/*.*'], gulp.parallel(browserSync.reload));
    watch('./src/scss/**/*.scss', function(){
        setTimeout(gulp.parallel("scss"), 1000);
    });
});

//Запискаем дефолтный task
gulp.task('default', gulp.series('scss', gulp.parallel('server', 'watch')));

//Создаем первый Gulp Task
// gulp.task("hello", function(callback) {
    // console.log("Hello, from gulp");
    // callback();
// });

// gulp.task("goodbye", function(callback) {
    // console.log("Bye, bye, from gulp");
    // callback();
// });

//Последовательное выполнение задач
// gulp.task('default', gulp.series('hello', 'goodbye'));

// Параллельное (одновременное) выполнение задач
// gulp.task('default', gulp.parallel('hello', 'goodbye'));