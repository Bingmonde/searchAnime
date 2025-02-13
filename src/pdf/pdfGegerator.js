import {MyDocuAnimeList} from "./monDocuAnime";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";

export const PdfGegerator = ({animeList}) => {
    const fileName = animeList.map(anime => anime.title).join('_');

    return (
        <div className="pdf-container">
            <PDFDownloadLink document={<MyDocuAnimeList animeList={animeList}/>} fileName={fileName} className="flex">
                {({blob, url, loading, error}) => {
                    console.log('animeList before PDF:', animeList);
                    return loading
                        ? <div className="button-center">
                        <button className="w-48 bg-giants_orange-800"
                        >Generating
                        </button>
                        </div>
                        : <div className="button-center">
                        <button className="w-48 bg-giants_orange-800"
                        >Download
                        </button>
                    </div>
                }}

            </PDFDownloadLink>
            <br/>
        </div>
    )

}