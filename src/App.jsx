import { AuthProvider } from './contexts/auth'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/route'

export function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes}/>
      </AuthProvider>

    </>
  )
}

