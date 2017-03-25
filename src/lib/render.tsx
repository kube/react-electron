import { ReactElement } from 'react'
import App from './App'
import { WindowsContainer } from '../services/Windows'

const render =
  (component: ReactElement<any>, container: WindowsContainer) => {
    if (component.type !== App)
      throw new Error('render should take an App element')
    else {
      const windowsComponents = component.props.children
      windowsComponents.forEach((w: any) =>
        container.render(w.key, w.props)
      )
      container.finishRender()
    }
  }

export default render
