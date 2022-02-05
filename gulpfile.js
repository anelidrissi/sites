var livereload = require("gulp-livereload")
var gulp = require("gulp")
const { parallel } = require("gulp")

//gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin")
/// css
var cleanCSS = require("gulp-clean-css")
const { src } = require("gulp")

function minifyHtml() {
  return gulp
    .src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(livereload())
}

function movecss() {
  return gulp
    .src(["src/app.css"])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("build"))
    .pipe(livereload())
}

function toBuild() {
  return gulp
    .src(["src/fonts/*.*"])

    .pipe(gulp.dest(["build/fonts"]))
    .pipe(livereload())
}

function toBuildimg() {
  return gulp
    .src(["src/img/*.*"])

    .pipe(gulp.dest(["build/img"]))
    .pipe(livereload())
}

exports.default = function () {
  require("./server.js")
  livereload.listen()
  gulp.watch(
    ["src/index.html", "src/app.css"],
    parallel(minifyHtml, movecss, toBuild, toBuildimg)
  )
}
