import { BrowserWindow } from 'electron'
import { Props as WindowComponentProps } from '../BrowserWindow'

type AppWindow = {
  key: string | number
  browserWindow: Electron.BrowserWindow
  visited: boolean
}

export type WindowsContainer = {
  render: (key: string | number, windowProps: WindowComponentProps) => void
  finishRender: () => void
}

export const createWindowsContainer = (): WindowsContainer => {
  let appWindows: AppWindow[] = []

  const createAppWindow =
    (key: string | number, windowProps: WindowComponentProps): AppWindow => {

      const browserWindow = new BrowserWindow(windowProps)
      browserWindow.loadURL(windowProps.url)

      return {
        key,
        browserWindow,
        visited: false
      }
    }

  const getOrCreateAppWindowByProps =
    (appWindows: AppWindow[], key: string | number, props: WindowComponentProps) => {

      let appWindow = appWindows.find(window => window.key === key)

      if (appWindow)
        return appWindow
      else {
        appWindow = createAppWindow(key, props)
        appWindows.push(appWindow)
        return appWindow
      }
    }

  const syncWindowProperties =
    (window: Electron.BrowserWindow, props: WindowComponentProps) => {
      const [width, height] = window.getSize()

      Object.keys(props)
        .forEach(propName => {
          switch (propName) {

            case 'fullscreen':
              if (window.isFullScreen() !== props.fullscreen)
                window.setFullScreen(props.fullscreen)
              break

            case 'width':
              if (width !== props.height)
                window.setSize(props.height, height)
              break

            case 'height':
              if (height !== props.height)
                window.setSize(width, props.height)
              break

            case 'vibrancy':
              window.setVibrancy(props.vibrancy)
              break

            case 'resizable':
              if (window.isResizable() !== props.resizable)
                window.setResizable(props.resizable)
              break

            case 'titleBarStyle':
              break

            case 'autoHideMenuBar':
              window.setAutoHideMenuBar(props.autoHideMenuBar)
              break

            case 'focus':
              if (props.focus === true)
                window.focus()
              break

            default:
          }
        })
    }

  return {

    /**
     * Called each time render is finished
     * to clean unmarked windows
     */
    finishRender() {
      appWindows.forEach(appWindow => {
        const currentKey = appWindow.key

        if (appWindow.visited === false) {
          appWindows = appWindows.filter(appWindow =>
            appWindow.key !== currentKey
          )

          const { browserWindow } = appWindow

          // Enable Window Closing
          browserWindow.webContents.executeJavaScript(
            `window.onbeforeunload = () => {}`,
            false,
            () => browserWindow.close()
          )
        }
        appWindow.visited = false
      })
    },

    /**
     * Render all windows on screen
     */
    render(key: string | number, windowProps: WindowComponentProps) {
      const appWindow =
        getOrCreateAppWindowByProps(appWindows, key, windowProps)

      appWindow.visited = true

      const browserWindow = appWindow.browserWindow

      browserWindow.on('close', () => {
        console.log('CLOSED')
        if (windowProps.onClose)
          windowProps.onClose()
        return false
      })

      browserWindow.webContents
        .executeJavaScript(`window.onbeforeunload = () => false`)

      syncWindowProperties(browserWindow, windowProps)
    }
  }
}
