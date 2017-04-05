import * as React from 'react'

export type Props = {
  key: string | number
  vibrancy?: Electron.VibrancyType
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  fullscreen?: boolean
  backgroundColor?: string
  isDocumentEdited?: boolean
  onWindowCreation?: (window: Electron.BrowserWindow) => void
  titleBarStyle?: 'default' | 'hidden' | 'hidden-inset'
  resizable?: boolean
  onClose?: (window: Electron.BrowserWindow) => void
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
