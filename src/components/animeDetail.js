import React, {useEffect, useState} from 'react';
import './animeDetail.css';


export const AnimeDetail = ({detail, addToPrint, removeFromPrint, checkPrintStatus}) => {


    const characterInfoMaxLength = 300;
    const maxEpisodesPerLoad = 10;
    const [chars, setChars] = useState([])
    const [currentEpisodes, setCurrentEpisodes] = useState(1)
    const [episodes, setEpisodes] = useState([])
    const [showButtonAddPrint, setShowButtonAddPrint] = useState(true)

    useEffect(() => {
        const charList = detail.characters.map((character) => {
            return {
                ...character,
                showMore: false
            }
        });
        if (detail)
            setChars(charList);
    }, []);
    const handleShowMore = (index) => {
        chars[index].showMore = !chars[index].showMore;
        setChars([...chars]);
    }

    useEffect(() => {
        checkPrintStatus(detail) ? setShowButtonAddPrint(false) : setShowButtonAddPrint(true)
    }, []);

    const loadEpisodes = () => {
        if (episodes.length >= detail.episodes_info.length)
            return
        const loadEpisodes = detail.episodes_info.slice((currentEpisodes - 1) * maxEpisodesPerLoad, currentEpisodes * maxEpisodesPerLoad)
        console.log('loadEpisodes:', loadEpisodes)
        setEpisodes([...episodes, ...loadEpisodes])
        setCurrentEpisodes(currentEpisodes + 1)
    }

    const hideEpisodes = () => {
        setEpisodes([])
        setCurrentEpisodes(1)
    }

    return (
        <div className="anime-page">
            {showButtonAddPrint && <button className="button-add-print" onClick={() => {
                addToPrint(detail)
                setShowButtonAddPrint(false)
            }}>Add to print</button>}
            {!showButtonAddPrint && <button className="button-remove-print" onClick={() => {
                removeFromPrint(detail)
                setShowButtonAddPrint(true)
            }}>Remove from print</button>}
            <h2>{detail.title}</h2>
            {detail.image_url && <img src={detail.image_url} alt={detail.title} className="anime-img"/>}
            <div className="anime-detail">
                <h4>English title: <span>{detail.title_english}</span></h4>
                <h4>Native title: <span>{detail.title_japanese}</span></h4>
                <h4>Synopsis:
                    <span dangerouslySetInnerHTML={{__html: detail.description ? detail.description : 'None'}}/>
                </h4>
                    {/*<h4>Synopsis: <span>{detail.description ? detail.description : 'None'}</span></h4>*/}
                <h4>Genres: <span>{detail.genre}</span></h4>
                <h4>Status: <span>{detail.status?.toLowerCase().split('_').join(' ')}</span></h4>
                <h4>Season: <span>{detail.season?.toLowerCase()}</span></h4>
                <h4>Num total of episodes: <span>{detail.episodes}</span></h4>
                    {detail.episodes_info.length == 0 && <p>No information about episode detail.</p>}
                <div className="episodes-container">
                    {episodes.length > 0 &&
                        episodes.map((episode, index) => {
                            return (
                                <div key={index} className="episode">
                                    {/*<p>{episode.title}</p>*/}
                                    <p>{episode.title.split('-')[0]}</p>
                                    <div className="episode-image-box">
                                        <img src={episode.thumbnail} alt={episode.title} className="episode-image"/>
                                    </div>
                                    <p>{episode.title.split('-')[1]}</p>
                                </div>)
                        })
                    }
                </div>
                    {detail.episodes_info.length > 0 && <button onClick={loadEpisodes}>Show episodes detail</button>}
                    {currentEpisodes > 1 && <button onClick={hideEpisodes}>hide episodes detail</button>}

            </div>


            <h4>Main characters</h4>
            <div className="flex-container">
                {chars.map((character, index) => {
                    return (
                        <div key={character.id} className="flex-item">
                            {character.image_url &&
                                <img src={character.image_url} alt={character.name}
                                     className="char-img"/>}
                            <h4>{character.name}</h4>
                            <h4>{character.name_native}</h4>
                            {
                                character.description
                                ? character.description?.length > characterInfoMaxLength
                                    ? <p>{character.showMore ? character.description : character.description.substring(0, characterInfoMaxLength) + '...'}
                                        <a onClick={(e) =>
                                        {
                                            handleShowMore(index)}}>Show {character.showMore ? 'less' : 'more'}</a>
                                    </p>
                                    : <p>{character.description}</p>
                                : <p>No description</p>
                            }
                        </div>
                    )
                })}
            </div>

            {
                detail.characters.length == 0 && <p>No information about characters</p>
            }

        </div>

    )
}

export default AnimeDetail;