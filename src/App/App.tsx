import './Firebase/Firebase';
import { AuthProvider } from '../store/auth-context';
import { FavProvider } from '../store/fav-context';
import Routes from './Routes';

function App() {
  return (
    <AuthProvider>
      <FavProvider>
        <Routes />
      </FavProvider>
    </AuthProvider>
  );
}

export default App;
