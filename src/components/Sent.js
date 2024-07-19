import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sent = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await fetch("https://authentication-mailwave-default-rtdb.firebaseio.com/emails.json");
        if (!response.ok) {
          throw new Error("Failed to fetch sent emails");
        }
        const data = await response.json();
        console.log("sentbox" + data);
        if (data && typeof data === 'object') {
          const userEmail = localStorage.getItem('userEmail');
          const filteredEmails = Object.entries(data).filter(([key, email]) => email.sender === userEmail);
          setSentEmails(filteredEmails);
        } else {
          setSentEmails([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSentEmails();
  }, []);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-600">Error fetching sent emails: {error}</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Sent Emails</h2>
      {sentEmails.length === 0 ? (
        <p className="text-center text-gray-500">Your Sent tab is empty.</p>
      ) : (
        <div className="space-y-4">
          {sentEmails.map(([key, email]) => (
          <Link key={key} to={`/sent/${key}`} className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">{email.to}</p>
            <p className="text-xs text-gray-400">{new Date(email.timestamp).toLocaleDateString()}</p>
          </div>
          <p className="text-lg font-semibold mb-1">{email.subject}</p>
          <p className="text-gray-700">{email.body.text}</p>
        </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sent;
