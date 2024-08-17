import React from "react";
import styled from "@emotion/styled";

type TableProps = {
  data: Array<{ [key: string]: any }>;
  columns: Array<{ header: string; accessor: string }>;
};

const StyledHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -24px
`;

const StyledHeading = styled.h3`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 70px;
`;

const StyledTableContainer = styled.div`
  width: 100%; /* Ensures it takes the full width of the parent container */
  overflow-x: auto;
  padding-right: 50px;
  flex: 1; /* Ensures it takes the full height of the parent container */
  max-height: 539px; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Add scrollbar when content exceeds max-height */

  @media (max-width: 1280px) {
    padding-right: 50px;
    padding-left: 50px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const StatisticsTable: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <StyledTableContainer>
      <StyledHeadingContainer>
        <StyledHeading>Number of songs per Album</StyledHeading>
      </StyledHeadingContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <StyledTh key={index}>{column.header}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <StyledTd key={colIndex}>{row[column.accessor]}</StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default StatisticsTable;
