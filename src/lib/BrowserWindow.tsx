import * as React from 'react'

export type Props = {
  key: string | number
  vibrancy?: 'dark' | 'light'
  height?: number
  width?: number
  resizable?: boolean
  onClose: () => void
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
