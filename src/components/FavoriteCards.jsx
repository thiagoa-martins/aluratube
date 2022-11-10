import config from "../../config.json";
import styled from "styled-components";

const StyledFavoriteCards = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 32px;
  background-color: ${({ mode }) => (mode ? "#181818" : "#F9F9F9")};

  a {
    display: flex;
    flex-direction: column;
    text-align: center;
    text-decoration: none;
    gap: 8px;
    color: ${({ mode }) => (mode ? "#fff" : "#222222")};

    > span {
      font-size: 14px;
      font-weight: 400;
    }

    &:visited {
      color: ${({ mode }) => (mode ? "#fff" : "#222222")};
    }
  }

  img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  @media (max-width: 900px) {
    & {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

export function FavoriteCards({ mode }) {
  const favorites = config["favorites-cards"];

  return (
    <StyledFavoriteCards mode={mode}>
      {favorites.map((card, index) => {
        return (
          <a
            href={`https:///github.com/${card.github}`}
            target="_blank"
            key={index}
          >
            <img
              src={`https://github.com/${card.github}.png`}
              alt={card.github}
            />
            <span>@{card.github}</span>
          </a>
        );
      })}
    </StyledFavoriteCards>
  );
}
