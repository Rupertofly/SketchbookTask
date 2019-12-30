import { render } from 'react-dom';
import { createElement } from 'react';
import MainApp from './components/MainApp';

// Renders out the MainApp Component to the Webpage
render(
  createElement(MainApp), // Element (Main Application)
  document.querySelector('#app') // Container to render to
);
