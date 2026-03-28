# NogoChain Explorer 快速启动指南

## 问题诊断

当前系统已安装 Node.js 24.13.1，但**缺少 npm 包管理器**。

## 解决方案

### 方案 1：安装 npm（推荐）

**Windows 用户：**

1. **下载 Node.js 安装包**（包含 npm）
   - 访问：https://nodejs.org/
   - 下载：Node.js 24.x LTS
   - 运行安装程序，勾选"Automatically install necessary tools"

2. **验证安装**
   ```bash
   node --version
   npm --version
   ```

3. **安装依赖并启动**
   ```bash
   cd e:\HHH\vbc-explorer-main
   npm install
   npm run dev
   ```

### 方案 2：使用 nvm（Node 版本管理器）

**更灵活的方式：**

1. **安装 nvm-windows**
   ```bash
   # 使用 Chocolatey
   choco install nvm
   
   # 或下载安装包
   # https://github.com/coreybutler/nvm-windows/releases
   ```

2. **安装 Node.js 和 npm**
   ```bash
   nvm install 24.13.1
   nvm use 24.13.1
   ```

3. **验证**
   ```bash
   node --version
   npm --version
   ```

### 方案 3：手动下载 npm

如果不想重新安装 Node.js：

1. **下载 npm**
   - https://github.com/npm/cli/releases
   - 下载最新版本 zip 包

2. **解压到 Node.js 目录**
   ```
   C:\Users\Administrator\.trae-cn\binaries\node\versions\24.13.1\
   ```

3. **添加到 PATH**
   确保 `node_modules` 目录在系统 PATH 中

## 快速测试

安装完成后，运行以下命令测试：

```bash
# 1. 检查版本
node --version    # 应该显示 v24.13.1
npm --version     # 应该显示版本号（如 10.x）

# 2. 进入项目目录
cd e:\HHH\vbc-explorer-main

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 访问浏览器
# 打开 http://localhost:3000
```

## 为什么之前可以运行？

可能的原因：

1. **之前安装了完整的 Node.js 发行版**（包含 npm）
2. **使用了不同的终端**（如 Git Bash、WSL）
3. **环境变量配置不同**
4. **Trae 沙箱环境变化**

## 当前环境状态

✅ **已安装**:
- Node.js v24.13.1
- Go 语言环境
- Git

❌ **缺失**:
- npm 包管理器
- Node.js 开发工具

## 配置文件状态

✅ **已就绪**:
- `config.json` - NogoChain 配置完成
- `package.json` - 项目依赖定义
- `MIGRATION.md` - 迁移文档
- `STARTUP.md` - 详细启动指南

## 安装后的完整流程

```bash
# 步骤 1: 安装依赖（约 2-5 分钟）
cd e:\HHH\vbc-explorer-main
npm install

# 步骤 2: 启动开发服务器
npm run dev

# 步骤 3: 访问浏览器
# http://localhost:3000

# 步骤 4: (可选) 连接 NogoChain 节点
# 确保节点运行在 http://localhost:8545
```

## 故障排除

### 问题：npm 命令仍然不可用

**解决：**
```bash
# 检查 Node.js 安装位置
where node

# 检查 npm 是否存在
dir "C:\Path\To\nodejs\npm.cmd"

# 手动添加 PATH
$env:PATH += ";C:\Program Files\nodejs"
```

### 问题：权限错误

**解决：**
以管理员身份运行 PowerShell

### 问题：网络问题导致安装失败

**解决：**
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install
```

## 替代方案

如果暂时无法安装 npm，可以：

### 使用 Docker（推荐）

```bash
# 1. 安装 Docker Desktop
# https://www.docker.com/products/docker-desktop

# 2. 构建并运行
docker build -t nogo-explorer .
docker run -p 3000:3000 nogo-explorer

# 3. 访问 http://localhost:3000
```

### 使用在线 IDE

- GitHub Codespaces
- Gitpod
- Replit

## 联系支持

- **NogoChain Discord**: https://discord.gg/nogochain
- **GitHub Issues**: https://github.com/nogochain/nogo-explorer/issues
- **文档**: https://docs.nogochain.org

---

**更新日期**: 2026-03-26  
**状态**: 等待 npm 安装  
**下一步**: 安装 npm 后执行 `npm install && npm run dev`
