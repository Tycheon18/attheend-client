import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookDispatchContext } from '../../App';
import { Pencil, Trash2, Star, Calendar, BookOpen } from 'lucide-react';

const StarRating = ({ rating, max = 5 }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < rating ? 'fill-spine-500 text-spine-500' : 'text-linen-300'}`}
            />
        ))}
    </div>
);

const ReviewItem = ({ book }) => {
    const navigate = useNavigate();
    const dispatch = useContext(BookDispatchContext);

    const handleEdit = () => navigate(`/edit/${book.id}`);
    const handleDelete = () => {
        if (window.confirm('\uc815\ub9d0\ub85c \uc774 \ub3c5\ud6c4\uac10\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?')) {
            dispatch({ type: 'DELETE', target: book });
        }
    };

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <div
            className="flex flex-col bg-white border border-linen-300 rounded-xl overflow-hidden hover:border-ink-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={handleEdit}
        >
            {/* \ud45c\uc9c0 \uc774\ubbf8\uc9c0 - object-contain\uc73c\ub85c \ud45c\uc9c0 \uc804\uccb4 \ud45c\uc2dc */}
            <div className="h-56 bg-gradient-to-b from-linen-100 to-linen-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {book.coverImage ? (
                    <img
                        src={book.coverImage}
                        alt={`${book.title} \ud45c\uc9c0`}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 py-2"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <BookOpen className="w-10 h-10 text-charcoal-400" />
                )}
            </div>

            {/* \ucf58\ud150\uce20 */}
            <div className="p-4 flex flex-col flex-1">
                <h4 className="font-serif text-sm font-semibold text-charcoal-900 leading-snug mb-1 line-clamp-2">
                    {book.title}
                </h4>
                {book.authors && (
                    <p className="text-xs text-charcoal-500 mb-2 truncate">
                        {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
                    </p>
                )}
                <StarRating rating={book.rating || 0} />
                {book.content && (
                    <p className="text-xs text-charcoal-600 leading-relaxed mt-2 line-clamp-3 flex-1">
                        {book.content}
                    </p>
                )}
                <div className="mt-3 flex items-center gap-1 text-xs text-charcoal-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                        {book.updatedAt
                            ? `\uc218\uc815 ${formatDate(book.updatedAt)}`
                            : `\uc791\uc131 ${formatDate(book.createdAt)}`}
                    </span>
                </div>
                <div className="mt-3 pt-3 border-t border-linen-200 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={handleEdit}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded border border-linen-300 text-charcoal-700 hover:bg-linen-50 hover:border-ink-300 hover:text-ink-500 transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                        \uc218\uc815
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded border border-linen-300 text-charcoal-700 hover:bg-red-50 hover:border-red-300 hover:text-cover-500 transition-colors"
                    >
                        <Trash2 className="w-3 h-3" />
                        \uc0ad\uc81c
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ReviewItem);
