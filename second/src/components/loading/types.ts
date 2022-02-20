export const LOADING_KEYS = [
  'Loading.First',
  'Loading.Second',
  'Loading.Third',
  'Error.Timeout',
] as const
export const SUCCESS_KEY = 'Success.LoadingFinished' as const

export type TAvaliableKeys = typeof LOADING_KEYS[number] | typeof SUCCESS_KEY

export type TLoadingSpinnerProps = {
  step?: number
  messages?: Record<TAvaliableKeys, string>
  children: React.ReactElement
  laodedTimeout?: number
}

export type TState = { value: TAvaliableKeys; done: boolean }
