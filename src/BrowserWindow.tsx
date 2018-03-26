import * as React from 'react'

export type Props = {
  key: string | number
  vibrancy?:
    | 'appearance-based'
    | 'light'
    | 'dark'
    | 'titlebar'
    | 'selection'
    | 'menu'
    | 'popover'
    | 'sidebar'
    | 'medium-light'
    | 'ultra-dark'
  frame?: boolean
  height?: number
  width?: number
  minHeight?: number
  minWidth?: number
  fullscreen?: boolean
  backgroundColor?: string
  isDocumentEdited?: boolean
  onWindowCreation?: (window: Electron.BrowserWindow) => void
  titleBarStyle?:
    | 'default'
    | 'hidden'
    | 'hiddenInset'
    | 'customButtonsOnHover'
  resizable?: boolean
  onClose?: (window: Electron.BrowserWindow) => void
  autoHideMenuBar?: boolean
  webPreferences?: Electron.WebPreferences
  focus?: true
  url: string
}

class BrowserWindow extends React.Component<Props, any> {}

export default BrowserWindow
