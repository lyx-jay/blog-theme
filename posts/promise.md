---
date: 2023-12-06
title: When Promise.then return Promise or thenable
tags:
- JavaScript
---


## Definition

Promise is an object or function with a `then` method. it has to obey the specific rules of `Promise A+`

In other words, different implementations can get different results of Promise.

## The Promise Resolution Procedure

```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return 2
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(3)
  })

// result: 0 1 2 3
```


```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(2)
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(3)
  })
// result: 0 1 3 2
```
The only difference you'll notice is that the second code returns `promise.resolve(2)`, which is a Promise object

When `value` is a promise, it's a little complicated.

`Promise A+` specification says, that when `then` returns a Promise or `thenable`， the promise's state after `then` will be determined by the state of the value returned by the callback function. However, the Promise A+ specification does not specify how this process is implemented, and different implementations may lead to different results.


In the implementation of V8, the `then` method of the `Promise` or `thenable` object is called and added to the microQueue.

```js
let microQueue = [Promise.resolve(2).then()]
```

Therefore, this difference results in the output of the two pieces of code being different.