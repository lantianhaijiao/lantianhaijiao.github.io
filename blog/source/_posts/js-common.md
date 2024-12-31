---
title: js常用
date: 2024-03-22 19:16:11
tags:
cover: /img/common/t5.jpg
---
## 根据key相同合并对象
```
/**
 * 合并奖励
 * @param {Array[object]}
 * @param {key} 根据key相同合并
 * @returns {Array[object]} frequency为数量
*/
export const mergeRewards = (rewards, key = 'position') => {
  return rewards.reduce((obj, item) => {
    let newItem = {
      ...item,
      frequency: 1
    };
    const find = obj.find(k => k[key] === item[key]);
    if (find) {
      find.frequency++;
    } else {
      obj.push(newItem)
    }
    return obj;
  }, []);
};
```
## object/Map/WeakMap
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
- Map和WeakMap 可以用dom作为key, weakmap是弱引用，比Map更适合保存dom节点
- Map的件

ObjectMapWeakMap键值类型字符串任意类型对象(除了null)同名处理覆盖新开内存，{}会开辟新的内存作为键新开内存，{}会开辟新的内存作为键长度需要Object.values().length.size特殊处理有序性无序有序有序

--------------------------------------------------------------------------------
js镜像下getBoundingClientRect获取的值