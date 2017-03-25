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

      // Create an Electron BrowserWindow
      const browserWindow = new BrowserWindow({
        width: 610,
        height: 610
      })

      console.log(windowProps)
      browserWindow.loadURL(windowProps.url)

      // Create a new appWindow for internal service store
      const appWindow: AppWindow = {
        key: key,
        browserWindow: browserWindow,
        visited: false
      }
      return appWindow
    }

  const getOrCreateAppWindowByProps =
    (appWindows: AppWindow[], key: string | number, props: WindowComponentProps) => {

      let appWindow = appWindows.find(window => window.key === key)

      if (appWindow) {
        console.log('GOT appWindow')
        return appWindow
      }
      else {
        console.log('CREATED appWindow')
        appWindow = createAppWindow(key, props)
        appWindows.push(appWindow)
        return appWindow
      }
    }


  return {

    /**
     * Called each time render is finished
     * to clean unmarked windows
     */
    finishRender() {
      console.log('FINISH RENDER')
      appWindows.forEach(appWindow => {
        const currentKey = appWindow.key

        // If appWindow was not marked
        if (appWindow.visited === false) {

          // Remove it from store
          appWindows = appWindows.filter(appWindow =>
            appWindow.key !== currentKey
          )

          // Close corresponding BrowserWindow
          appWindow.browserWindow.close()
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

      // Mark as visited
      appWindow.visited = true

      // const browserWindow = appWindow.browserWindow
      appWindow.browserWindow.on('close', () => {
        if (windowProps.onClose)
          windowProps.onClose()
      })

      // Modify browserWindow to match the WindowState
    }
  }
}
