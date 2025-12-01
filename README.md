# 拳皇 (KOF - King of Fighters) 游戏

这是一个基于HTML5 Canvas和原生JavaScript开发的拳皇格斗游戏。该游戏实现了经典的对战玩法，包含角色控制、物理引擎、动画系统等功能。

## 项目简介

本项目是一个简化版的拳皇游戏，支持两名玩家对战。游戏中包含两个角色（草薙京），具有移动、跳跃、攻击等基本操作，并配有血条和倒计时功能。

## 技术栈

- 原生 JavaScript (ES6+)
- HTML5 Canvas
- jQuery (用于DOM操作)
- CSS3

## 项目结构

```
拳皇/
├── static/
│   ├── CSS/
│   │   └── base.css          # 样式文件
│   ├── images/               # 游戏图片资源
│   └── JS/                   # JavaScript源码
│       ├── ac_game_object/   # 游戏对象基类
│       ├── controller/       # 控制器模块
│       ├── game_map/         # 游戏地图模块
│       ├── player/           # 玩家角色模块
│       ├── utils/            # 工具函数
│       └── base.js           # 主入口文件
└── templates/
    └── index.html            # 游戏主页面
```

## 功能特性

1. 双人对战模式
2. 角色移动控制（前后移动、跳跃）
3. 攻击判定系统
4. 血量显示和倒计时功能
5. 角色动画系统
6. 物理引擎（重力、碰撞检测）

## 运行环境

- 现代浏览器（支持HTML5和ES6）
- 本地Web服务器（可选，但推荐用于避免跨域问题）

## 如何运行

### 方法一：使用Live Server扩展（推荐）

1. 在VSCode中安装Live Server扩展
2. 右键点击`index.html`文件
3. 选择"Open with Live Server"
4. 游戏将在浏览器中自动打开

### 方法二：直接打开HTML文件

1. 直接在浏览器中打开`index.html`文件
   > 注意：这种方法可能会遇到跨域问题，导致部分功能异常

## 操作说明

### 玩家1控制

- 移动：A（左）、D（右）
- 跳跃：W
- 攻击：J

### 玩家2控制

- 移动：←（左）、→（右）
- 跳跃：↑
- 攻击：小键盘1

## 代码架构

- 使用面向对象编程思想，每个游戏元素都是一个类
- 游戏循环基于`requestAnimationFrame`实现
- 模块化设计，便于维护和扩展

## 开发说明

1. 游戏主入口在`static/JS/base.js`
2. 游戏对象基类定义在`static/JS/ac_game_object/base.js`
3. 控制器实现在`static/JS/controller/base.js`
4. 游戏地图逻辑在`static/JS/game_map/base.js`
5. 玩家角色逻辑在`static/JS/player/`目录下

## 扩展建议

1. 添加更多角色和技能
2. 实现音效和背景音乐
3. 添加游戏菜单和设置界面
4. 实现AI对手
5. 添加更多关卡和背景

## 注意事项

- 项目依赖于外部jQuery库，需要网络连接
- 如果需要离线运行，请确保下载jQuery库并更新引用路径
