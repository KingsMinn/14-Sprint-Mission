import styled from "styled-components";

const List = styled.ul`
  display: flex;
  width: 130px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 100%;
  border-radius: 12px;
  border: 1px solid var(--Cool-Gray-200, #e5e7eb);
  background: #fff;
  margin-top: 8px;
  cursor: pointer;
  z-index: 2;
  overflow: hidden;

  li {
    width: 100%;
    height: 42px;
    list-style: none;
    text-align: center;
    line-height: 42px;
    transition: all 0.05s ease-out;

    &:hover {
      background: #f7f7f7;
    }

    &:first-child {
      border-bottom: 1px solid var(--Cool-Gray-200, #e5e7eb);
    }
  }
`;

function Selector({ options, setter, setterOptions, type }) {
  return (
    <List>
      {options.map((v, i) =>
        type === "select" ? (
          <li onClick={() => setter((prev) => !prev)}>{v}</li>
        ) : (
          <li onClick={() => setter(setterOptions[i])}>{v}</li>
        )
      )}
    </List>
  );
}

export default Selector;
