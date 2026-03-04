import { useNavigate } from 'react-router-dom';
import { PenLine, BookOpen } from 'lucide-react';

const BookListItem = ({ book }) => {
    const navigate = useNavigate();

    const handleWriteReview = () => {
        const bookData = {
            title: book.title,
            authors: book.authors,
            coverImage: book.thumbnail,
            content: '',
            rating: 5,
            readingDate: new Date().toISOString().split('T')[0],
        };
        sessionStorage.setItem('tempBookData', JSON.stringify(bookData));
        navigate('/new');
    };

    const description = book.contents
        ? book.contents.slice(0, 180) + (book.contents.length > 180 ? '…' : '')
        : '책 소개가 없습니다.';

    return (
        <article className="flex gap-5 p-5 bg-white border border-linen-300 rounded-lg hover:border-ink-300 hover:shadow-md transition-all duration-200 group">

            {/* 표지 이미지 */}
            <div className="flex-shrink-0 relative">
                {book.thumbnail ? (
                    <img
                        src={book.thumbnail}
                        alt={`표지: ${book.title}`}
                        className="w-20 h-28 object-cover rounded shadow-sm"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-20 h-28 bg-gradient-to-b from-linen-200 to-linen-300 rounded flex items-center justify-center">
                        <BookOpen className="w-7 h-7 text-charcoal-400" />
                    </div>
                )}
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex-1">
                    <h2 className="font-serif text-base font-semibold text-charcoal-900 leading-snug mb-1 truncate">
                        {book.title}
                    </h2>
                    <p className="text-sm text-charcoal-600 mb-1">
                        {book.authors?.join(', ')}
                        {book.publisher && (
                            <span className="text-charcoal-400"> · {book.publisher}</span>
                        )}
                        {book.datetime && (
                            <span className="text-charcoal-400"> · {book.datetime.slice(0, 4)}</span>
                        )}
                    </p>
                    <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3 mt-2">
                        {description}
                    </p>
                </div>

                {/* 하단 액션 */}
                <div className="mt-3 flex items-center gap-3">
                    <button
                        onClick={handleWriteReview}
                        className="btn-ink text-xs py-1.5 px-4"
                    >
                        <PenLine className="w-3.5 h-3.5" />
                        독후감 작성
                    </button>
                    {book.isbn && (
                        <span className="text-xs text-charcoal-400 font-mono">
                            ISBN {book.isbn.split(' ')[0]}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default BookListItem;
