var  gulp = require('gulp');
var  browserSync = require('browser-sync');
var  sourceMap = require('gulp-sourcemaps');
var  sass = require('gulp-sass');
var  autoprefixer = require('gulp-autoprefixer');
var  notify = require("gulp-notify");

var  env, sassSources, htmlSources, jsSources;

env = process.env.NODE_ENV || 'dev';



sassSources = ['styles/*.scss'];
htmlSources = ['*.html'];
jsSources = ['scripts/**/*.js'];


gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(sourceMap.init())
    .pipe(sass({
        outputStyle: 'compressed'
      })
        .on('error', notify.onError({
          title: "Sass error - line <%= error.line %>",
          message: "<%= error.message %>",
        }))
    )
    .pipe(autoprefixer({
      browsers: ["> 0%"]
    }))

    .pipe(sourceMap.write('./maps'))
    .pipe(gulp.dest('Styles/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('jsReload', function () {
  gulp.src(jsSources)
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
  gulp.src(htmlSources)
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('watch', function () {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsSources, ['jsReload']);
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      index:'index.html',
      directory: true,
      reloadDebounce:200,
    }
  });
});


gulp.task('default', ['watch', 'sass', 'browser-sync', 'html', 'jsReload']);

