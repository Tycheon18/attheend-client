import { useEffect } from "react";
import styles from "./BookList.module.css";
import BookListItem from "./BookListItem";


const BookList = ({ data }) => {
    useEffect(() => {
        console.log("📚 BookList에 전달된 data:", data);
    }, [data]);

    if(!data.length) return <p>검색 결과가 없습니다.</p>    

    return (
        <div>
            {data.map((book) => (

                <BookListItem key={book.isbn} book={book}/>
            ))}
        </div>
    );
}

export default BookList;