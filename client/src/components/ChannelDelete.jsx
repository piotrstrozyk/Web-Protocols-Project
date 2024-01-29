
import React, { useState } from 'react';
import axios from 'axios';

const ChannelList = () => {
  const [searchPattern, setSearchPattern] = useState('');

  const handleDeleteChannel = async () => {
    try {
      const response = await axios.delete(`/api/channels/${searchPattern}`);
      console.log(response.data); // Możesz obsłużyć odpowiedź z serwera
    } catch (error) {
      console.error('Błąd usuwania kanału:', searchPattern);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Wzorzec nazwy kanału"
        value={searchPattern}
        onChange={(e) => setSearchPattern(e.target.value)}
      />
      <button onClick={handleDeleteChannel}>Usuń kanał</button>
    </div>
  );
};

export default ChannelList;