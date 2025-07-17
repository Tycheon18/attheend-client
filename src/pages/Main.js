import { useState } from "react";
import Layout from "../components/Layout/Layout";
import BookList from "../components/List/BookList";
import SearchBook from "../components/Search/SearchBook";

const Main = () => {
    const [results, setResults] = useState([]);

    return (
        <div>
            <h2>메인 페이지</h2>
            <SearchBook setResults={setResults} />
            <BookList data={results} />
        </div>
    );
}

export default Main;