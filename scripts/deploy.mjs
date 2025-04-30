#!/usr/bin/env zx
/*
 * @Author: haobin.wang
 * @Date: 2024-03-18 16:40:49
 * @LastEditors: haobin.wang
 * @LastEditTime: 2025-04-30 09:36:50
 * @Description: Do not edit
 */
// import { chalk, echo, os } from 'zx';
// await sleep(2000);
echo('111');
console.log('你的系统是: ', chalk.yellow(os.type(), os.arch()));
// eslint-disable-next-line no-undef
const getPath = (p) => path.resolve(__dirname, p);
echo("__dirname", __dirname);
// 复制文件夹/文件
const _cpSource = async(filePath, newPath) => {
  $.verbose = false;
  await $`cp -r -i ${filePath} ${newPath}`
  $.verbose = true;
}
// 移除文件夹/文件
const _rmSource = async (arr = []) => {
  $.verbose = false;
  for (let filePath of arr) {
    await $`rm -rf ${filePath}`
  }
  $.verbose = true;
}
const delatePath = getPath('../blog/themes/flexblock/source/press');
await _rmSource([getPath(delatePath)]);
echo(`已删除: ${delatePath}`);
// 需要先删除blog下的docs包
cd('./vitepress');
await $`npm run docs:build`;
const deployBlog = async () => {
  $.verbose = false;
  cd('../blog')
  await $`npm run pb`
  $.verbose = true;
}
const targetPath = getPath('../blog/themes/flexblock/source');
_cpSource(getPath('../vitepress/.vitepress/dist'), `${targetPath}/press`);
// const currentDirectory = process.cwd();
// console.log('当前工作目录是:', currentDirectory);
echo(`复制成功！请查看:${chalk.green.underline(targetPath)}`);
// deployBlog();
// echo('部署成功');