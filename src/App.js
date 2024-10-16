import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmailList from './components/EmailList';
import EmailBody from './components/EmailBody';

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [favorites, setFavorites] = useState(new Set(JSON.parse(localStorage.getItem('favorites')) || []));
  const [readEmails, setReadEmails] = useState(new Set(JSON.parse(localStorage.getItem('readEmails')) || []));
  const [filter, setFilter] = useState('unread');

  useEffect(() => {
    fetchEmails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    localStorage.setItem('readEmails', JSON.stringify(Array.from(readEmails)));
  }, [favorites, readEmails]);

  const fetchEmails = async (page) => {
    const response = await axios.get(`https://flipkart-email-mock.now.sh`);
    const emailsWithFlags = response.data.list.map((email) => ({
      ...email,
      read: readEmails.has(email.id),
    }));
    setEmails(emailsWithFlags);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markEmailAsRead(email.id);
  };

  const markEmailAsFavorite = (id) => {
    setFavorites((prev) => new Set(prev).add(id));
  };

  const markEmailAsRead = (id) => {
    setReadEmails((prev) => new Set(prev).add(id));
    setEmails((prevEmails) =>
      prevEmails.map((email) => (email.id === id ? { ...email, read: true } : email))
    );
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === 'favorites') return favorites.has(email.id);
    if (filter === 'read') return email.read;
    if (filter === 'unread') return !email.read;
    return true;
  });

  return (
    <div className="flex flex-col items-center font-sans">
      <div className='flex mt-4 justify-start w-full pl-8'>
      <div>
        Filter By : 
      </div>
      <div className="mb-4">
        <span className={`p-1 cursor-pointer`} onClick={() => setFilter('read')}>
          <span className={`${filter === "read" ? 'px-2 py-1 bg-gray-200 rounded-full' : 'px-2 py-1'}`}>Read</span>
        </span>
        <span className={`p-1 cursor-pointer`} onClick={() => setFilter('unread')}>
          <span className={`${filter === "unread" ? 'px-2 py-1 bg-gray-200 rounded-full' : 'px-2 py-1'}`}>Unread</span>
        </span>
        <span className={`p-1 cursor-pointer`} onClick={() => setFilter('favorites')}>
          <span className={`${filter === "favorites" ? 'px-2 py-1 bg-gray-200 rounded-full' : 'px-2 py-1'}`}>Favorites</span>
        </span>
      </div>
      </div>

      <div className="flex w-full mt-4">
        <EmailList emails={filteredEmails} onEmailClick={handleEmailClick} />
        {selectedEmail && (
          <EmailBody
            email={selectedEmail}
            onMarkFavorite={markEmailAsFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default App;
