import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function EmailBody({ email, onMarkFavorite }) {
  const [body, setBody] = useState('');

  useEffect(() => {
    fetchEmailBody();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const fetchEmailBody = async () => {
    const response = await axios.get(
      `https://flipkart-email-mock.now.sh/?id=${email.id}`
    );
    setBody(response.data.body);
  };

  return (
    <section className="w-[60%] bg-stone-50 mx-4 border rounded-lg shadow">
      <header className="mb-4 px-8 pt-8 flex relative">
        <span className="w-10 h-10 accent text-white rounded-full flex justify-center items-center absolute left-[20px]">
            Y
        </span>
        <div className='w-full flex justify-between'>
          <h2 className="text-2xl font-bold px-8">{email.subject}</h2>
          <button
            className="accent text-white px-[10px] rounded-full hover:accent"
            onClick={() => onMarkFavorite(email.id)}
          >
            Mark as Favorite
          </button>
        </div>
      </header>
      <time className="text-sm text-gray-500 px-16">
          {new Date(email.date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
      </time>
      <div className="mt-4 mb-4 px-16" dangerouslySetInnerHTML={{__html: body}}></div>
    </section>
  );
}

export default EmailBody;
