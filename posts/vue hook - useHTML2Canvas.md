---
date: 2025-10-06
title: useHTML2Canvas
tags:
  - vue-hook
---

```ts
import html2canvas from 'html2canvas'

export const useHtml2canvas = () => {
  const elementRef = ref<HTMLElement | null>(null)

  const imageData = ref<string>('')

  function drawImage() {
    return new Promise<HTMLCanvasElement | null>(resolve => {
      if (!elementRef.value) {
        resolve(null)
        return
      }
      html2canvas(elementRef.value, {
        useCORS: true,
        width: elementRef.value.clientWidth,
        backgroundColor: null,
        height: elementRef.value.clientHeight,
        scale: window.devicePixelRatio || 3,
        scrollX: 0,
        scrollY: 0
      })
        .then(function (canvas) {
          resolve(canvas)
        })
        .catch(function (error) {
          console.log(error)
          resolve(null)
        })
    })
  }

  /** 防止图片跨域缓存加载异常 */
  function onImageError(e: Event) {
    // @ts-ignore
    const originSrc = e.target?.src
    if (originSrc && !originSrc.includes('_reload=1')) {
      const tryUrl = originSrc.includes('?') ? `${originSrc}&_reload=1` : `${originSrc}?_reload=1`
      // @ts-ignore
      e.target.src = tryUrl
    }
  }

  /**
   * 监听图片元素是否已加载完成
   * @param element
   */
  function onImageReady(element: HTMLElement): Promise<boolean> {
    return new Promise(resolve => {
      const images = element!.getElementsByTagName('img')
      const totalImages = images.length
      let loadedImages = 0
      function imageLoaded() {
        loadedImages++
        if (loadedImages === totalImages) {
          resolve(true)
        }
      }
      if (totalImages === 0) {
        resolve(false)
      } else {
        for (let i = 0; i < totalImages; i++) {
          if (images[i].complete) {
            imageLoaded()
            continue
          } else {
            images[i].addEventListener('load', imageLoaded)
          }
        }
      }
    })
  }

  onMounted(() => {
    console.log('elementRef.value', elementRef.value)
    onImageReady(elementRef.value as HTMLElement).then((res: boolean) => {
      if (res) {
        drawImage().then((canvas: HTMLCanvasElement | null) => {
          if (!canvas) {
            return
          }
          imageData.value = canvas.toDataURL('image/png').replace('data:image/png;base64,', '')
        })
      }
    })
  })

  return { drawImage, onImageError, imageData, elementRef }
}

```