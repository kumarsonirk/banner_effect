import React from 'react';

const Header = ({ showProfile = true }) => {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 sm:px-12 md:px-16 py-8"
    >
      <img src="/logo.svg" alt="QiRA" className="h-7 sm:h-8 w-auto" />
      {showProfile && (
        <button className="pointer-events-auto p-1" style={{ color: '#85523F' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </button>
      )}
    </header>
  );
};

export default Header;
