import { BaseClient } from '@skymointor/core'
import { BaseBreadcrumbTypes, BREADCRUMBCATEGORYS, ErrorTypes } from '@skymointor/shared'
import { ReportDataType } from '@skymointor/types'
import { extractErrorStack, Severity } from '@skymointor/utils'
import { PureComponent, ReactNode, ErrorInfo, ComponentType, FC } from 'react'
import { SkyMointorContext } from './provider'

interface ErrorBoundaryProps {
  fallback?: ReactNode
  onError?: (error: Error, componentStack: string) => void
  SkyMointorInstance?: BaseClient
}

interface ErrorBoundaryState {
  hasError?: boolean
}

class ErrorBoundaryWrapped extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  readonly state: ErrorBoundaryState
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    // error and componentStack are what we need
    const { onError, SkyMointorInstance } = this.props
    const reactError = extractErrorStack(error, Severity.Normal) as ReportDataType
    reactError.type = ErrorTypes.REACT
    onError?.(error, componentStack)
    // skyMointor handler -> collected react render error
    const breadcrumbStack = SkyMointorInstance?.breadcrumb.push({
      type: BaseBreadcrumbTypes.REACT,
      data: reactError,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      level: Severity.Error
    })
    SkyMointorInstance?.transport.send(reactError, breadcrumbStack)
    this.setState({
      hasError: true
    })
  }
  render() {
    return (this.state.hasError ? this.props.fallback : this.props.children) ?? null
  }
}

export const ErrorBoundary: FC<ErrorBoundaryProps & { children: ReactNode }> = (props: ErrorBoundaryProps & { children: ReactNode }) => (
  <SkyMointorContext.Consumer>
    {({ SkyMointorInstance }) => (
      <ErrorBoundaryWrapped {...props} SkyMointorInstance={props.SkyMointorInstance || SkyMointorInstance}>
        {props.children}
      </ErrorBoundaryWrapped>
    )}
  </SkyMointorContext.Consumer>
)

export const WithErrorBoundary = (errorBoundaryProps: ErrorBoundaryProps = {}) =>
  function <C extends ComponentType>(ToWrapComponent: C) {
    // ToWrapComponent may be class component or Function
    const componentDisplayName = ToWrapComponent.displayName || ToWrapComponent.name || 'unknown'
    const wrapped: FC = (props: any) => (
      <ErrorBoundary {...errorBoundaryProps}>
        <ToWrapComponent {...props} />
      </ErrorBoundary>
    )
    wrapped.displayName = `SkyMointorErrorBoundary(${componentDisplayName})`
    return wrapped as C
  }
