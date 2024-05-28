/**
 * 生成百度链接推送文件
 */
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const matter = require("gray-matter"); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readFileList = require("./modules/readFileList");
const urlsRoot = path.join(__dirname, "..", "urls.txt"); // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0]; // 获取命令行传入的参数
const limit = 20; // 每日推送限制

if (DOMAIN) {
  main();
} else {
  console.log(
    chalk.red(
      "请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://xugaoyi.com"
    )
  );
}

/**
 * 主体函数
 */
function main() {
  const files = readFileList(); // 读取所有md文件数据

  // 取文章，并写入对应的时间
  let articles = [{ link: DOMAIN + '\r\n', time: 0 }]; // 写入域名
  for (const file of files) {
    const { data } = matter(fs.readFileSync(file.filePath, "utf8"));

    if (data.permalink) {
      const link = `${DOMAIN}${data.permalink}\r\n`;
      articles.push({
        link,
        time: new Date(data.date).getTime(), // TODO: 这里存在时区问题，因为仅做排序使用，忽略该问题
      });
    }
  }
  articles = articles.sort((a, b) => b.time - a.time);

  // 仅取指定条数的推送
  fs.writeFileSync(urlsRoot, "");
  for (let i = 0; i < Math.min(articles.length, limit); i++) {
    const info = articles[i];
    fs.appendFileSync(urlsRoot, info.link);
  }

  bingPush();
}

// 尝试进行 bing 推送
function bingPush() {
  // 读取链接文件，并拆分为数组
  const files = fs.readFileSync(urlsRoot, "utf8").split("\r\n");
  files.pop(); // 去除最后一个空行
  console.log(files);

  const params = {
    siteUrl: DOMAIN,
    urlList: files,
  };
  fs.writeFileSync("params.json", JSON.stringify(params));
}
