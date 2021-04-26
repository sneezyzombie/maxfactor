const {src , dest , watch, parallel, series} = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const del = require("del");
const rename = require("gulp-rename");
const nunjucksRender = require("gulp-nunjucks-render");

function nunjucks() {
    return src("app/*.njk")
        .pipe(nunjucksRender())
        .pipe(dest("app"))
        .pipe(browserSync.stream())
}

function images(){
    return src("app/images/**/*.*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest("dist/images"))
}

function styles (){
    return src("app/scss/*.scss")
    // return src("app/scss/style.scss"
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true,
        }))
        // .pipe(concat("style.min.css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/slick-carousel/slick/slick.js",
        "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
        "node_modules/rateyo/src/jquery.rateyo.js",
        "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
        "node_modules/mixitup/dist/mixitup.js",
        "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
        "app/js/main.js"
    ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream())
}

function watching() {
    watch(["app/**/*.scss"], styles);
    // watch(["app/scss/**/*.scss"], styles);
    watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
    watch(["app/*.njk"], nunjucks);
    watch(["app/**/*.html"]).on("change", browserSync.reload);
}

function browsersync(){
    browserSync.init({
        server:{
            baseDir: "app/"
        },
        notify: false
    })
}

function build(){
    return src([
        "app/**/*.html",
        "app/css/style.min.css",
        "app/js/main.min.js",
    ], {base: "app"})
    .pipe(dest("dist"))
}

function cleanDist(){
    return del("dist")
}

exports.cleanDist = cleanDist;
exports.browsersync = browsersync;
exports.watching = watching;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.nunjucks = nunjucks;
exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, scripts, browsersync, watching);