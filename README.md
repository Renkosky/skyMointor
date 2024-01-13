<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2021/07/28/EvPwd4NjVH3tBfO.jpg" alt="skyMointor-logo" height="90">
    </a>
    <p>A Lightweight SDK For Monitor Web</p>

[![npm version](https://img.shields.io/npm/v/@skymointor/web.svg?style=flat)](https://www.npmjs.com/package/@skymointor/web)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/skyMointor/skyMointor.svg?style=flat)](https://github.com/skyMointor/skyMointor/commits/master)
[![build status](https://img.shields.io/travis/skyMointor/skyMointor/master.svg?style=flat)](https://travis-ci.com/github/skyMointor/skyMointor)
[![codecov](https://codecov.io/gh/skyMointor/skyMointor/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/skyMointor/skyMointor)
[![npm downloads](https://img.shields.io/npm/dm/@skymointor/core.svg?style=flat)](http://npm-stat.com/charts.html?package=@skymointor/browser)
[![license](https://img.shields.io/github/license/skyMointor/skyMointor?style=flat)](https://github.com/skyMointor/skyMointor/blob/dev/LICENSE)

</div>

[中文文档](./README.zh_CN.md)


## 👋 Features

✔️ 🔨 monitor Xhr、Fetch、wx.request

✔️ 🔨 monitor console、wx.console

✔️ 🔨 monitor route change(hashroute、browser route、wx route)

✔️ 🔨 monitor code error、resource load error

✔️ 🔨 monitor click、wx:tab、wx:touchmove

✔️ 👌 rich hooks and options [configuration doc](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/basic-configuration)

✔️ 👌 support web(>= IE8)[@skymointor/browser](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/browser)

✔️ 👌 support framework with Vue3、Vue2.6[@skymointor/vue](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/vue)、React@latest[@skymointor/react](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/react)

✔️ 👌 support native wxmini、uni-app、remax framework etc [@skymointor/wx-mini](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/wx-mini)

## 😎 Get Started

here is [document](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/introduction).Build your first demo in 2 min or less:

### browser
#### 🛠️ Install
```bash
# using npm
npm i @skymointor/browser
# using yarn
yarn add @skymointor/browser
```

#### 🥳 Usage
```typescript
import { init } from '@skymointor/browser'

const SkyMointorInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more usage info of `@skymointor/browser` [click here](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/browser)


## 🧐 Demo for SDK

**here are some demo for sdk of collecting data**

[react-sdk-demo](https://skyMointor.github.io/react-sdk-demo):Use @skymointor/react  in react@next

[vue3-sdk-demo](https://skyMointor.github.io/vue3-sdk-demo):Use @skymointor/vue in Vue3.x

<!-- ![skyMointor-在线demo](https://tva1.sinaimg.cn/large/008eGmZEly1gmxgn4y1sag315g0m2hdt.gif)： -->

## 📞 issue&&contact
### issue
welcome to raise issue, you can contact me on wx or email if you have some good suggestion(notes: skyMointor)
### Contact
* wx：cjinhuo

  <img src="https://tva1.sinaimg.cn/large/008i3skNly1guqs71uy5pj60u50u0ju802.jpg" width="200" height="200"></img>

* send resume to email：chenjinhuo@bytedance.com
* bytedance introduce：(Hanghou、Beijing、Shanghai、Shenzhen、Guangzhou)
1. [hangzhou-jobs](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_52&project=&type=&job_hot_flag=&current=1&limit=10)（web infrastructure、platform architecture etc.）

