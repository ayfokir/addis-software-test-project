/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode; // Use React.ReactNode for any type of icon component
}

const colors = ['#FF6347', '#87CEEB', '#FFD700', '#98FB98']; // Example colors

const cardStyles = (color: string) => css`
  background-color: ${color}; /* Set background color based on the provided color */
  border: 1px solid ${color}; /* Set border color to match background color */
  border-radius: 12px; /* Increase border radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Increase box-shadow for elevation effect */
  padding: 15px; /* Increase padding for more space */
  text-align: center;
  transition: box-shadow 0.3s ease;
  width: 80%; /* Set width to cover 90% of the space */
  max-width: 270px; /* Set a maximum width for responsiveness */
  height: 120px; /* Set height for each card */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px; /* Add margin for gap between cards */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Adjust box-shadow on hover */
  }

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
  }
`;


const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  const index = Math.floor(Math.random() * colors.length); // Get a random index for the color
  const color = colors[index]; // Get the color based on the random index

  return (
    <div css={cardStyles(color)}>
      {icon} {/* Render the icon component */}
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
