/*
 * @Author: haobin.wang
 * @Date: 2024-03-15 11:04:41
 * @LastEditors: haobin.wang
 * @LastEditTime: 2024-03-19 15:28:21
 * @Description: Do not edit
 */
function dbClick(fn, time, scope) {
  let last = 0;
  var _time = time || 300;
  return function () {
    var context = scope || this;
    // console.log('diff--', Date.now() - last);
    if (Date.now() - last < _time) {
      fn.apply(context, arguments)
    } else {
      last = Date.now();
    }
  }
}