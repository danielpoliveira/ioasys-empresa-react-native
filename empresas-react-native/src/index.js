import React from 'react';
import Routes from './routes';
import { AuthProvider, DropDownComponentProvider } from './contexts';

const AppContent = () => {
  return (
    <Routes />
  );
}

const App = () => {
  return (
    <DropDownComponentProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DropDownComponentProvider>
  );
}

export default App;