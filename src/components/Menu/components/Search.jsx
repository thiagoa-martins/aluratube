import React from "react";
import styled from "styled-components";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ mode }) => (mode ? "#383838" : "#e5e5e5")};
  max-width: 425px;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;

  input {
    width: 80%;
    padding: 4px 6px;
    border: none;
    outline: none;
    color: ${({ mode }) => (mode ? "#E5E5E5" : "#383838")};
    background-color: ${({ mode }) => (mode ? "#181818" : "#F9F9F9")};

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::placeholder {
      color: ${({ mode }) => (mode ? "#383838" : "#313131")};
      filter: brightness(2);
    }
  }

  button {
    flex: 1;
    cursor: pointer;
    border: none;
    background-color: ${({ mode }) => (mode ? "#383838" : "#E5E5E5")};
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    border-left: 1px solid ${({ mode }) => (mode ? "#383838" : "#e5e5e5")};
    width: 40px;
    height: 40px;
    @media (min-width: 600px) {
      width: 64px;
      height: 40px;
    }
  }
`;

export function Search({ filterValue, setFilterValue, mode }) {
  const searchValue = filterValue;
  const setSearchValue = setFilterValue;

  return (
    <StyledSearch mode={mode}>
      <input
        type="text"
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        placeholder="Buscar..."
      />
      <button>🔎</button>
    </StyledSearch>
  );
}
