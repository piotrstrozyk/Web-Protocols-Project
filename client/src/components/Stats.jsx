import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {
  const [channelsCount, setChannelsCount] = useState(0);

  useEffect(() => {
    // Pobierz ilość kanałów z serwera Express
    axios.get('http://localhost:3001/channels-count')
      .then(response => {
        setChannelsCount(response.data.count);
      })
      .catch(error => {
        console.error('Błąd pobierania danych:', error);
      });
  }, []);

  return (
    <div>
      <h1>Liczba kanałów w bazie danych: {channelsCount}</h1>
    </div>
  );
}

export default Stats;