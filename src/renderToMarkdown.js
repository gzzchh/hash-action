let moment = require("moment");

function strip(str) {
	return str.replace(/(^\s*|\s*$)/g, "");
}
function render(fileInfo) {
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
	return body;
}

module.exports = {
	render,
};
