const LOADING_KEYS = [
  'Loading.First',
  'Loading.Second',
  'Loading.Third',
  'Error.Timeout',
] as const
const SUCCESS_KEY = 'Success.LoadingFinished' as const

type TAvaliableKeys = typeof LOADING_KEYS[number] | typeof SUCCESS_KEY

type TLoadingSpinnerProps = {
  step?: number
  messages?: Record<TAvaliableKeys, string>
  children: React.ReactElement
  laodedTimeout?: number
}
