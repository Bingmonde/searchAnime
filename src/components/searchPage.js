import React, {useEffect, useRef, useState} from "react";
import  "../App.css";
import {fetchAnimebyTitleCategoryStatusPagination, fetchAnimeCategories, fetchAnimeStatus} from "../api/animeSearch";
import SearchResult from "./searchResult";


const SearchPage = () => {
    const [categories, setCategories] = useState([]);
    const [validStatus, setValidStatus] = useState([]);

    const [animeName, setAnimeName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [printList, setPrintList] = useState([]);
    const [morePages, setMorePages] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0);
    const [animeList, setAnimeList] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyPressDelete = (e) => {
            if (e.key === "Delete") {
                console.log('Delete key pressed');
                clearSearch()
                inputRef.current.focus();

            }
        }
        window.addEventListener('keydown', handleKeyPressDelete)
    }, [])

    // listen to Enter key
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter" && animeName !== "") {
                console.log('Enter key pressed');
                handleSearch()
            }
        }

        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    }, [animeName])

    // search categories and valid status
    useEffect(() => {
        const fetchCategories = async () => {
            const cates = await fetchAnimeCategories();
            setCategories(cates);
        }

        const fetchStatus = async () => {
            const status = await fetchAnimeStatus();
            setValidStatus(status);
        }
        fetchCategories();
        fetchStatus();
    }, []);


    useEffect(() => {
        if (animeName !== "")
            handleSearch()
    }, [category, status])


    const handleSearch = async () => {
        console.log(animeName, category, status, currentPage);
        console.log("searching...");
        if (animeName === "")
            return setErrMessage("Please enter anime name to search")

        if (currentPage!== 1 && !morePages)
            return

        const data = await fetchAnimebyTitleCategoryStatusPagination(animeName, category, status, currentPage)
        console.log('data:', data);
        setTotalResults(data.Page.pageInfo.total);
        // traitement des données
        const result = data.Page.media.map((anime) => {
            return {
                id: anime.id,
                title: anime.title.romaji,
                title_english: anime.title.english,
                title_japanese: anime.title.native,
                genre: anime.genres.join(', '),
                status: anime.status,
                description: anime.description ? anime.description : "No description",
                image_url: anime.coverImage.large,
            }
        })
        console.log('result:', result);
        if (result.length === 0)
            return setErrMessage("No result found for this search")

        const newAnimeList = [...animeList, ...result]
        setAnimeList(newAnimeList);

        // if has more pages
        if (data.Page.pageInfo.hasNextPage) {
            console.log('has more pages');
            setCurrentPage(currentPage+1)
            setMorePages(true);
        }
        else
            setMorePages(false);
    }

    const resetSearch = () => {
        setErrMessage("");
        setMorePages(false);
        setTotalResults(0);
        setAnimeList([]);
        setCurrentPage(1)
    }

    const clearSearch = () => {
        resetSearch()
        setAnimeName("");
        setCategory("");
        setStatus("");
    }


    const handleAddToPrint = (anime) => {
        console.log('anime:', anime);
        const newPrintList = [...printList, anime];
        setPrintList(newPrintList);
    }
    const handleRemoveFromPrint = (anime) => {
        const newPrintList = printList.filter((item) => item.id !== anime.id);
        console.log('newPrintList:', newPrintList);
        setPrintList(newPrintList);
    }

    const handleClearAllPrint = () => {
        setPrintList([]);
    }


    return (
        <div className="main-page">
            <div className="main-bg">
                <h1 className="mt-10 text-licorice-600">Welcom to anime search</h1>
                <div className="search-box">
                    <input ref={inputRef}
                        type="text"
                        placeholder="Title keyword"
                        value={animeName}
                        onChange={(e) => {
                            resetSearch()
                            setAnimeName(e.target.value.trim())
                        }}
                        onFocus={(e) => {
                            setErrMessage("")
                        }}
                    />
                    <select value={category}
                            onChange={(e) => {
                                resetSearch();
                                setCategory(e.target.value);
                            }}
                    >
                        <option value="">---Select a category---</option>
                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        value={status}
                        onChange={(e) => {
                            resetSearch();
                            setStatus(e.target.value);
                        }}
                    >
                        <option value="">---Select a status---</option>
                        {validStatus.map((status, index) => {
                            return (
                                <option key={index} value={status.name}>
                                    {status.name.split("_").join(" ").toLowerCase()}
                                </option>
                            );
                        })}
                    </select>

                    <button onClick={handleSearch}>Search <br/> [ENTER]</button>
                    <button className="button-search" onClick={clearSearch}
                    >Clear Search <br/> [DELETE]
                    </button>
                    <p className="text-baby_powder-500 font-bold mt-5">Key shortcut:
                        ENTER for search, DELETE for clear search</p>
                </div>
                {errMessage && <p className="text-giants_orange font-bold text-center mt-2">{errMessage}</p>}

                {animeList.length > 0 && <SearchResult result={totalResults} animeList={animeList} loadMore={morePages}
                                                       handleLoadMore={handleSearch}
                                                       handleAddToPrint={handleAddToPrint}
                                                         handleRemoveFromPrint={handleRemoveFromPrint}
                                                       handleClearAllPrint={handleClearAllPrint}
                                                         printList={printList}
                />}
            </div>
        </div>

    )
}


export default SearchPage;