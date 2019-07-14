import React from 'react';

export const MessageBoxTypes = {
  login_error: { message: 'Please log in to continue' },
};

export const GenMsgBox = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('msgBox')) {
    return null;
  }

  const boxInfo = MessageBoxTypes[urlParams.get('msgBox').toLowerCase()];

  if (!boxInfo) {
    return null;
  }

  return (
    <div className="error-box">
      <p className="error-box-content">
        {boxInfo.message}
      </p>
    </div>
  );
};
