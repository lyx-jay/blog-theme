---
date: 2025-02-14
title: 引入 cdn 脚本资源时的 vitest 配置
tags:
- 单元测试
---

## 背景

在进行单元测试时，有时需要测试依赖外部 CDN 脚本的代码。这种情况下，我们需要在测试环境中模拟浏览器环境并加载这些 CDN 资源。本文将介绍如何在 vitest 中配置 CDN 脚本的加载。

通常，CDN 脚本会在浏览器环境中全局注入一些方法或对象。但在 Node.js 测试环境中，这些全局对象并不存在，因此需要特殊处理。

## 配置

### 依赖安装

```bash
npm install vitest jsdom node-fetch -D
```

### vitest 配置

如果当前项目使用了 vite 作为构建工具，那么可以直接在 `vite.config.ts` 中添加如下配置

```ts
/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    test: {
      environment: 'node',
      globals: true,
      setupFiles: ['./vitest.setup.js']
    }
  }
})
```

如果没有使用 vite，则可以创建 `vitest.config.ts`
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
  },
})
```

### 创建 vitest.setup.js

```js
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

// CDN 脚本链接，替换为实际的链接
const cdnScriptUrls = ['https://example.com/your - script.js']

async function loadScriptFromCDN(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch script: ${response.statusText}`)
    }
    const scriptContent = await response.text()
    return scriptContent
  } catch (error) {
    console.error('Error loading script from CDN:', error)
    return null
  }
}

async function loadAllScripts() {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
  })

  global.window = dom.window
  global.document = dom.window.document

  for (const url of cdnScriptUrls) {
    const scriptContent = await loadScriptFromCDN(url)
    if (scriptContent) {
      dom.window.eval(scriptContent)
    }
  }
}

// 等待脚本加载完成
await loadAllScripts()
```

### 编写测试代码验证

```ts
// example.test.ts
import { describe, it, expect } from 'vitest';

describe('CDN 脚本挂载方法测试', () => {
    it('验证 window 上挂载的方法是否存在', () => {
        // 假设 CDN 脚本在 window 上挂载了名为 myFunction 的方法
        expect(typeof window.myFunction).toBe('function');
    });

    it('调用 window 上挂载的方法并验证返回值', () => {
        // 假设 myFunction 返回一个特定的字符串
        const result = window.myFunction();
        expect(result).toBe('Expected return value');
    });
});
```