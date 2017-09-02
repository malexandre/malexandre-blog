var del = require("del");
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();

const clean = () => {
  return del[
    './public',
    './static/img/'
  ]
}

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

const hugoBuild = () => plugins.sh;

gulp.task("clean", clean);
gulp.task("css", css);
gulp.task("img", img);

gulp.task("build", plugins.sequence('clean', ["css", "img"]));
gulp.task("watchers", ["build"], () => {
  gulp.watch("assets/css/**/*.css", ["css"]);
  gulp.watch("assets/img/**/*", ["img"]);
});

gulp.task("hugo:dev", ["watchers"], plugins.shell.task(["hugo server"]));
gulp.task("hugo:build", ["build"], plugins.shell.task(["hugo"]));
gulp.task("default", ["hugo:dev"]);
