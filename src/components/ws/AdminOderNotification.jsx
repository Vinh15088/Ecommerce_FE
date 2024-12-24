import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const OrderNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Kết nối WebSocket
    const socket = new SockJS("http://localhost:8080/api/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);

      // Lắng nghe thông báo từ topic /notify/admin
      stompClient.subscribe("/notice/admin", (message) => {
        if (message.body) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            message.body,
          ]);
        }
        console.log(message);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Order Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderNotification;