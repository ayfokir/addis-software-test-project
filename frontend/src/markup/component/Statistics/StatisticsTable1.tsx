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
`;

const StyledHeading = styled.h3`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const StyledTableContainer = styled.div`
  width: calc(100% - 140px); /* Adjusted width */
  overflow-x: auto;
  padding-right: 70px;
  padding-left: 70px;
  margin: auto;
  flex: 1; /* Ensures it takes the full height of the parent container */
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
        <StyledHeading>Albums and Songs Count Per Artist</StyledHeading>
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
