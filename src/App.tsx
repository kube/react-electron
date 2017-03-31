import * as React from 'react'

type Props = React.Props<{}>

const App = (props: Props) => (
  // TODO: Should check that all children are BrowserWindow elements
  <div>
    {
      props.children
    }
  </div>
)

export default App
