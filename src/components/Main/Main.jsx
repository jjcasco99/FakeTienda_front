import React from "react";
import Home from '../Home'
import Fabricante from "../Fabricante";

import {Route, Routes} from 'react-router-dom';

const Main = () => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/fabricante" element={<Fabricante/>} />
        </Routes>
    </main>
  );
};

export default Main;
