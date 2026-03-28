# NogoChain Explorer - 完整文档

<div align="center">

<img src="public/img/explorer-logo.png" alt="NOGO Explorer Logo" height="200" />

[![Lint/Format](https://github.com/nogochain/nogo-explorer/actions/workflows/lint.yml/badge.svg)](https://github.com/nogochain/nogo-explorer/actions/workflows/lint.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**NogoChain 区块链浏览器 | 现代化、实时、功能完整**

[English Version](README-EN.md) | [部署指南](DEPLOYMENT.md) | [快速启动](QUICKSTART.md)

</div>

---

## 📖 目录

- [简介](#简介)
- [核心功能](#核心功能)
- [DEX 功能](#dex-功能)
- [技术栈](#技术栈)
- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [部署指南](#部署指南)
- [配置说明](#配置说明)
- [API 文档](#api-文档)
- [开发指南](#开发指南)
- [故障排查](#故障排查)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

---

## 简介

NogoChain Explorer 是一个为 NogoChain 网络构建的现代化全功能区块链浏览器。采用 Next.js 15 App Router、TypeScript 和 MongoDB 构建，支持高级 NFT 浏览、合约验证、全面的代币分析、内置 DEX 和代币发射台。

**设计目标**：
- 🚀 高性能、可扩展的架构
- 📱 移动优先的响应式设计
- 🔍 强大的搜索和分析功能
- 💎 完整的 NFT 和代币支持
- 💱 内置去中心化交易所
- 🎨 无代码代币创建平台

---

## 核心功能

### 🔍 高级搜索
- 搜索区块、交易、地址和合约
- 智能过滤和排序
- 地址标签和备注系统
- 搜索历史记录

### 💎 NFT 浏览器
- 完整的 ERC-721 和 ERC-1155 支持
- NFT 元数据解析和展示
- 图片画廊和收藏分析
- 稀有度评分和统计

### 📊 实时分析
- 网络统计和性能指标
- Gas 价格跟踪和预测
- 交易量和活跃度分析
- 区块链健康状态监控

### 🛡️ 合约验证
- Solidity 编译器集成
- 多文件合约验证
- 构造函数参数解析
- 开源许可证标识

### 💰 代币管理
- ERC-20/721/1155 全面支持
- 持有者分析和分布图
- 代币价格和市值跟踪
- 社交媒体链接集成

### 📈 富豪榜
- 实时账户余额排名
- 财富分布分析
- 大额交易监控
- 地址标签系统

### 💸 价格跟踪
- CoinGecko API 集成
- CoinPaprika API 集成
- 多交易所价格聚合
- 历史价格图表

### ⚡ 实时同步
- WebSocket 实时更新
- 区块高度自动同步
- 交易池监控
- 事件订阅系统

### 🔄 DEX (去中心化交易所)
- 代币交换功能
- 流动性池管理
- 收益 farming
- 交易图表和 K 线

### 🎨 代币发射台 V2
- 无代码代币创建
- 元数据配置
- 转账、授权、销毁功能
- 合约自动验证

---

## DEX 功能

内置的去中心化交易所提供完整的 DeFi 功能：

### 代币交换 (Swap)
- ✅ 自动价格计算
- ✅ 滑点容忍度配置
- ✅ 价格影响警告
- ✅ 多路径路由优化
- ✅ 交易截止日期保护

### 流动性池 (Liquidity Pools)
- ✅ 添加/移除流动性
- ✅ LP 代币管理
- ✅ 实时池统计数据
- ✅ 交易费用分配
- ✅ 流动性份额跟踪

### 收益挖矿 (Yield Farming)
- ✅ 质押 LP 代币
- ✅ 赚取 NOGOG 奖励
- ✅ 实时 APY 计算
- ✅ 奖励复投选项
- ✅ 挖矿历史查询

### 交易图表
- ✅ 实时价格图表
- ✅ K 线图支持
- ✅ 交易量统计
- ✅ 深度图展示

---

## 技术栈

### 前端
- **Next.js 16** - React 全栈框架（App Router）
- **React 19** - UI 框架
- **TypeScript 5** - 类型安全
- **Tailwind CSS** - 样式系统
- **Wagmi + Viem** - Web3 React Hooks
- **Heroicons** - 图标库

### 后端
- **Next.js API Routes** - 服务端 API
- **MongoDB** - 数据库
- **Mongoose** - ODM 库
- **Ethers.js v6** - Web3 库
- **Web3.js** - 备用 Web3 库

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Jest** - 测试框架
- **PM2** - 进程管理
- **Docker** - 容器化部署

### 基础设施
- **Node.js 24+** - 运行时环境
- **Nginx** - 反向代理
- **Let's Encrypt** - SSL 证书
- **GitHub Actions** - CI/CD

---

## 系统要求

### 最低配置
| 组件 | 要求 |
|------|------|
| CPU | 2 核心 |
| 内存 | 2GB RAM |
| 存储 | 20GB 可用空间 |
| 操作系统 | Ubuntu 20.04+ / CentOS 7+ |

### 推荐配置
| 组件 | 要求 |
|------|------|
| CPU | 4 核心 |
| 内存 | 4GB RAM |
| 存储 | 50GB SSD |
| 操作系统 | Ubuntu 22.04 LTS |

### 依赖软件
- **Node.js**: 18.x 或更高版本
- **npm**: 8.x 或更高版本
- **MongoDB**: 6.0 或更高版本
- **PM2**: 最新稳定版

---

## 快速开始

### 1. 安装依赖

```bash
# 克隆项目
git clone https://github.com/nogochain/nogo-explorer.git
cd nogo-explorer

# 安装依赖
npm install
```

### 2. 配置文件

```bash
# 复制配置示例
cp config.example.json config.json

# 编辑配置
vim config.json
```

**关键配置项**：
```json
{
  "nodeAddr": "localhost",
  "port": 8545,
  "currency": {
    "symbol": "NOGO",
    "name": "NogoChain",
    "decimals": 18
  },
  "dex": {
    "enabled": true,
    "router": "0x...",
    "factory": "0x..."
  }
}
```

### 3. 配置 MongoDB

```bash
# 启动 MongoDB
sudo systemctl start mongod

# 创建数据库
mongosh
> use nogo-explorer
> db.createUser({
    user: "explorer",
    pwd: "password",
    roles: ["readWrite"]
  })
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
npm run start

# 使用 PM2
pm2 start npm --name "nogo-explorer" -- start
```

---

## 部署指南

### 方式一：手动部署

详细步骤请参考 [部署指南](DEPLOYMENT.md)

### 方式二：Docker 部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 方式三：脚本部署

```bash
# 一键部署脚本
chmod +x deploy.sh
./deploy.sh
```

---

## 配置说明

### 数据库配置

```json
{
  "mongoUri": "mongodb://localhost:27017/nogo-explorer",
  "mongoOptions": {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }
}
```

### RPC 节点配置

```json
{
  "nodeAddr": "localhost",
  "port": 8545,
  "wsPort": 8546,
  "protocol": "http"
}
```

### DEX 配置

```json
{
  "dex": {
    "enabled": true,
    "router": "0xRouterAddress",
    "factory": "0xFactoryAddress",
    "wrappedNative": {
      "address": "0xWNOGO",
      "name": "Wrapped NogoChain",
      "symbol": "WNOGO"
    },
    "rewardToken": {
      "address": "0xNOGOG",
      "name": "NogoChain Gold",
      "symbol": "NOGOG"
    }
  }
}
```

### 同步配置

```json
{
  "bulkSize": 100,
  "syncAll": true,
  "startBlock": 0,
  "endBlock": null,
  "maxRetries": 3,
  "retryDelay": 1000
}
```

---

## API 文档

### 公共 API

#### 获取区块信息
```bash
GET /api/block/[number]
```

#### 获取交易详情
```bash
GET /api/tx/[hash]
```

#### 获取地址信息
```bash
GET /api/address/[address]
```

#### 获取代币信息
```bash
GET /api/tokens/[address]
```

### DEX API

#### 获取交易对列表
```bash
GET /api/dex/pairs
```

#### 获取代币列表
```bash
GET /api/dex/tokens
```

#### 获取 K 线数据
```bash
GET /api/dex/chart/[pair]
```

### CMC API

#### 资产配置
```bash
GET /api/dex/cmc/assets
```

#### 交易对摘要
```bash
GET /api/dex/cmc/summary
```

#### 实时价格
```bash
GET /api/dex/cmc/ticker
```

完整 API 文档请访问 `/api-docs`

---

## 开发指南

### 项目结构

```
nogo-explorer/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── dex/               # DEX 相关页面
│   ├── launchpad/         # 发射台页面
│   └── ...
├── components/            # React 组件
├── config/                # 配置文件
├── hooks/                 # React Hooks
├── lib/                   # 工具库
├── models/                # MongoDB 模型
├── tools/                 # 工具脚本
└── types/                 # TypeScript 类型
```

### 添加新页面

```bash
# 创建新页面
touch app/my-page/page.tsx
```

```typescript
export default function MyPage() {
  return (
    <div>
      <h1>我的页面</h1>
    </div>
  )
}
```

### 添加 API 端点

```bash
# 创建新 API
touch app/api/my-api/route.ts
```

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ data: 'test' })
}
```

### 代码规范

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format
```

---

## 故障排查

### 常见问题

#### 1. npm install 失败

**问题**: 依赖安装失败
**解决**:
```bash
npm install --legacy-peer-deps
# 或
rm -rf node_modules package-lock.json
npm install
```

#### 2. MongoDB 连接失败

**问题**: 无法连接到 MongoDB
**解决**:
```bash
# 检查 MongoDB 状态
sudo systemctl status mongod

# 重启 MongoDB
sudo systemctl restart mongod
```

#### 3. 同步脚本卡住

**问题**: 区块同步停止
**解决**:
```bash
# 查看日志
pm2 logs sync

# 重启同步服务
pm2 restart sync
```

#### 4. DEX 交易失败

**问题**: 交换或添加流动性失败
**解决**:
- 检查合约地址配置
- 确认钱包已连接
- 检查 Gas 设置
- 查看浏览器控制台错误

### 日志查看

```bash
# Web 服务日志
pm2 logs nogo-explorer

# 同步服务日志
pm2 logs sync

# 数据库日志
sudo tail -f /var/log/mongodb/mongod.log
```

---

## 贡献指南

### 提交代码

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 报告问题

请在 GitHub Issues 中报告 bug 和提出功能请求。

### 代码规范

- 遵循 ESLint 配置
- 使用 TypeScript 严格模式
- 编写单元测试
- 更新文档

---

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 联系方式

- **网站**: https://nogochain.org
- **邮箱**: support@nogochain.org
- **Twitter**: @NogoChain
- **Discord**: https://discord.gg/nogochain
- **Telegram**: https://t.me/nogochain

---

<div align="center">

**NogoChain Explorer** - 为 NogoChain 生态系统构建

Made with ❤️ by the NogoChain Team

[返回顶部](#nogochain-explorer---完整文档)

</div>
