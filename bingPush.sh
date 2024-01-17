#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# bing 推送
curl -X POST -H "Content-Type: application/json" -d @params.json "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=a9f6edce90b547e48c7d42876d07a594"

rm -rf params.json # 删除文件