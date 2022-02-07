var livereload = require("gulp-livereload")
var gulp = require("gulp")
const { parallel } = require("gulp")

//gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin")
/// css
var cleanCSS = require("gulp-clean-css")
const { src, dest, watch, series } = require("gulp")
const terser = require("gulp-terser")
const bbrowserSync = require("browser-sync").create()

//sass
const sass = require("node-sass")
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
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

function sasss() {
  return gulp
    .src("src/css/app.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest("src/app.css", { sourcemaps: "." }))
}

exports.default = function () {
  require("./server.js")
  livereload.listen()
  gulp.watch(
    ["src/index.html", "src/app.css", "src/css/app.scss"],
    parallel(minifyHtml, movecss, toBuild, toBuildimg, sasss)
  )
}
