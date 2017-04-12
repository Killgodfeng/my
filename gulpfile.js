var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browsersync = require("browser-sync").create();




// //html拷贝
// gulp.task("html",function() {
// 	gulp.src("html/*.html")
// 		.pipe(gulp.dest("deli/"))
// 		.pipe(browsersync.reload({stream:true}))
// });
//html压缩,去注释
gulp.task("html0",function() {
	gulp.src("html/*.html")
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest("deli/"))
		.pipe(browsersync.reload({stream:true}))
});
//css编译，压缩
gulp.task("css",function() {
	gulp.src("less/*.less")
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest("deli/css/"))
		.pipe(browsersync.reload({stream:true}))
});
//js合并，压缩
gulp.task("js",function() {
	gulp.src("./js/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("delui/js/"))
		.pipe(browsersync.reload({stream:true}))
});
//简单自动化工作流
gulp.task("Prj",["css","js","html0"],function() {
	browsersync.init({
		server:{
			baseDir:"./deli"
		}
	});
	gulp.watch("less/*.less",["css"]);
	gulp.watch("html/*.html",["html0"]);
	gulp.watch("js/*.js",["js"])
})

