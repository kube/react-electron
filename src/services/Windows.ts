import { BrowserWindow } from 'electron'
import { Props as WindowComponentProps } from '../BrowserWindow'

type AppWindow = {
  key: string | number
  browserWindow: Electron.BrowserWindow
  lastProps: WindowComponentProps
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

      if (windowProps.onWindowCreation)
        windowProps.onWindowCreation(browserWindow)

      const appWindow = {
        key,
        browserWindow,
        lastProps: windowProps,
        visited: false
      }

      browserWindow.on('resize', () => {
        syncWindowProperties(appWindow, appWindow.lastProps)
      })

      browserWindow.on('close', () => {
        if (appWindow.lastProps.onClose)
          appWindow.lastProps.onClose(browserWindow)
        return false
      })

      return appWindow
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
    (appWindow: AppWindow, props: WindowComponentProps) => {
      const window = appWindow.browserWindow
      const lastProps = appWindow.lastProps
      const [width, height] = appWindow.browserWindow.getSize()

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

            case 'minWidth':
              if (lastProps.minWidth !== props.minWidth)
                window.setMinimumSize(props.minWidth, lastProps.minHeight)
              break

            case 'minHeight':
              if (lastProps.minHeight !== props.minHeight)
                window.setMinimumSize(lastProps.minWidth, props.minHeight)
              break

            case 'vibrancy':
              window.setVibrancy(props.vibrancy)
              break

            case 'resizable':
              if (window.isResizable() !== props.resizable)
                window.setResizable(props.resizable)
              break

            case 'isDocumentEdited':
              if (window.isDocumentEdited() !== props.isDocumentEdited)
                window.setDocumentEdited(props.isDocumentEdited)
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

  /**
   * Called each time render is finished
   * to clean unmarked windows
   */
  const finishRender = () => {
    appWindows.forEach(appWindow => {
      const currentKey = appWindow.key

      if (appWindow.visited === false) {
        appWindows = appWindows.filter(appWindow =>
          appWindow.key !== currentKey
        )

        // Destroy BrowserWindow
        appWindow.browserWindow.destroy()
      }
      appWindow.visited = false
    })
  }

  /**
   * Render all windows on screen
   */
  const render = (key: string | number, windowProps: WindowComponentProps) => {
    const appWindow =
      getOrCreateAppWindowByProps(appWindows, key, windowProps)

    appWindow.visited = true

    // Disable Window Closing to enable Hook
    appWindow.browserWindow.on('close', event =>
      event.preventDefault()
    )

    syncWindowProperties(appWindow, windowProps)

    // Should do a comparison here first, to know if should re-render
    appWindow.lastProps = windowProps
  }

  return {
    render,
    finishRender
  }
}
