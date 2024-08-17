/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for routing

const headerStyles = css`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between; /* Space around the content */
  align-items: center;
  position: sticky; /* Make the header sticky */
  top: 0; /* Stick to the top of the viewport */
`;

const titleStyles = css`
  margin: 0;
  text-decoration: none; /* Remove underline when used as a link */
  color: #fff;
  font-weight: 400; /* Medium font weight */
  font-size: 24px; /* Default font size */
  
  @media (max-width: 768px) {
    font-size: 20px; /* Font size for tablets and small desktops */
  }

  @media (max-width: 480px) {
    font-size: 16px; /* Font size for mobile devices */
  }
`;

const buttonStyles = css`
  background-color: #555;
  color: #fff;
  border: none;
  padding: 12px 35px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none; /* Remove underline when used as a link */
`;

const Header: React.FC = () => {
  return (
    <div css={headerStyles}>
      <Link to = "/" css={titleStyles}>
        <h1 css={titleStyles}>My Music App</h1>
      </Link>
      <Link to="/statistics" css={buttonStyles}>Statistics</Link>
    </div>
  );
};

export default Header;
