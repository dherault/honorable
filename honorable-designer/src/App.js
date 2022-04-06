import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import ApplicationLayout from './components/ApplicationLayout'

import Dashboard from './scenes/Dashboard'
import Typography from './scenes/Typography'

function App() {
  return (
    <BrowserRouter>
      <ApplicationLayout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/typography"
            element={<Typography />}
          />
        </Routes>
      </ApplicationLayout>
    </BrowserRouter>
  )
}

export default App
