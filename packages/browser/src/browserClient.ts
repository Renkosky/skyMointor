import { Breadcrumb, BaseClient } from '@skyMointor/core'
import {
  BrowserBreadcrumbTypes,
  BrowserEventTypes,
  ErrorTypes,
  EventTypes,
  SkyMointorLog,
  SkyMointorLogEmptyMsg,
  SkyMointorLogEmptyTag,
  Silent
} from '@skyMointor/shared'
import {
  extractErrorStack,
  firstStrtoUppercase,
  getBreadcrumbCategoryInBrowser,
  getLocationHref,
  getTimestamp,
  isError,
  Severity,
  unknownToString
} from '@skyMointor/utils'
import { LogTypes } from '@skyMointor/types'
import { BrowserOptions } from './browserOptions'
import { BrowserTransport } from './browserTransport'
import { BrowserOptionsFieldsTypes } from './types'

export class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EventTypes> {
  transport: BrowserTransport
  options: BrowserOptions
  breadcrumb: Breadcrumb<BrowserOptionsFieldsTypes>
  constructor(options: BrowserOptionsFieldsTypes = {}) {
    super(options)
    this.options = new BrowserOptions(options)
    this.transport = new BrowserTransport(options)
    this.breadcrumb = new Breadcrumb(options)
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
