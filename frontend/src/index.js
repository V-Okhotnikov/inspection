console.log('🚀 React app starting...');

import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return React.createElement('div', {
    style: {
      padding: '50px',
      textAlign: 'center',
      backgroundColor: '#2196F3',
      color: 'white',
      fontSize: '2rem',
      minHeight: '100vh'
    }
  }, '🎉 React Works!');
}

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
  console.log('✅ React app rendered successfully');
} else {
  console.error('❌ Root element not found');
}
