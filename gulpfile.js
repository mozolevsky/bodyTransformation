var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util');

gulp.task('sass', function() {
    return gulp.src('app/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(csscomb())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('es6', function() {
    return gulp.src('app/js/scripts.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/js'))
});

gulp.task('scriptsMin', function() {
    return gulp.src('app/js/*')
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
});

gulp.task('libsCssMin',  function() {
    return gulp.src([
        'app/libs/normalize-css/normalize.css'])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
});


gulp.task('watch', ['sass', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('default', ['watch']);

gulp.task('clearCache', function() {
    return cache.clearAll();
});


gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svigoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});



gulp.task('build', ['clean', 'img','es6', 'sass', 'scriptsMin'], function() {
    var buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    var buldFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));

    var moveVideo = gulp.src('app/video/*')
        .pipe(gulp.dest('dist'));

    var moveLibs = gulp.src('app/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
});