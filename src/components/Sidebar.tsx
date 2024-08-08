import React, { useState, useEffect } from 'react';
import '../assets/scss/sidebar.scss';

const Sidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  console.log({isMobileView});
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`sidebar ${false ? 'hidden' : ''}`}>
      {/* Sidebar content goes here */}
      <div className="sidebar-item">
        <h3>Sidebar Item 1</h3>
        <p>This is the first item in the sidebar.</p>
      </div>
      <div className="sidebar-item">
        <h3>Sidebar Item 2</h3>
        <p>This is the second item in the sidebar.</p>
      </div>
      {/* Add more sidebar items as needed */}
    </div>
  );
};

export default Sidebar;