import Layout from "../components/Layout/Layout";
import BookList from "../components/List/BookList";
import BookSearch from "../components/Search/BookSearch";

const Main = () => {
    return (
        <div>
            <h2>메인 페이지</h2>
            <BookSearch />
            <BookList />
        </div>
    );
}

export default Main;