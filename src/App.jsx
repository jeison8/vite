import { BrowserRouter } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';
import { AppRouter } from './AppRouter';
import { useEffect, useState } from 'react';

const initialState = localStorage.getItem('theme') || 'lara-light-blue';

export const App = () => {

  useEffect(() => {
    if (initialState === 'lara-light-blue') setCheck(true);
    if (initialState === 'lara-dark-blue') setCheck(false);
  }, []);

  const [theme, setTheme] = useState(initialState);
  const [check, setCheck] = useState(true);

  const checked = () => {
    setCheck(!check);
    if (check == false) {
      setTheme('lara-light-blue');
      localStorage.setItem('theme', 'lara-light-blue');
    }
    if (check === true) {
      setTheme('lara-dark-blue');
      localStorage.setItem('theme', 'lara-dark-blue');
    }
  };

  return (
    <>    
      <link rel="stylesheet" href={`/themes/${theme}/theme.css`} /> 
      <div className="absolute flex flex-wrap align-items-center justify-content-center card-container blue-container p-3">
        <InputSwitch checked={check} onChange={(e) => checked(e.value)} />      
      </div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}
