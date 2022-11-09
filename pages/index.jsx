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
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Header link={CodingImage.src} />
        <Timeline searchValue={filterValue} playlists={config.playlists} />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
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
  }
`;

function Header({ link }) {
  return (
    <StyledHeader>
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

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlist, index) => {
        const videos = props.playlists[playlist];

        return (
          <section key={index}>
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
                    <a href={video.url} key={video.url}>
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
`;

function Footer() {
  return (
    <StyledFooter>
      <h2>AluraTubes Favoritos</h2>

      <FavoriteCards />
    </StyledFooter>
  );
}
