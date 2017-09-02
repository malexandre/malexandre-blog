const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();

const css = () => {
  gulp
    .src("assets/css/**/*.css")
    .pipe(plugins.plumber())
    .pipe(plugins.csso({ comments: false }))
    .pipe(gulp.dest("static/css/"));
};

const img = () => {
  gulp
    .src("assets/img/**/*")
    .pipe(plugins.plumber())
    .pipe(
      plugins.imagemin([
        plugins.imagemin.gifsicle({ interlaced: true }),
        plugins.imagemin.jpegtran({ progressive: true }),
        plugins.imagemin.optipng(),
        plugins.imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("static/img/"));
};

gulp.task("css", css);
gulp.task("img", img);
gulp.task("watchers", ["css", "img"], () => {
  gulp.watch("assets/css/**/*.css", ["css"]);
  gulp.watch("assets/img/**/*", ["img"]);
});

gulp.task("default", ["watchers"]);
