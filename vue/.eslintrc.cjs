/*
 * @Author: haobin.wang
 * @Date: 2024-02-05 18:15:03
 * @LastEditors: haobin.wang
 * @LastEditTime: 2025-04-25 14:50:54
 * @Description: Do not edit
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['scripts/*.mjs', 'node_modules/**']
}
