const cp = require("child_process");
const fs = require("fs-extra");
const { mainModule } = require("process");
const hashCal = require("./src/hashFile");
async function test() {
	let fileInfo = await hashCal.calhHash(
		"https://gzz-daily.oss-cn-hangzhou.aliyuncs.com/subs/v2-gzz-other.txt"
	);
	// md5sum: "",
	// 	sha1sum: "",
	// 	sha256sum: "",
	// 	sha512sum: "",
	// 	nixmd5sum: "",
	// 	nixsha1sum: "",
	// 	nixsha256sum: "",
	// 	nixsha512sum: "",
	// 	filename: filename,
	let body = `文件名: ${fileInfo.filename}
md5sum: ${fileInfo.md5sum}
sha1sum: ${fileInfo.sha1sum}
sha256sum: ${fileInfo.sha256sum}
sha512sum: ${fileInfo.sha512sum}
nixmd5sum: ${fileInfo.nixmd5sum}
nixsha1sum: ${fileInfo.nixsha1sum}
nixsha256sum: ${fileInfo.nixsha256sum}
nixsha512sum: ${fileInfo.nixsha512sum}`;
	console.log(body);
}
test();
