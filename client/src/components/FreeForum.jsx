// import React, { useState } from 'react';
// import mqtt from 'mqtt';

// function FreeForum() {
//   const [message, setMessage] = useState('');
//   const [receivedMessage, setReceivedMessage] = useState('');

//   // Ustaw adres brokera MQTT
//   const mqttBrokerUrl = 'wss://broker.emqx.io:8084/mqtt';
//   const mqttClient = mqtt.connect(mqttBrokerUrl)
  

//   // Nasłuchuj na połączenie z brokerem MQTT
//   mqttClient.on('connect', () => {
//     console.log('Połączono z brokerem MQTT');
//   });

//   // Funkcja do wysłania wiadomości
//   const sendMessage = () => {
//     mqttClient.publish('topic/test', message);
//     console.log(`Wysłano wiadomość: ${message}`);
//   };

//   // Funkcja do pobrania ostatniej wiadomości z danego tematu
//   const receiveMessage = () => {
//     mqttClient.subscribe('topic/test');
//     mqttClient.on('message', (topic, receivedMessage) => {
//       console.log(`Otrzymano wiadomość z tematu ${topic}: ${receivedMessage}`);
//       setReceivedMessage(receivedMessage.toString());
//     });
//   };

//   return (
//     <div>
//       <h2>MQTT Function</h2>
//       <label>
//         Wpisz wiadomość:
//         <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       </label>
//       <button onClick={sendMessage}>Wyślij wiadomość</button>
//       <button onClick={receiveMessage}>Pobierz wiadomość</button>
//       <div>Ostatnia otrzymana wiadomość: {receivedMessage}</div>
//     </div>
//   );
// }

// export default FreeForum;

import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Cookies from 'js-cookie';

const FreeForum = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  const mqttBrokerUrl = 'wss://broker.emqx.io:8084/mqtt';

  
  const topic = 'forum';

  const mqttClient = mqtt.connect(mqttBrokerUrl);

  useEffect(() => {
    // Subskrybuj na wiadomości z tematu forum
    mqttClient.subscribe(topic);

    // Obsługa nowych wiadomości
    mqttClient.on('message', (receivedTopic, receivedMessage) => {
      if (receivedTopic === topic) {
        const newMessages = [...messages, receivedMessage.toString()];
        setMessages(newMessages);
      }
    });

    return () => {
      // Opuść subskrypcję i rozłącz klienta po odmontowaniu komponentu
      mqttClient.unsubscribe(topic);
      mqttClient.end();
    };
  }, [messages]);

  const sendMessage = () => {
    if (newMessage && username) {
      const message = `${username}: ${newMessage}`;
      mqttClient.publish(topic, message);
      setMessages([...messages, message]); // Dodaj wiadomość do wyświetlenia
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>General</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Twoje imię/nick"
          value={username}
          onChange={(e) => setUsername(Cookies.get('user'))}
        />
        <input
          type="text"
          placeholder="Wpisz wiadomość"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Wyślij</button>
      </div>
    </div>
  );
};

export default FreeForum;