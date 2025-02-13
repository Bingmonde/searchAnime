import React from "react";
import "./animeDetail.css";
import {PdfGegerator} from "../pdf/pdfGegerator";

export const MyDocuDOMWithList = (({ animeList, showDownload }) => {
    const titles = animeList.map((anime) => anime.title).join('_');

    return (
        <>
            <div >
                {showDownload && <PdfGegerator animeList={animeList}/>}
                {animeList.map((detail) => (
                    <div key={detail.id} className="anime-page">
                        <h1 className="title">{detail.title}</h1>
                        {detail.image_url &&
                            <img src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(detail.image_url)}`}
                                 alt={detail.title} className="anime-img"/>}
                        <div className="anime-detail">
                            <h4>English title: <span>{detail.title_english}</span></h4>
                            <h4>Native title: <span>{detail.title_japanese}</span></h4>
                            <h4>Synopsis: <span>{detail.description ? detail.description : 'None'}</span></h4>
                            <h4>Genres: <span>{detail.genre}</span></h4>
                            <h4>Status: <span>{detail.status.toLowerCase()}</span></h4>
                            <h4>Season: <span>{detail.season?.toLowerCase()}</span></h4>
                            <h4>Num total of episodes: <span>{detail.episodes}</span></h4>

                            {detail.episodes_info.length === 0 && <p>No information about episode detail.</p>}
                            <div className="episodes-container">
                                {detail.episodes_info.length > 0 && detail.episodes_info.map((episode, index) => (
                                    <div key={index} className="episode">
                                        <p>{episode.title.split('-')[0]}</p>
                                        <div className="episode-image-box">
                                            <img
                                                src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(episode.thumbnail)}`}
                                                alt={episode.title} className="episode-image"/>
                                        </div>
                                        <p>{episode.title.split('-')[1]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h4>Main characters</h4>
                        <div className={detail.characters[0]?.description?.length > 200 ? "char-print-box":"flex-container"}>
                            {detail.characters.map((character, index) => (
                                <div key={character.id} className={detail.characters[0]?.description?.length > 200 ?"char-detail" :"flex-item"}>
                                    <div className="flex flex-col">
                                        <div className="char-img-box">{character.image_url && <img
                                            src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(character.image_url)}`}
                                            alt={character.name} className="char-img"/>}</div>

                                        <h5>{character.name}</h5>
                                        <h5>{character.name_native}</h5>
                                    </div>

                                    {character.description ? <p className="text-start ps-2">{character.description}</p> :
                                        <p>No description</p>}
                                </div>
                            ))}
                        </div>
                        {detail.characters.length === 0 && <p>No information about characters</p>}
                        <div className="dividing"></div>
                        <div id="preview-pdf-box">

                        </div>

                    </div>
                ))}
            </div>
        </>
    );
});
