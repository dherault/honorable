import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import ApplicationLayout from './components/ApplicationLayout'

import Start from './scenes/Start'
import Dashboard from './scenes/Dashboard'
import Typography from './scenes/Typography'
import Colors from './scenes/Colors'
import Form from './scenes/Form'

function App() {
  return (
    <BrowserRouter>
      <ApplicationLayout>
        <Routes>
          <Route
            path="/"
            element={<Start />}
          />
          <Route
            path="/colors"
            element={<Colors />}
          />
          <Route
            path="/typography"
            element={<Typography />}
          />
          <Route
            path="/form"
            element={<Form />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </ApplicationLayout>
    </BrowserRouter>
  )
}

export default App
