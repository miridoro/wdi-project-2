const gulp     = require("gulp");
const babel    = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");

const src  = "src";
const dist = "public";

gulp.task("es6", () => {
	return gulp.src(`${src}/**/*.js`)
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(gulp.dest(dist));
});

gulp.task("minifyCSS", () => {
	return gulp.src(`${src}/**/*.css`)
		.pipe(cleanCSS({ compatibility: "ie8"}))
		.pipe(gulp.dest(dist));
});

gulp.task("watch", () => {
  gulp.watch(`${src}/**/*.js`, ['es6']);
	gulp.watch(`${src}/**/*.css`, ['minifyCSS']);
});

gulp.task("default", ['es6', 'minifyCSS', 'watch']);



//bower install bootstrap#v4.0.0-alpha.2  —save
 //bower install tether —save

// const gulp     	       = require("gulp");                     // => use gulp
// const babel    	       = require("gulp-babel");               // => es6 to es6 conversion
// const cleanCSS 	       = require("gulp-clean-css");           // => minify css
// const stripCssComments = require('gulp-strip-css-comments');  // => strip comments from css
// const sass 	   	       = require("gulp-sass");                // => write scss and convert to css
// const autoprefixer     = require("gulp-autoprefixer");        // => add web prefixes to CSS
// const uglify           = require("gulp-uglify");              // => uglify js
// const livereload       = require("gulp-livereload");          // => no browser refresh on changes
// const nodemon          = require("gulp-nodemon");             // => run nodemon
// const filter           = require('gulp-filter');              // => selects files of a certain type
// const flatten          = require('gulp-flatten');             // => brings all files into one directory
// const concat           = require('gulp-concat');              // => compress multiple files into one
// const order            = require('gulp-order');               // => change order of gulp tasks
// const cache            = require('gulp-cached');              // => only look at files that have changed
// const wait             = require('gulp-wait');
// const mainBowerFiles   = require('main-bower-files');         // => grab main files for bower
// const del              = require('del');                      // => delete files from directory
// const replace          = require('gulp-replace');
// const strip            = require('gulp-strip-comments');
// const bower            = mainBowerFiles({
//   "overrides": {
//     "bootstrap": {
//       "main": [
//         "dist/css/bootstrap.css",
//         "dist/js/bootstrap.js",
//       ]
//     },
//     "font-awesome": {
//       "main": "css/font-awesome.css"
//     }
//   }
// });
//
// const src  = "src";
// const dist = "public";
//
// // bower
// gulp.task('bower', [
//   'bower:js',
//   'bower:css',
//   'bower:fonts',
// ]);
//
// gulp.task('bower:js', () => gulp.src(bower)
//   .pipe(cache('bower:js'))
//   .pipe(filter(['**/*.js']))
//   .pipe(concat('_bower.js'))
//   .pipe(gulp.dest(`${src}/js`)));
// gulp.task('bower:css', () => gulp.src(bower)
//   .pipe(cache('bower:css'))
//   .pipe(filter(['**/*.css']))
//   .pipe(concat('_bower.scss'))
//   .pipe(stripCssComments())
//   .pipe(gulp.dest(`${src}/scss`)));
// gulp.task('bower:fonts', () => gulp.src(bower)
//   .pipe(cache('bower:fonts'))
//   .pipe(filter(['**/*.{eot,svg,ttf,woff,woff2}']))
//   .pipe(flatten())
//   .pipe(gulp.dest(`${src}/fonts`)));
//
// // nodemon
// gulp.task('nodemon', () => {
//   return nodemon({
//     script: 'index.js'
//   }).on('readable', () => {
//     this.stdout.on('data', chunk => {
//       if (/^listening/.test(chunk)) {
//         livereload.reload();
//       }
//       process.stdout.write(chunk);
//     });
//   });
// });
//
// // sass
// gulp.task('sass', () => {
// 	return gulp.src(`${src}/scss/style.scss`)
//     .pipe(cache('sass'))
//     .pipe(sass(sass()).on('error', sass.logError))
//     .pipe(stripCssComments())
//     .pipe(cleanCSS({ compatibility: "ie8"}))
//     .pipe(flatten())
//     .pipe(autoprefixer())
//     .pipe(gulp.dest(`${dist}/css`))
//     .pipe(livereload());
// });
//
// // scripts & es6
// gulp.task("scripts", () => {
//   return gulp.src(`${src}/**/*.js`)
// 		.pipe(babel({
// 			presets: ["es2015"],
//       compact: true,
//       ignore: [
//         '_bower.js',
//       ]
// 		}))
//     .pipe(flatten())
//     .pipe(order([
//       "_bower.js",
//       "**/*.js"
//     ]))
//     .pipe(concat('app.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(`${dist}/js`))
//     .pipe(wait(1500))
//     .pipe(livereload());
// });
//
// gulp.task('copy', [
//   'copy:fonts',
//   'copy:images'
// ]);
//
// // copy fonts from src to dist
// gulp.task("copy:fonts", () => {
//   return gulp.src(`${src}/**/*.{eot,svg,ttf,woff,woff2}`)
//     .pipe(gulp.dest(dist));
// });
// // copy images  from src to dist
// gulp.task("copy:images", () => {
//   return gulp.src(`${src}/**/*.{png,gif,jpg,ico}`)
//     .pipe(gulp.dest(dist));
// });
//
// // clean public
// gulp.task('clean:public', () => {
//   return del([
//     'public/**/*',
//   ]);
// });
//
// gulp.task('html', () => {
//   return gulp.src('./index.html')
//   .pipe(livereload());
// });
//
// // watch changes
// gulp.task("watch", () => {
// 	  livereload.listen();
//     gulp.watch('./index.html', ['html']);
//     gulp.watch(`${src}/**/*.js`, ['bower', 'scripts']);
// 	  gulp.watch(`${src}/**/*.scss`, ['sass']);
// });
//
// gulp.task("default", [
//   'clean:public',
//   'bower',
//   'sass',
//   'copy',
//   'scripts',
//   'watch',
//   'nodemon'
// ]);



// "devDependencies": {
// 	"babel-cli": "^6.14.0",
// 	"babel-preset-es2015": "^6.14.0",
// 	"del": "^2.2.2",
// 	"gulp": "^3.9.1",
// 	"gulp-autoprefixer": "^3.1.1",
// 	"gulp-babel": "^6.1.2",
// 	"gulp-bower": "0.0.13",
// 	"gulp-cached": "^1.1.0",
// 	"gulp-clean-css": "^2.0.12",
// 	"gulp-concat": "^2.6.0",
// 	"gulp-cssnano": "^2.1.2",
// 	"gulp-filter": "^4.0.0",
// 	"gulp-flatten": "^0.3.1",
// 	"gulp-livereload": "^3.8.1",
// 	"gulp-nodemon": "^2.1.0",
// 	"gulp-order": "^1.1.1",
// 	"gulp-plumber": "^1.1.0",
// 	"gulp-replace": "^0.5.4",
// 	"gulp-sass": "^2.3.2",
// 	"gulp-strip-comments": "^2.4.3",
// 	"gulp-strip-css-comments": "^1.2.0",
// 	"gulp-uglify": "^2.0.0",
// 	"gulp-wait": "0.0.2",
// 	"main-bower-files": "^2.13.1"
// }
