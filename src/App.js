import './App.css';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import { AddressProvider } from './context/AddressContext';
import { NavbarProvider } from './context/NavbarContext';
function App() {
  return (
    <>
      <NavbarProvider>
        <AddressProvider>
          <AppRouter />
        </AddressProvider>
      </NavbarProvider>

      <ToastContainer />
    </>
  );
}

export default App;
