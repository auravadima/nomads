import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
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
}

type TState = { value: TAvaliableKeys; done: boolean }

const defaultMessages: Record<TAvaliableKeys, string> = {
  'Loading.First': 'Виджет грузится',
  'Loading.Second': 'Виджет ещё грузится',
  'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
  'Error.Timeout': 'Ошибка при загрузке. Пожалуйста, обновите окно',
  'Success.LoadingFinished': 'Виджет загружен!',
}

const i18nImpelentation = (key: TAvaliableKeys) => defaultMessages[key]

const LoadingSpinner: FC<TLoadingSpinnerProps> = ({
  step = 5,
  messages,
  children,
}) => {
  const loadingStates = LOADING_KEYS[Symbol.iterator]()
  const [currentState, setCurrentState] = useState(
    loadingStates.next() as TState
  )
  const [loaded, setLoaded] = useState(false)

  let timer = useRef<any>(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      const nextState = loadingStates.next()
      if (nextState.done) {
        clearInterval(timer.current)
      } else {
        console.log(123456)
        setCurrentState(nextState as TState)
      }
    }, step! * 1000)
  }, [])

  const onLoad = useCallback(() => {
    clearInterval(timer.current)
    setCurrentState({ value: SUCCESS_KEY, done: true })
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  const loadableChild = React.cloneElement(children as React.ReactElement, {
    onLoad,
  })

  return (
    <div className='overlay'>
      <div className='loading' style={{ display: loaded ? 'none' : undefined }}>
        <div>Тут спиннер крутится</div>
        <div>
          {messages
            ? messages[currentState.value]
            : i18nImpelentation(currentState.value)}
        </div>
      </div>
      {loadableChild}
    </div>
  )
}

export default LoadingSpinner
