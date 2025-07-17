import React from "react";
import SearchBar from './SearchBar';


const SearchBook = ({ setResults }) => {  
    const handleSearch = async ({ category , query }) => {
        if(!query.trim()) return;
        const params = new URLSearchParams({ query });
        if( category !== "all" ) params.append("target", category);
    

        const res = await fetch(
            `https://dapi.kakao.com/v3/search/book?${params.toString()}`,
            {
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
                },
            }
        );

        if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();


        console.log("kakao API response:", data.documents);
        setResults(data.documents);
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}

export default SearchBook;