//初始化
//npm init
//- 生成一个 package.json，里面是一些常规的配置信息
//npm install gulp gulp-concat gulp-minify-css gulp-rev gulp-rev-collector --save-dev
//- 安装插件到项目目录内

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); 

gulp.task('concats', function(){ 
	gulp.src(['./lib/css/a.css', './lib/css/b.css'])
	.pipe(concat('min.css'))//合并CSS并命名为min.css
	.pipe(minifyCss())//压缩CSS
	.pipe(rev())//添加MD5后缀
	.pipe(gulp.dest('output'))
	.pipe(rev.manifest())//把经过MD5更改过的原文件名和新文件名保存在./rev文件里的rev-manifest.json里- (生成一个rev-manifest.json)
	.pipe(gulp.dest('./rev'));//- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('minjs', function(){
	gulp.src('./lib/js/a.js')
	.pipe(uglify())//压缩JS
	.pipe(gulp.dest('output'));
});

gulp.task('rev', function(){ 
	gulp.src(['./rev/*.json', './pages/index.php'])//读取 rev-manifest.json 文件以及需要进行css名替换的文件
		.pipe(revCollector())//- 执行文件内css名的替换
		.pipe(gulp.dest('./application/'));
});

gulp.task('default', ['concats', 'minjs', 'rev', 'watch']);

gulp.task('watch', function(){
	gulp.watch('lib/js/a.js', ['default', function(){ 
		console.log(js更改);
	}]);
});
