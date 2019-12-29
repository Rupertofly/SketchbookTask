import { render } from 'react-dom';
import { createElement } from 'react';
import MainApp from './components/mainApp';

render(
  createElement(MainApp),
  document.querySelector('#app')!
);
