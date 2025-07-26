import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/Search/SearchBar";

const Main = () => {
    const navigate = useNavigate();

    const handleSearch = async ({ category, query }) => {
        if (!query?.trim()) return;
        
        // 검색 조건을 URL 파라미터로 Search 페이지로 전달
        const params = new URLSearchParams({ query });
        if (category !== "all") params.append("target", category);
        
        navigate(`/search?${params.toString()}`);
    };

    return (
        <div>
            <h2>메인 페이지</h2>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}

export default Main;