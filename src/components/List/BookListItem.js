import styles from "./BookListItem.module.css"

const BookListItem = ({ book }) => {

    return (
        <article className={styles.BookListItem}>
            <div className={styles.thumbnail_wrapper}>
                <img src={book.thumbnail} alt={`표지: ${book.title}`} />
            </div>
            <div className={styles.title_wrapper}>
                {book.title}
            </div>
            <div className={styles.authros_wrapper}>
                {book.authors.join(", ")}
            </div>
        </article>
    )
}

export default BookListItem;