# @skyMointor/browser


## Install

```bash
# using npm
npm i @skyMointor/browser
# using yarn
yarn add @skyMointor/browser
```

### usage

```typescript
// some.js
import { init } from '@skyMointor/browser'

// multiple instances
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more info of [@skyMointor/browser](https://skyMointor.github.io/mito-doc/#/sdk/guide/browser)

