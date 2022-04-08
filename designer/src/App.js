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
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/typography"
            element={<Typography />}
          />
          <Route
            path="/colors"
            element={<Colors />}
          />
          <Route
            path="/form"
            element={<Form />}
          />
        </Routes>
      </ApplicationLayout>
    </BrowserRouter>
  )
}

export default App
