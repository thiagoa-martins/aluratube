import config from "../../config.json";
import styled from "styled-components";

const StyledFavoriteCards = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  a {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;

    > span {
      font-size: 14px;
      font-weight: 400;
    }
  }

  img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

export function FavoriteCards({}) {
  const favorites = config["favorites-cards"];

  return (
    <StyledFavoriteCards>
      {favorites.map((card, index) => {
        return (
          <a key={index}>
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
