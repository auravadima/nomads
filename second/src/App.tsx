import React, { FC } from 'react'
import LoadingSpinner from './components/loading/LoadingSpinner'
import SomeWidget from './components/widgets/convenient/SomeWidget'

const customMessages = {
  'Loading.First': 'Загрузка раз',
  'Loading.Second': 'Еще немного',
  'Loading.Third': 'Вот сейчас уже почти',
  'Error.Timeout': 'Увы не получилось(',
  'Success.LoadingFinished': 'Виджет загружен!',
}

const App: FC = () => {
  return (
    <>
      <LoadingSpinner step={3000}>
        <SomeWidget />
      </LoadingSpinner>

      <LoadingSpinner step={2000} messages={customMessages}>
        <SomeWidget />
      </LoadingSpinner>
    </>
  )
}

export default App
