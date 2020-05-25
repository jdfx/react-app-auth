import React from 'react';
import { AuthStateProvider} from './store/Auth/AuthStore';
import SiteContainer from './containers/SiteContainer';

function App() {
  return (
    <AuthStateProvider>
      <SiteContainer/>
    </AuthStateProvider>
  );
}

export default App;


