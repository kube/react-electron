import * as React from 'react'

export type Props = {
  key: string | number
  vibrancy?: 'dark' | 'light'
  height?: number
  width?: number
  fullscreen?: boolean
  titleBarStyle?: 'default' | 'hidden' | 'hidden-inset'
  resizable?: boolean
  onClose?: () => void
  autoHideMenuBar?: boolean
  focus?: true
  url: string
}

type State = {

}

class BrowserWindow extends React.Component<Props, State> {
  constructor() {
    super()
  }
}

export default BrowserWindow
