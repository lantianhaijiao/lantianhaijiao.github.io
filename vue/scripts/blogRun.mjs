#!/usr/bin/env zx
/*
 * @Author: haobin.wang
 * @Date: 2024-03-18 16:40:49
 * @LastEditors: haobin.wang
 * @LastEditTime: 2024-03-19 16:27:11
 * @Description: Do not edit
 */
import { chalk, echo, os } from 'zx';
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
const delatePath = getPath('../../blog/themes/flexblock/source/docs');
await _rmSource([getPath(delatePath)]);
echo(`已删除: ${delatePath}`);
// 需要先删除blog下的docs包
await $`npm run build`;
const runBlog = async () => {
  $.verbose = true;
  cd('../blog')
  $`pwd`
  await $`npm run server`
};
const targetPath = getPath('../../blog/themes/flexblock/source');
_cpSource(getPath('../docs'), targetPath);
echo(`复制成功！请查看:${chalk.green.underline(targetPath)}`);
runBlog();