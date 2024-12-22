// Logo.tsx
import React, { useEffect, useState } from 'react';

const Logo: React.FC<{ onFadeOut: () => void }> = ({ onFadeOut }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1); // State for opacity

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Set visible to false after a delay
      onFadeOut();
    }, 5000); // Adjust the time as needed for how long the logo should be visible

    return () => clearTimeout(timer);
  }, [onFadeOut]);

  useEffect(() => {
    if (!visible) {
      // Start dissolving effect
      const dissolveTimer = setInterval(() => {
        setOpacity(prev => {
          if (prev <= 0) {
            clearInterval(dissolveTimer);
            return 0;
          }
          return prev - 0.05; // Decrease opacity
        });
      }, 50); // Adjust the speed of the dissolve effect

      return () => clearInterval(dissolveTimer);
    }
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 z-50`} // Ensure z-50 is set
      style={{ opacity }} // Set the opacity dynamically
    >
      <img src="/caonabo_logo_nbg.png" alt="Logo" className="w-1/4 h-auto" />
    </div>
  );
};

export default Logo;