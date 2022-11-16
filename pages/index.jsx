import React from "react";

import { createClient } from "@supabase/supabase-js";

import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/";
import { StyledTimeline } from "../src/components/Timeline";

import CodingImage from "../src/assets/images/coding.jpg";
import { FavoriteCards } from "../src/components/FavoriteCards";

const PROJECT_URL = "https://nmolqobbjkmzoagorcqn.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb2xxb2Jiamttem9hZ29yY3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1MjY1MTIsImV4cCI6MTk4NDEwMjUxMn0.8sRmHQQ-UE17lmXTeNmW4IHJnvUXugngj_nbnHJj7bw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    supabase
      .from("videos")
      .select("*")
      .then((response) => {
        const newPlaylists = { ...playlists };
        response.data.forEach((video) => {
          if (!newPlaylists[video.playlist]) newPlaylists[video.playlist] = [];
          newPlaylists[video.playlist].push(video);
        });

        setPlaylists(newPlaylists);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Header link={CodingImage.src} />
        <Timeline searchValue={filterValue} playlists={playlists} />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

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

  @media (max-width: 900px) {
    text-align: center;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <h2>AluraTubes Favoritos</h2>

      <FavoriteCards />
    </StyledFooter>
  );
}
