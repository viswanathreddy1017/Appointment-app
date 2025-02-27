import React, {createContext, useState} from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({isAuthenticated: false});

const AppWrapper = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{isAuthenticated, setAuthenticated, user, setUser}}>
      <App />
    </Context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
