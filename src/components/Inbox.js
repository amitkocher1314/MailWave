import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../store/messagesReducer';

const Inbox = () => {
  const dispatch = useDispatch();
  const { messages, unreadCount } = useSelector(state => state.messages);

  useEffect(() => {
    let intervalId;

    const fetchInboxEmails = async () => {
      try {
        const response = await fetch("https://authentication-mailwave-default-rtdb.firebaseio.com/emails.json");
        if (!response.ok) {
          throw new Error("Failed to fetch inbox emails");
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
          const userEmail = localStorage.getItem('userEmail');
          const filteredEmails = Object.entries(data).map(([key, email]) => ({
            id: key,
            ...email,
            read: email.read || false,
          })).filter(email => email.to === userEmail);
          dispatch(setMessages(filteredEmails));
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    // Initial fetch
    fetchInboxEmails();

    // Polling every 2 seconds
    intervalId = setInterval(fetchInboxEmails, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      <p className="text-right text-gray-600">Unread messages: {unreadCount}</p>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Your inbox is empty.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(email => (
            <Link key={email.id} to={`/inbox/${email.id}`} className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">{email.sender}</p>
                <p className="text-xs text-gray-400">{new Date(email.timestamp).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                {!email.read && <span className="mr-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>}
                <p className="text-lg font-semibold mb-1">{email.subject}</p>
              </div>
              <p className="text-gray-700">{email.body.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
