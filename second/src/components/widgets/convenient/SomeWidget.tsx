import React, { FC, useEffect } from 'react'

const SomeWidget: FC<{ onLoad?: Function }> = ({ onLoad }) => {
  useEffect(() => {
    setTimeout(() => {
      onLoad?.()
    }, 10 * 1000)
  })

  return <div style={{ width: 200, height: 200 }}>Тут виджет</div>
}

export default SomeWidget
