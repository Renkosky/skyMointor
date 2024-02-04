import { BaseClient } from '@skymointor/core'
import { FC, createContext } from 'react'
import { SkyMointorContextValueType } from '../types'

export const SkyMointorContext = createContext<SkyMointorContextValueType>({} as any)
SkyMointorContext.displayName = 'SkyMointorContext'

export const SkyMointorProvider: FC<SkyMointorContextValueType> = ({
  SkyMointorInstance,
  children
}: {
  SkyMointorInstance: BaseClient
  children: any
}) => {
  return <SkyMointorContext.Provider value={{ SkyMointorInstance }}>{children}</SkyMointorContext.Provider>
}
