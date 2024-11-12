// Avatar.js
import React from 'react';
import './Avatar.css'; // Import any necessary CSS for styling

const Avatar = ({ firstName, lastName }) => {
  // Extract initials
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="avatar">
      {initials}
    </div>
  );
};

export default Avatar;
