/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const footerStyles = css`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  bottom: 0;
  width: 100%;
  position: fixed;
   z-index: 100; // Add this line
  margin-top: auto; /* Pushes footer to the bottom of the flex container */
`;

const Footer: React.FC = () => (
  <div css={footerStyles}>
    <p>&copy; 2024 My Music App. All rights reserved.</p>
  </div>
);

export default Footer;
