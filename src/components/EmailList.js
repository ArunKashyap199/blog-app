import React from 'react';

function trimString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
}

export function EmailList({ emails, onEmailClick }) {
  return (
    <section className="w-[40%] px-8">
      {emails.map((email) => (
        <article
          key={email.id}
          className={`min-h-[130px] cursor-pointer mb-6 flex items-center border rounded-lg shadow ${
            email.read ? 'bg-gray-100' : 'bg-white'
          } rounded hover:bg-gray-200`}
          onClick={() => onEmailClick(email)}
        >
          <div className="ml-2 w-10 h-10 accent text-white rounded-full flex justify-center items-center">
            Y
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-sm text-gray-500">From : <span className='font-bold'>{email.from.name} {"<" + email.from.email + ">"}</span></p>
            <p className="text-sm text-gray-500">Subject :  <span className='font-bold'>{email.subject}</span></p>
            <p className="text-sm text-gray-500">{trimString(email.short_description, 50)}</p>
            <time className="block text-xs text-gray-400 mt-1">
              {new Date(email.date).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </time>
          </div>
        </article>
      ))}
    </section>
  );
}

export default EmailList;
