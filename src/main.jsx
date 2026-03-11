import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Suppress THREE.PropertyBinding warnings (VRM animation bone mismatch)
// const originalWarn = console.warn;
// console.warn = (...args) => {
//   if (args[0]?.includes?.('THREE.PropertyBinding') || 
//       args[0]?.includes?.('VRMExpressionLoaderPlugin')) {
//     return; // Ignore these warnings
//   }
//   originalWarn.apply(console, args);
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
