import React, {useState} from "react";
import "../App.css";
import "./animeDetail.css";
import "./modal.css"
import {AnimeDetail} from "./animeDetail";
import Modal from "./modal";
import {fetchAnimebyId, fetchAnimeEpisodes} from "../api/animeSearch";
import {MyDocuDOMWithList} from "./myDocu";


const SearchResult = ({ result, animeList, loadMore, handleLoadMore, printList, handleAddToPrint, handleRemoveFromPrint, handleClearAllPrint }) => {

    const [animeDetail, setAnimeDetail] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () =>  setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const [isModalOpenPrint, setIsModalOpenPrint] = useState(false);
    const openModalPrint = () =>  setIsModalOpenPrint(true);
    const closeModalPrint = () => setIsModalOpenPrint(false);

    const [showPreview, setShowPreview] = useState(false);

    const checkDetail = async (animeId) => {
        console.log('checkDetail:', animeId);
        const data = await fetchAnimebyId(animeId);
        console.log('anime data:', data);
        const eposide = await fetchAnimeEpisodes(animeId);
        console.log('eposide:', eposide);
        setAnimeDetail(data);
        openModal();
    }

    const checkPrintStatus = (anime) => {
        return printList.some((item) => item.id === anime.id)
    }


    const handlePreview = () => {
        setShowPreview(true);
        openModalPrint();
        console.log('printList:', printList);
    }

    const getTitles = () => {
        const titles = printList.map((item) => item.title);
        return titles.join("_");
    }

    return (
        <div className="main-page">
            <h2>{result > 50 ? "Plus de 50 " : result} search results</h2>
            {printList.length > 0 &&
                <div className="self-center">
                    <button className="w-48 bg-giants_orange-800" onClick={handlePreview}>Print selected animes</button>
                    <button className="w-48 bg-giants_orange-600" onClick={handleClearAllPrint}>Clear all print</button>
                </div>
            }
            {result > 100 && <p style={{textAlign: "center"}}>We recommend you adding criteria to refine your search results </p>}
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Genres</th>
                    <th>Status</th>
                    <th>To print</th>
                </tr>
                </thead>
                <tbody>
                {
                    animeList.map(
                        (anime, index) => {
                            return (
                                <tr key={anime.id}>
                                    <td>{index+1}</td>
                                    <td>
                                        <a href="" onClick={(e) => {
                                            e.preventDefault()
                                            checkDetail(anime.id)
                                        }}>
                                            {anime.title}</a>
                                    </td>
                                    <td>{anime.genre}</td>
                                    <td>{anime.status?.toLowerCase().split("_").join(" ")}</td>
                                    <td className="checkbox">

                                        {checkPrintStatus(anime) && <button className="button-remove" onClick={() => handleRemoveFromPrint(anime)}>Remove</button>}
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>
            <div className="button-center">
                {loadMore && <button onClick={handleLoadMore}> Load more</button>}
            </div>


            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {animeDetail &&
                        <AnimeDetail detail={animeDetail} addToPrint={handleAddToPrint} removeFromPrint={handleRemoveFromPrint} checkPrintStatus={checkPrintStatus}/>
                    }
                </Modal>
                <Modal isOpen={isModalOpenPrint} onClose={closeModalPrint}>
                    {showPreview && <MyDocuDOMWithList animeList={printList} showDownload="true"/>}
                </Modal>
            </div>
        </div>
    );
}

export default SearchResult;