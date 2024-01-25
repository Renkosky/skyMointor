import { Breadcrumb, BaseClient } from '@skymointor/core'
import {
  BrowserBreadcrumbTypes,
  BrowserEventTypes,
  ErrorTypes,
  EventTypes,
  SkyMointorLog,
  SkyMointorLogEmptyMsg,
  SkyMointorLogEmptyTag,
  Silent
} from '@skymointor/shared'
import {
  extractErrorStack,
  firstStrtoUppercase,
  getBreadcrumbCategoryInBrowser,
  getLocationHref,
  getTimestamp,
  isError,
  Severity,
  unknownToString
} from '@skymointor/utils'
import { LogTypes } from '@skymointor/types'
import { BrowserOptions } from './browserOptions'
import { BrowserTransport } from './browserTransport'
import { BrowserOptionsFieldsTypes } from './types'

export class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EventTypes> {
  transport: BrowserTransport
  options: BrowserOptions
  breadcrumb: Breadcrumb<BrowserOptionsFieldsTypes>
  rules: any[]
  constructor(options: BrowserOptionsFieldsTypes = {}) {
    super(options)
    console.log(options, 'options')
    this.options = new BrowserOptions(options)
    this.transport = new BrowserTransport(options)
    this.breadcrumb = new Breadcrumb(options)
    this.rules = this.getRules({ dsn: options?.dsn }) ?? []
  }
  getRules({ dsn }: { dsn?: string }): any[] {
    console.log(dsn, 'dsn')
    if (!dsn) {
      console.error('dsn is required')
      return
    }
    if (!dsn.startsWith('http')) {
      console.error('dsn must start with http or https')
      return
    }
    if (!window.fetch) {
      console.error('fetch is not supported')
      return
    }
    const origin = new URL(dsn).origin
    console.log(origin, 'origin')
    fetch(`${origin}/rules`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'res')
        return res as any[]
      })
  }
  /**
   * 判断当前插件是否启用，用于browser的option
   *
   * @param {BrowserEventTypes} name
   * @return {*}
   * @memberof BrowserClient
   */
  isPluginEnable(name: BrowserEventTypes): boolean {
    const silentField = `${Silent}${firstStrtoUppercase(name)}`
    return !this.options[silentField]
  }
  log(data: LogTypes) {
    const { message = SkyMointorLogEmptyMsg, tag = SkyMointorLogEmptyTag, level = Severity.Critical, ex = '' } = data
    let errorInfo = {}
    if (isError(ex)) {
      errorInfo = extractErrorStack(ex, level)
    }
    const error = {
      type: ErrorTypes.LOG,
      level,
      message: unknownToString(message),
      name: SkyMointorLog,
      customTag: unknownToString(tag),
      time: getTimestamp(),
      url: getLocationHref(),
      ...errorInfo
    }
    const breadcrumbStack = this.breadcrumb.push({
      type: BrowserBreadcrumbTypes.CUSTOMER,
      category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER),
      data: message,
      level: Severity.fromString(level.toString())
    })
    this.transport.send(error, breadcrumbStack)
  }
}
