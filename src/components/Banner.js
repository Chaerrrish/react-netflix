import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import axios from '../api/axios';
import "./Banner.css"
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);
        //여러 영화 중 영화 하나의 ID를 가져오기
        const movieID =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ].id;
        //특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
        const {data: movieDetail} = await axios.get(`movie/${movieID}`, {
            params: {append_to_response: "videos"}
        });
        setMovie(movieDetail);
    }
    const trancate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    if (!isClicked) {
        return (
          <header
            className="banner"
            style={{
              backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
            }}
          >
            <div className="banner__contents">
                <h1 className="banner__title">{movie.title  || movie.name || movie.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => setIsClicked(true)}> Play </button>
                    <button className="banner__button info"> More Information </button>
                </div>
                <h1 className="banner__description">{trancate(movie?.overview, 200)}</h1>
            </div>
            <div className="banner--fadeBottom" />
          </header>
        );
        
    } else {
        return (
          <Container>
            <HomeContainer>
              <Iframe
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="autoplay; fullscreen"
              ></Iframe>
            </HomeContainer>
          </Container>
        );
    }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index:-1;
    opacity: 1;
    border: none;

    &::after{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%
        height: 100%
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

