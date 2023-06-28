import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

const server = browserSync.create();

export const styles = () => {
  return gulp.src('src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/css'));
}

export const images = (done) => {
  return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/assets/images')),
  done();
}

export const watch = () => {
  gulp.watch('src/scss/*.scss', gulp.series(styles, reload));
  gulp.watch('**/*.html', reload);
  gulp.watch('**/*.php', reload);
  gulp.watch('src/images/**/*',  gulp.series(images, reload));
}

export const serve = (done) => {
  server.init({
    server: true,
    // proxy: "http://ark",
  });
  done();
}

export const reload = (done) => {
  server.reload();
  done();
}

// export const dev = gulp.series(styles,serve,watch,reload);
export const dev = gulp.series(serve, reload, gulp.parallel(styles),watch);

export const build = gulp.series(styles,images);

export default dev;
