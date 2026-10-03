# CareerAssistant 公开在线预览

![CareerAssistant 公开演示首页](./preview.png)

这是 CareerAssistant 的独立静态宣传站，用于展示产品功能、交互方式与架构能力。

公开地址：[https://lzy22301093.github.io/](https://lzy22301093.github.io/)

## 为什么单独存放

本目录是独立站点仓库，不包含 CareerAssistant 的源码、数据库、API Key、真实简历或后端服务。建议部署到单独的 GitHub Pages 仓库，避免和真实项目源码混放，也便于单独控制公开范围。

## 演示边界

- 页面只运行在浏览器本地，不连接 CareerAssistant 后端。
- AI 模拟面试、简历生成、岗位匹配和求职分析均为预设 Mock 结果。
- 所有人物、学校、公司、项目、联系方式和分数均为虚构演示数据。
- 不包含项目作者或任何真实用户的个人信息。
- 页面不会上传、保存或发送访客输入。

## 目录

```text
.
├── index.html
├── styles.css
├── app.js
└── assets/
    ├── agent-workflow.png
    └── lucide.min.js
```

## GitHub Pages 部署

1. 新建独立公开仓库，例如 `careerassistant-preview`。
2. 将本目录内容上传到仓库根目录。
3. 打开仓库 `Settings -> Pages`。
4. `Source` 选择 `Deploy from a branch`，分支选择 `main`，目录选择 `/(root)`。
5. 等待构建完成后访问 `https://<username>.github.io/<repository>/`。

如需使用项目主页地址 `<username>.github.io`，可把仓库命名为 `<username>.github.io`，但仍然建议保持与真实项目源码仓库分离。

## 本地预览

在本目录运行：

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 隐私提醒

正式公开前请再次确认页面、Git 历史和图片资源中没有个人邮箱、手机号、真实简历、内部架构截图以外的敏感信息。当前页面中的演示联系方式使用的是通用占位内容。


