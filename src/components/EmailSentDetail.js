import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EmailSentDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await fetch(`https://authentication-mailwave-default-rtdb.firebaseio.com/emails/${id}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch email details");
        }
        const data = await response.json();
        setEmail(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`https://authentication-mailwave-default-rtdb.firebaseio.com/emails/${id}.json`, {
        method: 'DELETE',
      });
      history.push('/sent');
    } catch (error) {
      setError("Failed to delete email");
    }
  };

  const renderBlocks = (blocks) => {
    return blocks.map(block => {
      switch (block.type) {
        case 'unstyled':
          return <p key={block.key}>{block.text}</p>;
        // Add more cases for different block types if needed
        default:
          return <p key={block.key}>{block.text}</p>;
      }
    });
  };

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

  if (!email) {
    return <p className="text-center py-4">Email not found.</p>;
  }

  // Parse the JSON body
  let bodyContent;
  try {
    const bodyObj = JSON.parse(email.body);
    bodyContent = renderBlocks(bodyObj.blocks);
  } catch (error) {
    bodyContent = <p>Error parsing email body.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-4">
        <button onClick={() => history.goBack()} className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={handleDelete} className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{email.subject}</h2>
        <p className="text-sm text-gray-600 mb-4">&lt;{email.to}&gt;</p>
        <div className="text-gray-700 whitespace-pre-wrap">{bodyContent}</div>
      </div>
    </div>
  );
};

export default EmailSentDetail;
