import React, { useState } from "react";

const IframePage = () => {
  const [showIframe, setShowIframe] = useState(false);

  const handleButtonClick = () => {
    setShowIframe(true);
  };
  const handleButtonCloseClick = () => {
    setShowIframe(false);
  };

  return (
    <div>
      <h1>Iframe Page</h1>
      <button onClick={handleButtonClick}>Show Iframe</button>
      <button onClick={handleButtonCloseClick}>Close iframe</button>
      {showIframe && (
        <iframe width="600" height="400">
          <p className="text-black">Hello world!</p>
        </iframe>
      )}
    </div>
  );
};

export default IframePage;
