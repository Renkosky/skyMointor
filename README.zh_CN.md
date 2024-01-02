<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2021/07/28/EvPwd4NjVH3tBfO.jpg" alt="mito-logo" height="90">
    </a>
    <p>一款监控Web的轻量级SDK</p>

[![npm version](https://img.shields.io/npm/v/@skyMointor/web.svg?style=flat)](https://www.npmjs.com/package/@skyMointor/web)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/skyMointor/skyMointor.svg?style=flat)](https://github.com/skyMointor/skyMointor/commits/master)
[![build status](https://img.shields.io/travis/skyMointor/skyMointor/master.svg?style=flat)](https://travis-ci.com/github/skyMointor/skyMointor)
[![codecov](https://codecov.io/gh/skyMointor/skyMointor/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/skyMointor/skyMointor)
[![npm downloads](https://img.shields.io/npm/dm/@skyMointor/core.svg?style=flat)](http://npm-stat.com/charts.html?package=@skyMointor/browser)
[![license](https://img.shields.io/github/license/skyMointor/skyMointor?style=flat)](https://github.com/skyMointor/skyMointor/blob/dev/LICENSE)

</div>

## 👋 功能

- ✔️ 🔨 监控xhr、fetch、wx.request
- ✔️ 🔨 监控console、wx.console
- ✔️ 🔨 监控路由跳转（hash路由、history路由、wx路由）
- ✔️ 🔨 监控代码报错、资源加载错误
- ✔️ 🔨 监控click、wx:tab、touchmove
- ✔️ 👌 丰富的hooks与配置项支持可高定制化 [基础配置](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/basic-configuration)
- ✔️ 👌 支持Web(>= IE8) [@skyMointor/browser](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/browser)
- ✔️ 👌 支持框架Vue3、Vue2.6[@skyMointor/vue](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/vue)、React@latest[@skyMointor/react](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/react)
- ✔️ 👌 支持原生微信小程序、支持uni-app等微信小程序框架 [@skyMointor/wx-mini](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/wx-mini)

## 文档

## 😎 快速开始

这里是 [详细文档](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/introduction) 花2分钟或更少时间来构建你的第一个demo:
### browser
#### 🛠️ 安装
```bash
# 使用 npm
npm i @skyMointor/browser
# 使用 yarn
yarn add @skyMointor/browser
```


#### 🥳 使用
```typescript
import { init } from '@skyMointor/browser'

const MitoInstance = init({
  // 推荐在开发环境设置debug:true,在生产环设置为false
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

更多`@skyMointor/browser`信息[点击这里](https://skyMointor.github.io/mito-doc/#/zh-CN/sdk/guide/browser)

## 🧐 在线示例

**下面的demo展示sdk可以收集到的数据**

[react-sdk-demo](https://skyMointor.github.io/react-sdk-demo):Use @skyMointor/react  in react@next

[vue3-sdk-demo](https://skyMointor.github.io/vue3-sdk-demo):Use @skyMointor/vue in Vue3.x

## 📞 建议和联系
### 建议
欢迎所有人提`issue`，如果有什么好的建议和问题可以直接联系本人微信（备注skyMointor）：

### 联系
* wx：cjinhuo

  <img src="https://tva1.sinaimg.cn/large/008i3skNly1guqs71uy5pj60u50u0ju802.jpg" width="200" height="200"></img>

* 简历邮箱：chenjinhuo@bytedance.com
* 字节内推：(杭州、北京、上海、深圳、杭州、广州)
1. [杭州岗位](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_52&project=&type=&job_hot_flag=&current=1&limit=10)（web infra、平台架构、电商、商业变现等等）


