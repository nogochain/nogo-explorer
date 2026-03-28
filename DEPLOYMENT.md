# NogoChain Explorer 部署指南

完整的 NogoChain 区块链浏览器部署文档。

---

## 📋 目录

- [系统要求](#系统要求)
- [快速部署](#快速部署)
- [详细部署步骤](#详细部署步骤)
- [配置说明](#配置说明)
- [服务管理](#服务管理)
- [故障排查](#故障排查)

---

## 系统要求

### 最低配置
- **CPU**: 2 核心
- **内存**: 2GB RAM
- **存储**: 20GB 可用空间
- **操作系统**: Ubuntu 20.04+ / CentOS 7+

### 推荐配置
- **CPU**: 4 核心
- **内存**: 4GB RAM
- **存储**: 50GB SSD
- **操作系统**: Ubuntu 22.04 LTS

### 依赖软件
- **Node.js**: 18.x 或更高版本
- **npm**: 8.x 或更高版本
- **MongoDB**: 6.0 或更高版本
- **PM2**: 最新稳定版（用于进程管理）

---

## 快速部署

### 1. 安装依赖

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 24.x
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# 安装 PM2
sudo npm install -g pm2

# 验证安装
node --version
npm --version
mongod --version
pm2 --version
```

### 2. 部署 Explorer

```bash
# 解压项目
unzip nogo-explorer.zip
cd nogo-explorer

# 安装依赖
npm install --legacy-peer-deps

# 构建项目
npm run build

# 启动服务
pm2 start npm --name "nogo-explorer" -- start

# 启动数据同步服务
pm2 start npm --name "nogo-sync" -- run sync
pm2 start npm --name "nogo-stats" -- run stats
pm2 start npm --name "nogo-richlist" -- run richlist
pm2 start npm --name "nogo-tokens" -- run tokens

# 保存 PM2 配置并设置开机自启
pm2 save
pm2 startup
```

### 3. 启动 MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 4. 访问浏览器

打开浏览器访问：`http://你的服务器 IP:3000`

---

## 详细部署步骤

### 步骤 1: 准备服务器

#### 1.1 更新系统

```bash
sudo apt update
sudo apt upgrade -y
```

#### 1.2 安装必要工具

```bash
sudo apt install -y wget curl git unzip build-essential
```

### 步骤 2: 安装 Node.js

```bash
# 使用 NodeSource 仓库安装 Node.js 24.x
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应该显示 v24.x.x
npm --version   # 应该显示 10.x.x
```

### 步骤 3: 安装 MongoDB

```bash
# 导入 MongoDB GPG 密钥
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# 添加 MongoDB 源
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 更新包索引
sudo apt-get update

# 安装 MongoDB
sudo apt-get install -y mongodb-org

# 启动 MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# 验证 MongoDB 状态
sudo systemctl status mongod

# 检查 MongoDB 版本
mongod --version
```

### 步骤 4: 安装 PM2

```bash
# 全局安装 PM2
sudo npm install -g pm2

# 设置 PM2 开机自启
pm2 startup
# 根据提示执行生成的命令

# 保存当前进程列表
pm2 save
```

### 步骤 5: 部署 NogoChain Explorer

#### 5.1 上传项目

将 `nogo-explorer.zip` 上传到服务器：

```bash
# 使用 scp 从本地上传
scp nogo-explorer.zip root@你的服务器 IP:/root/

# 或使用其他方式上传（FTP、SFTP 等）
```

#### 5.2 解压并安装

```bash
cd /root
unzip nogo-explorer.zip
cd nogo-explorer

# 安装项目依赖
npm install --legacy-peer-deps
```

### 步骤 6: 配置项目

#### 6.1 创建环境变量文件

```bash
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
MONGODB_URI=mongodb://localhost:27017/explorerDB
WEB3_PROVIDER_URL=http://localhost:8545
WS_PROVIDER_URL=ws://localhost:8546
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF
```

#### 6.2 检查配置文件

编辑 `config.json`，确保配置正确：

```bash
# 查看配置
cat config.json | head -50

# 如需编辑
nano config.json
```

关键配置项：
```json
{
  "nodeAddr": "localhost",
  "port": 8545,
  "wsPort": 8546,
  "currency": {
    "name": "NogoChain",
    "symbol": "NOGO",
    "decimals": 18
  },
  "network": {
    "chainId": 318,
    "name": "NogoChain Mainnet",
    "rpcUrl": "http://localhost:8545"
  }
}
```

### 步骤 7: 构建项目

```bash
# 清理之前的构建（如果有）
rm -rf .next

# 重新构建
npm run build

# 构建应该显示：
# ✓ Compiled successfully
# ✓ Generating static pages...
# ✓ Finalizing page optimization...
```

### 步骤 8: 启动服务

```bash
# 启动 Web 服务
pm2 start npm --name "nogo-explorer" -- start

# 启动数据同步服务
pm2 start npm --name "nogo-sync" -- run sync

# 启动统计服务
pm2 start npm --name "nogo-stats" -- run stats

# 启动富豪榜服务
pm2 start npm --name "nogo-richlist" -- run richlist

# 启动代币服务
pm2 start npm --name "nogo-tokens" -- run tokens

# 查看所有服务状态
pm2 status

# 保存 PM2 配置
pm2 save
```

### 步骤 9: 配置防火墙（可选）

```bash
# 如果使用 UFW 防火墙
sudo ufw allow 3000/tcp
sudo ufw reload

# 如果使用 firewalld
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 步骤 10: 验证部署

#### 10.1 检查服务状态

```bash
pm2 status
```

应该看到所有服务都是 `online` 状态。

#### 10.2 查看日志

```bash
# 查看所有日志
pm2 logs

# 查看特定服务日志
pm2 logs nogo-explorer --lines 50
pm2 logs nogo-sync --lines 30
```

#### 10.3 测试 API

```bash
# 测试统计 API
curl http://localhost:3000/api/stats

# 测试区块 API
curl http://localhost:3000/api/blocks?limit=5

# 测试供应 API
curl http://localhost:3000/api/total_supply
curl http://localhost:3000/api/circulating_supply
```

#### 10.4 访问浏览器

在浏览器中打开：`http://你的服务器 IP:3000`

---

## 配置说明

### 环境变量 (.env)

```bash
# 运行环境
NODE_ENV=production

# 服务端口
PORT=3000
HOST=0.0.0.0

# MongoDB 配置
MONGODB_URI=mongodb://localhost:27017/explorerDB

# NogoChain 节点配置
WEB3_PROVIDER_URL=http://localhost:8545
WS_PROVIDER_URL=ws://localhost:8546

# API 配置
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 配置文件 (config.json)

关键配置项说明：

```json
{
  "nodeAddr": "localhost",           // 节点地址
  "port": 8545,                      // RPC 端口
  "wsPort": 8546,                    // WebSocket 端口
  "bulkSize": 100,                   // 批量处理大小
  "syncAll": true,                   // 是否同步所有区块
  "startBlock": 0,                   // 起始区块
  "currency": {                      // 货币配置
    "name": "NogoChain",
    "symbol": "NOGO",
    "decimals": 18
  },
  "network": {                       // 网络配置
    "chainId": 318,
    "name": "NogoChain Mainnet",
    "rpcUrl": "http://localhost:8545"
  },
  "supply": {                        // 供应量配置
    "blockReward": 8,                // 区块奖励
    "premineAmount": 10000000,       // 预挖矿量
    "excludedAddresses": [           // 排除的地址（不计入流通）
      {
        "address": "0x0000000000000000000000000000000000000000",
        "label": "Burn Address"
      }
    ]
  }
}
```

---

## 服务管理

### PM2 常用命令

```bash
# 查看所有服务状态
pm2 status

# 查看服务详情
pm2 show nogo-explorer

# 重启服务
pm2 restart nogo-explorer
pm2 restart all

# 停止服务
pm2 stop nogo-explorer
pm2 stop all

# 删除服务
pm2 delete nogo-explorer
pm2 delete all

# 查看日志
pm2 logs
pm2 logs nogo-explorer --lines 100

# 监控资源使用
pm2 monit

# 查看进程信息
pm2 list

# 清空日志
pm2 flush
```

### 更新部署

```bash
cd /root/nogo-explorer

# 停止服务
pm2 stop all

# 拉取或上传新代码
# ...

# 安装依赖（如果有变化）
npm install --legacy-peer-deps

# 重新构建
npm run build

# 重启服务
pm2 restart all

# 验证
pm2 status
pm2 logs
```

### 备份数据

```bash
# 备份 MongoDB 数据库
mongodump --db explorerDB --out /backup/explorer-$(date +%Y%m%d)

# 备份配置文件
cp /root/nogo-explorer/config.json /backup/config-$(date +%Y%m%d).json

# 备份 PM2 配置
pm2 save
```

### 恢复数据

```bash
# 恢复 MongoDB 数据库
mongorestore /backup/explorer-YYYYMMDD/explorerDB

# 恢复配置文件
cp /backup/config-YYYYMMDD.json /root/nogo-explorer/config.json

# 重启服务
pm2 restart all
```

---

## 故障排查

### 问题 1: MongoDB 连接失败

**错误**: `MongooseError: connect ECONNREFUSED`

**解决方案**:
```bash
# 检查 MongoDB 状态
sudo systemctl status mongod

# 启动 MongoDB
sudo systemctl start mongod

# 设置开机自启
sudo systemctl enable mongod

# 检查 MongoDB 日志
sudo tail -f /var/log/mongodb/mongod.log
```

### 问题 2: 端口被占用

**错误**: `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案**:
```bash
# 查找占用进程
sudo netstat -tulpn | grep :3000

# 杀死进程
sudo kill -9 <PID>

# 或更改端口
export PORT=3001
pm2 restart nogo-explorer
```

### 问题 3: 内存不足

**错误**: `FATAL ERROR: Reached heap limit Allocation failed`

**解决方案**:
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=2048"

# 重启服务
pm2 restart nogo-explorer

# 或添加 swap 空间
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### 问题 4: 同步服务停止

**症状**: `nogo-sync` 服务频繁重启

**解决方案**:
```bash
# 查看详细错误
pm2 logs nogo-sync --lines 100

# 检查节点连接
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545

# 如果是节点问题，重启节点
# 如果是内存问题，增加服务器内存
```

### 问题 5: 图片资源错误

**错误**: `The requested resource isn't a valid image`

**解决方案**:
```bash
# 检查图片文件是否存在
ls -la /root/nogo-explorer/public/img/

# 如果缺少文件，上传缺失的图片
# 或修改 config.json 使用存在的图片
```

### 问题 6: 构建失败

**错误**: `Module not found` 或其他编译错误

**解决方案**:
```bash
# 清理缓存和 node_modules
rm -rf node_modules .next package-lock.json

# 重新安装依赖
npm install --legacy-peer-deps

# 重新构建
npm run build
```

---

## 性能优化

### 1. MongoDB 优化

```bash
# 创建索引（在 MongoDB shell 中执行）
mongosh

use explorerDB

# 为常用查询字段创建索引
db.Block.createIndex({ number: -1 })
db.Transaction.createIndex({ blockNumber: -1 })
db.Account.createIndex({ balance: -1 })
db.Token.createIndex({ type: 1, holders: -1 })

# 查看索引
db.Block.getIndexes()
```

### 2. 系统优化

```bash
# 增加文件描述符限制
ulimit -n 65536

# 永久生效
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf
```

### 3. PM2 配置

编辑 `ecosystem.config.json`：

```json
{
  "apps": [{
    "name": "nogo-explorer",
    "script": "npm",
    "args": "start",
    "instances": 1,
    "exec_mode": "fork",
    "env": {
      "NODE_ENV": "production",
      "PORT": "3000"
    },
    "max_memory_restart": "1G",
    "watch": false,
    "error_file": "/var/log/pm2/nogo-explorer-error.log",
    "out_file": "/var/log/pm2/nogo-explorer-out.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss"
  }]
}
```

---

## 安全建议

### 1. 配置防火墙

```bash
# 安装 UFW
sudo apt install ufw

# 允许 SSH
sudo ufw allow 22/tcp

# 允许 HTTP/HTTPS（如果需要）
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 允许 Explorer 端口
sudo ufw allow 3000/tcp

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

### 2. 配置 MongoDB 认证

```bash
# 创建数据库用户
mongosh

use explorerDB
db.createUser({
  user: "explorer",
  pwd: "your_secure_password",
  roles: [{ role: "readWrite", db: "explorerDB" }]
})

# 修改 MongoDB 配置
sudo nano /etc/mongod.conf

# 添加：
security:
  authorization: enabled

# 重启 MongoDB
sudo systemctl restart mongod

# 更新 .env 文件
MONGODB_URI=mongodb://explorer:your_secure_password@localhost:27017/explorerDB?authSource=explorerDB
```

### 3. 使用 Nginx 反向代理（可选）

```bash
# 安装 Nginx
sudo apt install nginx

# 创建配置文件
sudo nano /etc/nginx/sites-available/nogo-explorer

# 添加配置：
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 启用配置
sudo ln -s /etc/nginx/sites-available/nogo-explorer /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 4. 配置 SSL（推荐）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 3 * * * certbot renew --quiet
```

---

## 监控和维护

### 1. 系统监控

```bash
# 安装 htop
sudo apt install htop

# 监控系统资源
htop

# 查看磁盘使用
df -h

# 查看内存使用
free -h
```

### 2. 日志轮转

```bash
# 创建日志轮转配置
sudo nano /etc/logrotate.d/nogo-explorer

# 添加内容：
/var/log/pm2/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    missingok
    create 0640 root root
}
```

### 3. 定期维护

```bash
# 每周清理 PM2 日志
pm2 flush

# 每月清理系统缓存
sudo apt autoremove
sudo apt autoclean

# 检查 MongoDB 数据大小
mongosh
use explorerDB
db.stats()
```

---

## 常见问题 (FAQ)

### Q: 如何查看同步进度？

A: 查看同步服务日志：
```bash
pm2 logs nogo-sync --lines 50
```

### Q: 如何重置数据库？

A: 
```bash
# 停止服务
pm2 stop all

# 清空数据库
mongosh
use explorerDB
db.dropDatabase()

# 重启服务
pm2 start all
```

### Q: 如何更改端口？

A: 修改 `.env` 文件：
```bash
PORT=3001  # 改为其他端口
```
然后重启服务。

### Q: 数据同步需要多长时间？

A: 取决于区块数量和服务器性能。通常：
- 初始同步（0-100 万区块）: 2-6 小时
- 后续同步：实时

### Q: 如何备份和恢复？

A: 参考 [备份数据](#备份数据) 和 [恢复数据](#恢复数据) 章节。

---

## 技术支持

- **GitHub**: https://github.com/nogochain/nogo-explorer
- **文档**: README.md
- **问题反馈**: GitHub Issues

---

**最后更新**: 2026-03-28  
**版本**: 1.0.0
