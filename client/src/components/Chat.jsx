import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import axios from 'axios';

const Chat = ({ selectedChannel }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const mqttServer = 'ws://broker.emqx.io:8084/mqtt'
  const mqttClient = mqtt.connect(mqttServer)
  useEffect(() => {
    mqttClient.subscribe(selectedChannel);

    mqttClient.on('message', (topic, message) => {
      setComments(prevComments => [...prevComments, { channel: topic, text: message.toString() }]);
    });

    return () => {
      mqttClient.end();
    };
  }, [selectedChannel]);

  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const response = await axios.post('http://localhost:3000/comments', {
      channel: selectedChannel,
      text: newComment,
    });

    console.log(response.data.message);
    setNewComment('');
  };

  return (
    <div>
      <h2>{selectedChannel}</h2>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.channel}:</strong> {comment.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;