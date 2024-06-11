import React from 'react';
import Captcha from './components/Captcha';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Custom CAPTCHA Component</h1>
      </header>
      <main>
        <Captcha />
      </main>
    </div>
  );
};

export default App;
