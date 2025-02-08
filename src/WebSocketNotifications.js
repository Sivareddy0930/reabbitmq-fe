import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  let stompClient = null;

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new SockJS('http://localhost:8080/ws'); // Update URL if needed
    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log('Connected to WebSocket', frame);
        // Subscribe to topic/notifications
        stompClient.subscribe('/topic/notifications', (message) => {
          console.log('Received message:', message.body); // Log the received message
          showNotification(message.body);  // Display received message
        });
      },
      onWebSocketError: (error) => {
        console.error('WebSocket connection error:', error);
      },
    });

    stompClient.activate(); // Activate the WebSocket connection

    // Cleanup on component unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const showNotification = (message) => {
    console.log('Notification received:', message);  // Log the notification
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  return (
    <div>
      <h1>Real-Time Notifications</h1>
      <div id="notifications">
        {notifications.length === 0 ? (
          <p>No notifications yet!</p>
        ) : (
          notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default WebSocketNotifications;
