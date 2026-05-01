# 塔底生存指南 / Survival at the Base

在巴别塔的阴影下，生存是一种信仰。

## 在线游玩

**GitHub Pages**: [https://dengxiaocheng.github.io/TheologyGame-TowerBaseSurvival/](https://dengxiaocheng.github.io/TheologyGame-TowerBaseSurvival/)

## 本地运行

无需构建步骤，直接用浏览器打开即可：

```bash
# 方法一：直接打开
open index.html          # macOS
xdg-open index.html      # Linux

# 方法二：本地服务器
npx serve .
# 或
python3 -m http.server 8000
```

## 项目结构

```
index.html          — 入口页面（静态，无构建步骤）
js/main.js          — 游戏逻辑
test.mjs            — Playwright 测试套件
plan/               — 设计文档与修复计划
```

## 技术栈

- 纯 HTML/CSS/JavaScript，零依赖
- Canvas 渲染网格地图
- 移动端优先，触控目标 >= 44px
