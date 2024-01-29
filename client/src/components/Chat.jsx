// import React, { useState, useEffect } from 'react';
// import mqtt from 'mqtt';
// import axios from 'axios';
// import Cookies from 'js-cookie';


// const Chat = ({ selectedChannel }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
// //  const mqttServer = 'ws://g51ea156.ala.us-east-1.emqxsl.com'
// //  const mqttClient = mqtt.connect(mqttServer)
// //   useEffect(() => {
// //     mqttClient.subscribe(selectedChannel);

// //     mqttClient.on('message', (topic, message) => {
// //       setComments(prevComments => [...prevComments, { channel: topic, content: message.toString() }]);
// //     });

// //     return () => {
// //       mqttClient.end();
// //     };
// //   }, [selectedChannel]);

  
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (newComment.trim() === '') return;

//     const response = await axios.post('https://localhost:3000/comments', {
//       user: Cookies.get('user'),
//       content: newComment,
//       channel: selectedChannel
//     });

//     console.log(response.data.message);
//     setNewComment('');
//   };

//   return (
//     <div>
//       <h2>{selectedChannel}</h2>
//       <div>
//         {comments.map((comment, index) => (
//           <div key={index}>
//             <strong>{comment.channel}:</strong> {comment.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleCommentSubmit}>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Type your comment..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;