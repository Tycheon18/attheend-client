import styles from "./BookListItem.module.css"
import "./BookList.module.css";
import { useNavigate } from "react-router-dom";

const BookListItem = ({ book }) => {
    
    const content = book.contents;
    const length = content.length;
    const navigate = useNavigate();
    console.log(length);

    // 독후감 작성 함수
    const handleWriteReview = () => {
        // 검색 결과의 책 정보를 독후감 작성 페이지로 전달
        const bookData = {
            title: book.title,
            authors: book.authors,
            coverImage: book.thumbnail,
            content: '',
            rating: 5,
            readingDate: new Date().toISOString().split('T')[0]
        };
        
        // 세션 스토리지에 임시 데이터 저장
        sessionStorage.setItem('tempBookData', JSON.stringify(bookData));
        navigate('/new');
    };

    return (
        <article className={styles.BookListItem}>
            <div className={styles.thumbnail_wrapper}>
                <img 
                    className={styles.cover} 
                    src={book.thumbnail} 
                    alt={`표지: ${book.title}`}
                />
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.reviewButton}
                        onClick={handleWriteReview}
                        title="독후감 작성"
                    >
                        ✍️ 독후감 작성
                    </button>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                <div>
                    <h1 className={styles.title}>
                        {book.title}
                    </h1>
                    <h2 className={styles.author}>
                        {book.authors.join(", ")}
                    </h2>
                    <p className={styles.description}>
                        {book.contents.slice(0, 200) + (book.contents.length > 200 ? "..." : "")}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default BookListItem;