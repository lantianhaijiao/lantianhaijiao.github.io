/*
 * @Author: haobin.wang
 * @Date: 2025-04-25 14:54:06
 * @LastEditors: haobin.wang
 * @LastEditTime: 2025-04-30 09:42:55
 * @Description: Do not edit
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Document",
  description: "Document record",
  base: "/press/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Article", link: "/pag" },
    ],

    sidebar: [
      {
        text: "Article",
        items: [
          { text: "Pag", link: "/pag" },
          { text: "Spine", link: "/spine" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lantianhaijiao" },
    ],
  },
});
