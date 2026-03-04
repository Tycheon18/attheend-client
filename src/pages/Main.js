import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";

const Main = () => {
    const navigate = useNavigate();

    const handleSearch = async ({ category, query }) => {
        if (!query?.trim()) return;
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
