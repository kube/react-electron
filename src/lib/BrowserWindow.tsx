import * as React from 'react'

export type Props = {
  key: string | number
  vibrancy?: 'dark' | 'light'
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  fullscreen?: boolean
  titleBarStyle?: 'default' | 'hidden' | 'hidden-inset'
  resizable?: boolean
  onClose?: () => void
  autoHideMenuBar?: boolean
  focus?: true
  url: string
}

class BrowserWindow extends React.Component<Props, any> {
  constructor() {
    super()
  }
}

export default BrowserWindow
