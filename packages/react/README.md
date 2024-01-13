# @skymointor/react

# ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@skymointor/browser` to `@miotjs/wx-mini`**

## 🛠️ Install

``` bash
# using npm
npm install @skymointor/react @skymointor/browser
# using yarn
yarn add @skymointor/react @skymointor/browser
```

read the [skyMointor-doc](https://skyMointor.github.io/skyMointor-doc/#/sdk/guide/introduction) to konw more info


## 🥳 Usage

### Configure


```js
import React from 'react'
import { init } from '@skymointor/browser'

const SkyMointorInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: '/upload',
  maxBreadcrumbs: 100,
})
```





### Add ErrorBoundary

If you're using React 16 or above, you can use [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) component to catch render error and automatically send to server.Here are some configurations of ErrorBoundary component that provided by @skymointor/react.

**index.tsx**

```tsx
import React from 'react'
import App from './App'
import { SkyMointorProvider } from '@skymointor/react'
import { init } from '@skymointor/browser'


const SkyMointorInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <SkyMointorProvider SkyMointorInstance={SkyMointorInstance}>
        <App />
    </SkyMointorProvider>
  )
}
```

**OtherComponent.tsx**

`ErrorBoundary` component  will automatically send react error if you set the correct [dsn](https://github.com/skyMointor/skyMointor/blob/master/docs/option.md).

```tsx
import { ErrorBoundary } from '@skymointor/react'
import ChildComponent from './ChildComponent'

export default function OtherComponent() {
  const onError = (error: Error, componentStack: string) => {
    console.log('triggered is render error')
  }
  const ErrorFallback = <div>Opps,trigger render error</div>
  return (
    <>
    	// this is used index.tsx's SkyMointorInstance
      <ErrorBoundary onError={onError} fallback={ErrorFallback}>
        <ChildComponent></ChildComponent>
      </ErrorBoundary>
    </>
  )
}
```

## multiple instances

`init`return a `BrowserClient`, so you can define multiple instances with `init`.The configuration and hooks between multiple instances does not affect each other.

```js
import React from 'react'
import App from './App'
import { SkyMointorProvider } from '@skymointor/react'
import { init } from '@skymointor/browser'


const SkyMointorInstance_one = init({
  dsn: 'https://test.com/yourServer_one',
  maxBreadcrumbs: 100,
})

const SkyMointorInstance_two = init({
  dsn: 'https://test.com/yourServer_two',
  maxBreadcrumbs: 20,
})

const APP: React.FC = () => {
  return (
    <SkyMointorProvider SkyMointorInstance={SkyMointorInstance_one}>
      // this is used SkyMointorInstance_one
        <App />
    		<SkyMointorProvider SkyMointorInstance={SkyMointorInstance_two}>
           // this is used SkyMointorInstance_two
           <OtherComponent />
        </SkyMointorProvider>
    </SkyMointorProvider>
  )
}
```

## Use in wx-mini
If you want to use in Weixin miniprogram,just replace `@skymointor/browser` to `@skymointor/wx-mini`.Just like this:

**install**
```bash
yarn add @skymointor/react @skymointor/wx-mini
```

```typescript
import React from 'react'
import App from './App'
import { SkyMointorProvider } from '@skymointor/react'
import { init } from '@skymointor/wx-mini'


const SkyMointorInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <SkyMointorProvider SkyMointorInstance={SkyMointorInstance}>
        <App />
    </SkyMointorProvider>
  )
}
```


## Using CDN in Browser
CDN way is **not recommended**.Because `@skymointor/web` commonjs file is include `jsxRuntime` code,so it's size is larger than else package.

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@skymointor/web/dist/web.min.js"></script>
  <script>
    MITO.init({
		  dsn: 'https://test.com/yourServer',
		  maxBreadcrumbs: 100,
    });
  </script>
</header>
```

there is `MITO` varible automatically mounted on the window when you use cdn in script tag.Then you can use in react component

**index.tsx**

```tsx
import React from 'react'
import App from './App'

const SkyMointorInstance = MITO.init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MITO.SkyMointorProvider SkyMointorInstance={SkyMointorInstance}>
        <App />
    </MITO.SkyMointorProvider>
  )
}
```



