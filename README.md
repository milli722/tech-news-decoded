# Tech Decoded｜科技人的每日新聞解讀

用資訊人／科技人的角度，解讀 AI、資安、半導體、ESG 永續與國際政經新聞。

🔗 網站：https://milli722.github.io/tech-news-decoded/

## 專案特色

- 每篇文章固定結構：一句話重點 → 新聞重點 → 背景知識 → 科技人解讀 → 延伸思考 → 面試這樣問 → 原文來源
- 純 HTML / CSS / JavaScript，部署於 GitHub Pages
- 支援分類篩選、深淺色模式、手機版

## 給 AI 的規則

本專案的開發與內容更新規則都寫在 [`CLAUDE.md`](CLAUDE.md)。
AI 讀完這份文件後，就能依照同一套格式持續新增新聞文章。

常用指令：
- 「更新今天的新聞」：AI 搜尋過去 24 小時的新聞，挑選後產生文章
- 「幫我解讀這則：<連結或文字>」：AI 依模板解讀指定新聞

## 檔案結構

```
index.html            首頁
about.html            關於本站
articles/             文章（YYYY-MM-DD-slug.html）
templates/article.html 文章模板
data/articles.json    文章索引
assets/css/style.css  樣式
assets/js/main.js     首頁列表、篩選、深淺色切換
```
