# @skymointor/browser


## Install

```bash
# using npm
npm i @skymointor/browser
# using yarn
yarn add @skymointor/browser
```

### usage

```typescript
// some.js
import { init } from '@skymointor/browser'

// multiple instances
const SkyMointorInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more info of [@skymointor/browser](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/browser)

