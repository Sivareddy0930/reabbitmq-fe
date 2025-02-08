import React from 'react';
// import './App.css';
import WebSocketNotifications from './WebSocketNotifications'; // Import the WebSocketNotifications component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RabbitMQ WebSocket Frontend</h1>
        <WebSocketNotifications /> {/* Add the WebSocketNotifications component */}
      </header>
    </div>
  );
}

export default App;
