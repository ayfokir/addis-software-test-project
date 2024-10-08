/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { Song } from '../../../utils/Types';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import styled from "@emotion/styled";
import AddSongForm from '../Main/AddSong';



const tableWrrapper = css`
margin-bottom: 90px;
`


const StyledHeadingContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding:  0 15px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const StyledHeading = styled.h3`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 16px 0
`;

const StyledButton = styled.button`
  font-family: "Arial", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  padding: 11px 16px;
  cursor: pointer;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
   z-index: 1000; // Add this line
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  z-index: 1001; // Add this line
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// Define props interface
interface BookTableProps {
    data: Song[];
    columns: MRT_ColumnDef<Song>[];
}

const NewTable: React.FC<BookTableProps> = ({ data, columns }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCreateSongsClick = () => {
      setIsPopupOpen(true);
    };
    const handlePopupBackgroundClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
        if (e.target === e.currentTarget) {
          setIsPopupOpen(false);
          // setIsEditPopupOpen(false);
        }
      };

  const table = useMaterialReactTable({
    columns,
    data,
    
});

  return (
    <div >
        <StyledHeadingContainer>
        <StyledHeading>Songs Table</StyledHeading>
        <StyledButton onClick={handleCreateSongsClick}>
          Create Song
        </StyledButton>
      </StyledHeadingContainer>
      {/* <h3 css={h1Styles}>Songs Table</h3> */}
      <div css={tableWrrapper}>
      <MaterialReactTable table={table} />
      </div>

      {isPopupOpen && (
        <PopupBackground onClick={handlePopupBackgroundClick}>
          <PopupContent>
            <CloseButton onClick={() => setIsPopupOpen(false)}>
              &#10005;
            </CloseButton>
            <AddSongForm onAddSong={() => setIsPopupOpen(false)} />
          </PopupContent>
        </PopupBackground>
      )}
    
    </div>
  );
};

export default NewTable;
