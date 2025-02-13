
import './App.css';
import {Route, Routes} from "react-router-dom";
import SearchPage from "./components/searchPage";
import {PdfGeneratorLongContent} from "./utils/pdfGeneratorLongContent";


function App() {

  return (
      <>
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/print-preview" element={<PdfGeneratorLongContent />} />
        </Routes>
      </>
  );
}

export default App;
