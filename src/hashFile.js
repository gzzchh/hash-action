const cp = require("child_process");
const fs = require("fs-extra");
const url = require("url");

function downloadFile(url) {
	let fileUrl = new URL(url);
	// console.log(fileUrl);
	// 从URL解析出文件名字
	let filename = fileUrl.pathname.split("/").pop();
	// console.log(filename);
	let file = cp.spawnSync("wget", ["-O", filename, url]);
	// let file = cp.spawnSync("wget", [url]);
	// console.log(file.stderr.toString());
	if (file.stderr) {
		// console.log(`下载文件-stderr: ${file.stderr.toString()}`);
	}
	if (file.stdout) {
		// console.log(`下载文件-stdout: ${file.stdout.toString()}`);
	}
	return filename;
}
async function calhHash(url) {
	let filename = downloadFile(url);
	fileInfo = {
		md5sum: "",
		sha1sum: "",
		sha256sum: "",
		sha512sum: "",
		nixmd5sum: "",
		nixsha1sum: "",
		nixsha256sum: "",
		nixsha512sum: "",
		filename: filename,
	};
	fileInfo.md5sum = await md5sum(filename);
	fileInfo.sha1sum = await sha1sum(filename);
	fileInfo.sha256sum = await sha256sum(filename);
	fileInfo.sha512sum = await sha512sum(filename);
	fileInfo.nixmd5sum = await nixmd5sum(filename);
	fileInfo.nixsha1sum = await nixsha1sum(filename);
	fileInfo.nixsha256sum = await nixsha256sum(filename);
	fileInfo.nixsha512sum = await nixsha512sum(filename);
	// console.log(fileInfo);
	return fileInfo;
}
async function md5sum(filename) {
	let hash = cp.spawnSync("md5sum", [filename]);
	// 输出类似于
	// XXX 文件名
	// 这里就是脱掉文件名
	let output = hash.stdout.toString().split(" ")[0].trim();
	return output;
	// console.log(output);
}
async function sha1sum(filename) {
	let hash = cp.spawnSync("sha1sum", [filename]);
	let output = hash.stdout.toString().split(" ")[0].trim();
	return output;
}
async function sha256sum(filename) {
	let hash = cp.spawnSync("sha256sum", [filename]);
	let output = hash.stdout.toString().split(" ")[0].trim();
	return output;
}
async function sha512sum(filename) {
	let hash = cp.spawnSync("sha512sum", [filename]);
	let output = hash.stdout.toString().split(" ")[0].trim();
	return output;
}
async function nixmd5sum(filename) {
	// nix hash-file --base32 --type sha256
	let hash = cp.spawnSync("nix", [
		"hash-file",
		"--base32",
		"--type",
		"md5",
		filename,
	]);
	console.log(hash.stderr.toString());
	let output = hash.stdout.toString().trim();
	return output;
}
async function nixsha1sum(filename) {
	let hash = cp.spawnSync("nix", [
		"hash-file",
		"--base32",
		"--type",
		"sha1",
		filename,
	]);
	let output = hash.stdout.toString().trim();
	return output;
}
async function nixsha256sum(filename) {
	let hash = cp.spawnSync("nix", [
		"hash-file",
		"--base32",
		"--type",
		"sha256",
		filename,
	]);
	let output = hash.stdout.toString().trim();
	return output;
}
async function nixsha512sum(filename) {
	let hash = cp.spawnSync("nix", [
		"hash-file",
		"--base32",
		"--type",
		"sha512",
		filename,
	]);
	let output = hash.stdout.toString().trim();
	return output;
}

module.exports = {
	calhHash: calhHash,
};
