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