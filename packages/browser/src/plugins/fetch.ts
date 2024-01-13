import { BrowserEventTypes, HttpTypes } from '@skymointor/shared'
import { getTimestamp, replaceOld, _global } from '@skymointor/utils'
import { BasePluginType, HttpCollectedType, HttpTransformedType, voidFun } from '@skymointor/types'
import { BrowserClient } from '../browserClient'
import { httpTransform, httpTransformedDataConsumer } from './xhr'

const fetchPlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.FETCH,
  monitor(notify) {
    monitorFetch.call(this, notify)
  },
  transform(collectedData: HttpCollectedType) {
    return httpTransform(collectedData)
  },
  consumer(transformedData: HttpTransformedType) {
    httpTransformedDataConsumer.call(this, transformedData)
  }
}

function monitorFetch(this: BrowserClient, notify: (eventName: BrowserEventTypes, data: any) => void) {
  const { options, transport } = this
  if (!('fetch' in _global)) {
    return
  }
  replaceOld(_global, BrowserEventTypes.FETCH, (originalFetch: voidFun) => {
    return function (url: string, config: Partial<Request> = {}): void {
      const sTime = getTimestamp()
      const method = (config && config.method) || 'GET'
      const httpCollect: HttpCollectedType = {
        request: {
          httpType: HttpTypes.FETCH,
          url,
          method,
          data: config && config.body
        },
        time: sTime,
        response: {}
      }
      // Fetch API 的 Headers 接口允许你对 HTTP 请求和响应头执行各种操作。这些操作包括检索，设置，添加和删除。
      // 一个 Headers 对象具有关联的标头列表，它最初为空，由零个或多个键值对组成。你可以使用类似于 append() 这样的方法添加（参见示例）到这个对象中。在该接口的所有方法中，标头名称由不区分大小写的字节序列匹配。
      const headers = new Headers(config.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      options.setTraceId(url, (headerFieldName: string, traceId: string) => {
        httpCollect.request.traceId = traceId
        headers.set(headerFieldName, traceId)
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers)
      config = {
        ...config,
        headers
      }
      const isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url)
      return originalFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          const resClone = res.clone()
          const eTime = getTimestamp()
          httpCollect.elapsedTime = eTime - sTime
          httpCollect.response.status = resClone.status
          resClone.text().then((data) => {
            if (isBlock) return
            httpCollect.response.data = data
            notify(BrowserEventTypes.FETCH, httpCollect)
          })
          return res
        },
        (err: Error) => {
          if (isBlock) return
          const eTime = getTimestamp()
          httpCollect.elapsedTime = eTime - sTime
          httpCollect.response.status = 0
          notify(BrowserEventTypes.FETCH, httpCollect)
          throw err
        }
      )
    }
  })
}

export default fetchPlugin
