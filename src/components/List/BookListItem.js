import styles from "./BookListItem.module.css"
import "./BookList.module.css";

const BookListItem = ({ book }) => {
    
    const content = book.contents;
    const length = content.length;
    console.log(length);

    return (
        <article className={styles.BookListItem}>
            <div className={styles.thumbnail_wrapper}>
                <img className={styles.cover} src={book.thumbnail} alt={`표지: ${book.title}`} />
            </div>
            <div>
                <h1 className={styles.title}>
                    {book.title}
                </h1>
                <h2 className={styles.author}>
                    {book.authors.join(", ")}
                </h2>
                <p>
                    {book.contents.slice(0, 150) + "..."}
                </p>
            </div>

        </article>
    )
}

export default BookListItem;