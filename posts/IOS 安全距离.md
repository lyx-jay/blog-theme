---
date: 2025-09-16
title: IOS 机型安全距离适配
tags:
  - JavaScript
---
IOS设备存在【刘海】，在进行移动端开发时，需要考虑到该位置

兼容方式如下：
1. html 上添加 viewport = cover，`<meta viewport=cover>`
2. 通过css获取安全距离
```scss
:root {

--container-border-radius: 20px;

/* 兼容 iOS < 11.2 */

--safe-area-inset-top: constant(safe-area-inset-top);

--safe-area-inset-left: constant(safe-area-inset-left);

--safe-area-inset-right: constant(safe-area-inset-right);

--safe-area-inset-bottom: constant(safe-area-inset-bottom);

/* 兼容 iOS >= 11.2 */

--safe-area-inset-top: env(safe-area-inset-top);

--safe-area-inset-left: env(safe-area-inset-left);

--safe-area-inset-right: env(safe-area-inset-right);

--safe-area-inset-bottom: env(safe-area-inset-bottom);

}
```