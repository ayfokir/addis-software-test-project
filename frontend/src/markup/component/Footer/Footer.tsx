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
  margin-top: 20px; /* Add margin top */
`;

const Footer: React.FC = () => (
  <div css={footerStyles}>
    <p>&copy; 2024 My Music App. All rights reserved.</p>
  </div>
);

export default Footer;
