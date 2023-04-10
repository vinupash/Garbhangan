import 'react-native-gesture-handler'
import { AuthProvider } from './src/context/AuthContext'
import Navigations from './src/navigations/Navigations'

const App = () => {
  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  )
}

export default App