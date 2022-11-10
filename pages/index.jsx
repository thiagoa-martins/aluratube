import React from "react";

import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

import CodingImage from "../src/assets/images/coding.jpg";
import { FavoriteCards } from "../src/components/FavoriteCards";

function HomePage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [mode, setMode] = React.useState(0);

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          mode={mode}
          setMode={setMode}
        />
        <Header link={CodingImage.src} mode={mode} setMode={setMode} />
        <Timeline
          searchValue={filterValue}
          playlists={config.playlists}
          mode={mode}
          setMode={setMode}
        />
        <Footer mode={mode} setMode={setMode} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ mode }) => (mode ? "#202020" : "#FFFFFF")};

  .banner {
    width: 100%;
    height: 230px;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;

    > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    > div {
      h2 {
        color: ${({ mode }) => (mode ? "#fff" : "#222222")};
      }

      p {
        color: ${({ mode }) => (mode ? "#383838" : "#313131")};
        font-weight: 400;
        filter: brightness(1.9);
      }
    }
  }
`;

function Header({ link, mode }) {
  return (
    <StyledHeader mode={mode}>
      <img className="banner" src={link} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>

          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, mode, ...props }) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline mode={mode}>
      {playlistNames.map((playlist) => {
        const videos = props.playlists[playlist];

        return (
          <section key={playlist}>
            <h2>{playlist}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a href={video.url} target="_blank" key={video.url}>
                      <img src={video.thumb} alt={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

const StyledFooter = styled.div`
  padding: 16px 32px;
  background-color: ${({ mode }) => (mode ? "#181818" : "#F9F9F9")};
  color: ${({ mode }) => (mode ? "#fff" : "#222222")};

  @media (max-width: 900px) {
    text-align: center
  }
`;

function Footer({ mode }) {
  return (
    <StyledFooter mode={mode} >
      <h2>AluraTubes Favoritos</h2>

      <FavoriteCards mode={mode} />
    </StyledFooter>
  );
}
