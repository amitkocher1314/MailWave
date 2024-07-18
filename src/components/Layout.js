import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 drop-shadow-lg h-screen px-5 py-8 bg-blue-50 overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <img className="h-10 w-10 mb-2" src="https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_640.png" alt="MailWave Logo" />
          <h1 className="text-xl font-semibold text-gray-700">MailWave</h1>
        </div>
        <Link className="block border-2 border-blue-600 rounded px-2 py-2 mb-4 text-lg font-semibold text-center hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:outline-blue-600 focus:outline-offset-2" to="/composeEmail">Compose</Link>
        <ul className="mt-4 py-1 rounded">
          <li className="my-2">
            <Link className="block px-2 py-2 rounded-r-2xl border-l-4 border-transparent hover:bg-blue-100 hover:border-blue-600" to="/inbox">Inbox</Link>
          </li>
          <li className="my-2">
            <Link className="block px-2 py-2 rounded-r-2xl border-l-4 border-transparent hover:bg-blue-100 hover:border-blue-600" to="/sent">Sent</Link>
          </li>
          <li className="my-2">
            <Link className="block px-2 py-2 rounded-r-2xl border-l-4 border-transparent hover:bg-blue-100 hover:border-blue-600" to="/starred">Starred</Link>
          </li>
        </ul>
      </aside>

      <div className="flex-grow overflow-hidden">
        <header className="h-16 shadow-md bg-blue-50 flex items-center px-5">
          <button className="sm:hidden focus:outline-none mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="24">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </button>
          <div className="flex-grow flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">MailWave</h1>
            <img className="rounded-full w-8 h-8" src="/static/media/profile-icon.jpg" alt="Profile" />
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
