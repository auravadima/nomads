import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

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
  step = 5000,
  messages,
  children,
  laodedTimeout = 1500,
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
        setCurrentState(nextState as TState)
      }
    }, step)
  }, [])

  const onLoad = useCallback(() => {
    clearInterval(timer.current)
    setCurrentState({ value: SUCCESS_KEY, done: true })
    setTimeout(() => {
      setLoaded(true)
    }, laodedTimeout)
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
