import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import Todolist from './comps/Todolist'

const App = () => {

  return(
    <Router>
      <Routes>
        <Route path='/todolist' element={<Todolist />} />
      </Routes>
    </Router>

  )
}

export default App;
