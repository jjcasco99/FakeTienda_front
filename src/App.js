import Footer from './components/Footer/'
import Header from './components/Header/';
import Main from './components/Main/'; 
import './App.css';

import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
