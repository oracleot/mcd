import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatWindowInterface } from '../interfaces';
import Bot from '../svgs/bot.svg';
import { postData } from '../utils/';

export default function ChatWindow({
  title,
  botIcon = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
  serverURL,
  session_id,
  chats,
  updateChats,
  width = 300,
  height = 400,
}: ChatWindowInterface) {
  const [botResponse, setBotResponse] = useState('');
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      updateChats([...chats, { text: e.currentTarget.value, speaker: 'user' }]);
      postData(serverURL || 'https://kpfm2b.sse.codesandbox.io', {
        session_id,
        user_id: uuidv4(),
        text: e.currentTarget.value,
      })
        .then(async (data) => {
          if (data) {
            const {
              nlu: { response },
            } = data;
            setBotResponse(response);
          }
        })
        .catch((err) => console.log(err));
      e.currentTarget.value = '';
    }
  };
  useEffect(() => {
    if (botResponse) {
      updateChats([...chats, { text: '...', speaker: 'bot' }]);
      setTimeout(() => {
        updateChats([...chats, { text: botResponse, speaker: 'bot' }]);
      }, 1000);
    }
  }, [botResponse]);
  // START -> Autoscroll Chats Window
  const AutoScrollConversations = () => {
    const containerRef = useRef();
    useEffect(() => containerRef.current.scrollIntoView());
    return <div style={{ width: 350 }} ref={containerRef} />;
  };
  // Autoscroll Chats Window -> END!
  return (
    <div className="chat-container" style={{ width }}>
      <div className="bot-information text-center">
        <h3>
          <img src={Bot} width={20} /> {title}
        </h3>
      </div>
      <div id="chat-window" style={{ height }}>
        {chats?.map((item, index) => (
          <div
            key={index}
            style={{
              borderRadius: 20,
              margin: '5px 15px',
              textAlign: 'left',
              position: 'relative',
              alignSelf: item.speaker === 'bot' ? 'start' : 'end',
            }}
          >
            <span style={{ display: 'inline-block', marginRight: 5 }}>
              {item.speaker === 'bot' ? (
                <img
                  src={
                    botIcon === ''
                      ? 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png'
                      : botIcon
                  }
                  width={25}
                />
              ) : null}
            </span>
            <span
              style={{
                background: item.speaker === 'bot' ? 'aliceblue' : '#f2f2f1',
                padding: 8,
                display: 'inline-block',
                maxWidth: 220,
                borderRadius:
                  item.speaker === 'bot'
                    ? '2px 12px 12px 12px'
                    : '12px 2px 12px 12px',
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
        <AutoScrollConversations />
      </div>
      <div className="chat-box-container">
        <input
          className="chat-box"
          placeholder="Type your message"
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => alert('launch microphone')}>🎙️</button>
      </div>
    </div>
  );
}
