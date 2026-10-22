# Rydge's Code Space

网站：https://code.rydgex.com

## 日常维护（Mac）

1. 在 GitHub Desktop 打开此文件夹，选择 `cms` 分支，先 Fetch / Pull 获取更新。
2. 双击 `启动维护后台.command`，保持打开的终端窗口运行。若浏览器打开太早，稍等后刷新。
3. 后台：http://localhost:4321/keystatic 。在「项目 Projects」中新建、编辑或删除项目，上传封面，编辑正文。保存仅修改本地文件。
4. 将发布状态设为「发布」，在 http://localhost:4321/projects.html 预览。草稿不会生成公开页面。注意：公开 Git 仓库里的草稿源文件仍可被看到。
5. GitHub Desktop 中检查变更，Commit 后 Push。GitHub Actions 自动构建并发布。构建或部署失败不会替换之前成功的页面。
6. 完成后关闭终端，或按 Ctrl+C 停止后台。本地后台不上传到公开网站。

项目网址标识决定详情页地址，已分享出去的项目尽量不要修改标识。封面建议压缩后再上传。源码、演示和文档链接为空时不显示按钮。

## 编辑 About Me

后台左侧选择「关于我 About Me」，可修改标题、头像、姓名、职业、个人介绍、联系方式、技能、经历和动态。技能分组、经历、动态支持增删与拖动排序，列表为空时隐藏对应区域。头像上传优先于头像网址。原页面文字已保留，请按实际情况更新。

保存后在 http://localhost:4321/about.html 预览，再提交并推送 `cms` 发布。

## 开发

安装 Node.js 22 LTS 和 pnpm 10 后：

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

- `src/content/projects/`：项目内容和正文；后台自动维护。
- `keystatic.config.ts`：后台字段。
- `src/lib/categories.ts`：后台和网站共用分类。
- `src/components/`：公共导航、页脚、项目卡片。
- `src/pages/`：页面与项目详情页模板。
- `src/legacy/`：保留的首页、Contact 正文；这些页面暂时通过代码编辑。
- `src/content/about.json` 和 `src/content/about/`：About Me 内容，后台自动维护。
- `src/lib/about-schema.ts`：About Me 后台字段。
- `src/styles.css`、`tailwind.config.mjs`：全站样式和设计设置。
- `public/images/projects/`：上传图片。

首页推荐字段用于展示精选项目。排序数字越小越靠前，同排序按日期倒序。

UI 修改请从 `cms` 创建功能分支，本地预览后合并回 `cms`。当前部署分支是 `cms`；`main` 仍保留原 README，旧 `web` 分支保留迁移前的 HTML。

## 发布和回退

GitHub Pages 使用 GitHub Actions，从 `cms` 构建。Actions 中的 Publish website 成功后网站才更新。

回退新版本：在 `cms` revert 对应提交并推送，重新部署。
紧急恢复迁移前网站：仓库 Settings → Pages → Source 选择 Deploy from a branch，选择 `web` 和 `/ (root)`。域名保持 `code.rydgex.com`。

## 嵌入式项目字段

项目编辑页可自由添加、删除和拖动排序硬件平台、硬件清单、系统图片、测试结果与视频。

- 硬件平台：自行输入名称 / 型号与说明，无需修改预设选项。
- 硬件清单：名称、型号、数量、用途、备注和资料链接。
- 我的职责与贡献：填写个人负责的工作。
- 系统架构与图片：上传框图、原理图或实物图，填写标题与说明。
- 测试结果：指标、实测结果、测试条件和报告链接。
- 演示视频：填写标题，粘贴 YouTube 或哔哩哔哩完整视频地址，也可以粘贴官方 iframe 外嵌代码。支持多个视频。

YouTube 支持普通视频、youtu.be 分享链接、Shorts、live 和 embed 地址。B站支持 BV/av 视频地址和播放器地址，多 P 可保留 ?p=2 参数。b23.tv 短链接请先在浏览器打开，再复制完整地址。

播放器不自动播放，并提供前往原站的链接。视频须允许站外嵌入；实际播放受视频可用性、平台限制和访客网络影响。只解析官方 iframe 的视频地址，其他 HTML 属性不会嵌入页面。

这些栏目均为可选，留空时网页隐藏该栏目。列表弹窗中点 Done 后，再点页面顶部 Save 保存整个项目。保存后预览并推送 cms，发布流程不变。
