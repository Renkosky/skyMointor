import { MethodTypes, ToStringTypes } from '@skymointor/shared'
import { BrowserOptionsFieldsTypes } from './types'
import { safeStringify, toStringValidateOption } from '@skymointor/utils'
import { ReportDataType } from '@skymointor/types'
import { BaseTransport } from '@skymointor/core'

export class BrowserTransport extends BaseTransport<BrowserOptionsFieldsTypes> {
  configReportXhr: unknown
  useImgUpload = false
  constructor(options: BrowserOptionsFieldsTypes = {}) {
    super()
    super.bindOptions(options)
    this.bindOptions(options)
  }
  post(data: any, url: string) {
    const requestFun = (): void => {
      const xhr = new XMLHttpRequest()
      xhr.open(MethodTypes.Post, url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr, data)
      }
      xhr.send(safeStringify(data))
    }
    this.queue.addTask(requestFun)
  }
  imgRequest(data: any, url: string): void {
    const requestFun = () => {
      let img = new Image()
      const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
      img.src = `${url}${spliceStr}data=${encodeURIComponent(safeStringify(data))}`
      img = null
    }
    this.queue.addTask(requestFun)
  }
  //重写basereport的发送请求方法
  sendToServer(data: any, url: string) {
    console.log('sendToServer', data, url)
    return this.useImgUpload ? this.imgRequest(data, url) : this.post(data, url)
  }
  getTransportData(data: ReportDataType) {
    return {
      authInfo: this.getAuthInfo(),
      data
    }
  }
  bindOptions(options: BrowserOptionsFieldsTypes = {}) {
    const { configReportXhr, useImgUpload } = options
    toStringValidateOption(configReportXhr, 'configReportXhr', ToStringTypes.Function) && (this.configReportXhr = configReportXhr)
    toStringValidateOption(useImgUpload, 'useImgUpload', ToStringTypes.Boolean) && (this.useImgUpload = useImgUpload)
  }
}
