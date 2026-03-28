# NogoChain Explorer 前端启动指南

## 环境要求

- **Node.js**: 24.x 或更高版本
- **npm**: 10.x 或更高版本
- **MongoDB**: 7.x 或更高版本（可选，用于完整功能）
- **NogoChain 节点**: 运行在 http://localhost:8545（可选，用于实时数据）

## 快速启动

### 1. 安装依赖

```bash
cd e:\HHH\vbc-explorer-main
npm install
```

如果遇到依赖问题，使用：
```bash
npm install --legacy-peer-deps
```

### 2. 配置文件

配置文件已创建：`config.json`

**重要配置项：**
- RPC URL: `http://localhost:8545`
- Chain ID: `318`
- Currency: `NOGO`

### 3. 启动开发服务器

```bash
npm run dev
```

访问：**http://localhost:3000**

### 4. 生产构建

```bash
npm run build
npm run start
```

## 功能特性

### 已配置功能

✅ **基础功能**
- 区块浏览器
- 交易查询
- 地址余额
- 交易历史

✅ **高级功能**
- NFT 支持
- 合约验证
- 代币跟踪
- 富豪榜

✅ **NogoChain 特性**
- Chain ID: 318
- 区块时间：17 秒
- 区块奖励：8 NOGO
- 财库地址集成

### UI/UX 特性

- 🎨 **品牌色**: 蓝色到紫色渐变
- 📱 **响应式设计**: 支持移动端
- 🌐 **多语言支持**: 中英文文档
- 🔍 **实时搜索**: 区块、交易、地址
- 📊 **数据统计**: 实时网络统计

## 主要页面

### 首页 (`/`)
- 最新区块
- 最新交易
- 网络统计
- 实时价格（需配置）

### 区块页面 (`/block/:number`)
- 区块详情
- 包含的交易
- 矿工信息
- 时间戳

### 交易页面 (`/tx/:hash`)
- 交易详情
- 输入/输出信息
- Gas 费用
- 确认数

### 地址页面 (`/address/:address`)
- 余额信息
- 交易历史
- 代币持有
- NFT 收藏

### 富豪榜 (`/richlist`)
- 持币地址排名
- 余额分布
- 实时更新

### DEX (`/dex`)
- 代币交换
- 流动性池
- 农场质押
- 交易图表

### Launchpad (`/launchpad`)
- 代币创建
- 项目管理
- 我的代币

## 配置 MongoDB（可选）

### 1. 安装 MongoDB

```bash
# Windows (使用 Chocolatey)
choco install mongodb

# 或使用 Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. 创建数据库

```bash
mongosh
use explorerDB
db.createUser({
  user: "explorer",
  pwd: "your_secure_password",
  roles: ["readWrite"]
})
```

### 3. 更新配置

编辑 `config.json`:
```json
{
  "database": {
    "uri": "mongodb://explorer:your_password@localhost:27017/explorerDB"
  }
}
```

## 连接 NogoChain 节点

### 本地节点

确保 NogoChain 节点运行：
```bash
cd e:\HHH\nogopow
.\build\nogo.exe --datadir data\nogochain --http --http.port 8545
```

### 远程节点

更新 `config.json`:
```json
{
  "web3Provider": {
    "url": "https://rpc.nogochain.org"
  }
}
```

## 故障排除

### 问题 1: npm 命令不可用

**解决方案**: 使用完整路径
```bash
C:\Path\To\node\npm.cmd install
```

### 问题 2: 端口 3000 被占用

**解决方案**: 更改端口
```bash
PORT=3001 npm run dev
```

### 问题 3: 无法连接到节点

**解决方案**: 
1. 检查节点是否运行
2. 确认 RPC URL 正确
3. 检查防火墙设置

### 问题 4: MongoDB 连接失败

**解决方案**:
1. 确认 MongoDB 服务运行
2. 检查连接字符串
3. 验证用户权限

## API 端点

### 公共 API

- `GET /api/stats` - 网络统计
- `GET /api/blocks` - 最新区块
- `GET /api/transactions` - 最新交易
- `GET /api/total_supply` - 总供应量
- `GET /api/circulating_supply` - 流通供应量

### 查询 API

- `GET /api/block/:number` - 区块详情
- `GET /api/tx/:hash` - 交易详情
- `GET /api/address/:address` - 地址信息
- `GET /api/tokens/:address` - 代币信息

## 开发工具

### 代码格式化

```bash
npm run format
```

### 代码检查

```bash
npm run lint
```

### 运行测试

```bash
npm test
```

## 部署

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### Docker 部署

```bash
docker build -t nogo-explorer .
docker run -p 3000:3000 nogo-explorer
```

### 传统服务器

```bash
npm run build
pm2 start npm --name "nogo-explorer" -- start
```

## 性能优化

### 建议配置

- **Node 内存**: 512MB 最小
- **MongoDB 池**: 50 连接
- **缓存时间**: 300 秒
- **速率限制**: 100 请求/15 分钟

### CDN 集成

静态资源可通过 CDN 分发：
- Next.js 自动处理
- 配置 `next.config.ts`

## 安全建议

1. **生产环境**:
   - 使用环境变量存储敏感信息
   - 启用 HTTPS
   - 配置 CORS

2. **数据库**:
   - 使用强密码
   - 限制网络访问
   - 定期备份

3. **API**:
   - 启用速率限制
   - 输入验证
   - 错误处理

## 资源链接

- **NogoChain 官网**: https://nogochain.org
- **Explorer 源码**: https://github.com/nogochain/nogo-explorer
- **文档**: https://docs.nogochain.org
- **Discord**: https://discord.gg/nogochain

## 下一步

1. ✅ 安装依赖
2. ✅ 配置完成
3. 🔄 启动开发服务器
4. 🔄 访问 http://localhost:3000
5. 🔄 连接 NogoChain 节点
6. 🔄 同步区块链数据
7. 🔄 部署到生产环境

---

**版本**: 1.0.0  
**更新日期**: 2026-03-26  
**网络**: NogoChain Mainnet (Chain ID: 318)
