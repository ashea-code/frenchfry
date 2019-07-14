import React from 'react';

export const MessageBoxTypes = {
  login_required_error: { message: 'Please log in to continue.' },
  login_submit_error: { message: 'Sorry, something went wrong. Try again.' },
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
