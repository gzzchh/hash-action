let { Octokit } = require("@octokit/rest");
let hashFile = require("./src/hashFile");
let renderToMarkdown = require("./src/renderToMarkdown");
require("dotenv").config();

// 开始处理
let TOKEN = process.env.TOKEN;
let REPOSITORY = process.env.REPOSITORY;
let EVENT = process.env.EVENT;
let [OWNER, REPO] = REPOSITORY.split("/");

let octokit = new Octokit({
	auth: TOKEN,
});

function checkSubmission(body) {
	//if (body.split("\n").length > 1) return false
	return true;
}

async function getTasks() {
	if (EVENT) {
		console.log("getting single task");
		return [JSON.parse(EVENT).issue];
	} else {
		console.log("getting list of tasks");
		let { data } = await octokit.issues.listForRepo({
			owner: OWNER,
			repo: REPO,
			state: "open",
		});
		return data;
	}
}

async function performTasks(list) {
	let promises = list.map(async (issue) => {
		try {
			if (!checkSubmission(issue.body)) {
				throw "提交内容无效";
			}
			// 此处修改为获取文件哈希
			console.log(`文件地址为: ${issue.body}`);
			let fileInfo = await hashFile.calhHash(issue.body);
			await octokit.issues.createComment({
				owner: OWNER,
				repo: REPO,
				issue_number: issue.number,
				body: renderToMarkdown.render(fileInfo),
			});
			await octokit.issues.update({
				owner: OWNER,
				repo: REPO,
				issue_number: issue.number,
				state: "closed",
				title: fileInfo.filename,
				labels: ["calculated"],
			});
		} catch (error) {
			await octokit.issues.createComment({
				owner: OWNER,
				repo: REPO,
				issue_number: issue.number,
				body: `错误 ${error.toString()}`,
			});
			await octokit.issues.update({
				owner: OWNER,
				repo: REPO,
				issue_number: issue.number,
				state: "closed",
				labels: ["error"],
			});
			throw error;
		}
	});

	await Promise.all(promises);
}

async function perform() {
	let tasks = await getTasks();
	await performTasks(tasks);
}

perform();
