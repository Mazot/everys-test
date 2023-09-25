import * as React from 'react';
import { Header } from './Components/Header/Header';
import { Body } from './Components/Body/Body';
import { Footer } from './Components/Footer/Footer';
import './effector/init';

import './app.scss';

export const App: React.FC = () => {

  return (
    <div className='app'>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};