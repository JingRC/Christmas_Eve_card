# 平安夜祝福页面（可微信分享）

一个简洁漂亮的平安夜祝福页，送“平安果”给朋友。支持自定义收件人、署名和祝福语，通过链接参数生成个性化页面，适合直接在微信中分享。

## 预览与本地运行

Windows 下最简单方式（任选其一）：

### 方式一：VS Code Live Server
1. 安装 VS Code 扩展：Live Server
2. 右键 `index.html` → "Open with Live Server"
3. 用手机微信打开同一局域网地址测试

### 方式二：Node（若已安装）
```bash
npx serve .
# 或者
npx http-server -p 5173
```

### 方式三：Python（若已安装）
```bash
python -m http.server 5173
```

打开浏览器访问打印出的地址（如 `http://localhost:5173`）。

## 使用方法
- 直接打开 `index.html` 即可看到默认祝福。
- 通过 URL 参数个性化：
  - `to`：对方名字，例如 `?to=小王`
  - `from`：你的署名，例如 `&from=阿杰`
  - `msg`：自定义祝福语，例如 `&msg=岁岁平安，心想事成`

示例：
```
https://your-domain.example.com/?to=小王&from=阿杰&msg=岁岁平安，心想事成
```
页面内还提供“生成个性祝福”功能，一键生成并复制链接。

## 分享与封面图（微信）
- 微信分享卡片的标题/描述来自页面 `<head>` 的 Open Graph 元信息。
- `og:image` 需要填写线上可访问的图片 URL（微信更偏好 JPG/PNG）。
- 目前模板里是占位：
  - `og:url`：`https://your-domain.example.com`
  - `og:image`：`https://your-domain.example.com/og-image.png`
- 部署后请把它们改成你的真实域名与图片地址，以获得更好的分享预览。

## 一键部署
- GitHub Pages：
  1. 新建仓库并推送本项目
  2. Settings → Pages → 选择 `main` 分支 `/(root)`
  3. 保存后会生成 `https://<你的用户名>.github.io/<仓库名>/`
- Vercel：
  1. vercel.com 绑定 GitHub 仓库
  2. 选择本项目，框架选择 `Other`，直接部署
- Netlify：
  1. netlify.app 选择导入站点 → 关联仓库
  2. Build 命令留空，Publish 目录为 `/`

> 小贴士：国内好友访问时，推荐使用已备案/速度更好的国内托管以获得更快打开速度。

## 自定义点子
- 修改颜色、字体、文案：见 `assets/styles.css` 与 `index.html`
- 增加更多祝福语：在 `assets/script.js` 的 `blessings` 数组追加
- 若需接入微信 JS-SDK 自定义分享（标题/描述/图标），需完成域名校验与服务端签名，这里提供的是无需服务端的通用方案。

---
祝：平安夜快乐，岁岁平安！🍎
