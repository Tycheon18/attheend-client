import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookStateContext } from '../../App';
import ReviewItem from './ReviewItem';
import { BookOpen, PenLine, Search } from 'lucide-react';

const ReviewList = ({ books: externalBooks }) => {
    const contextBooks = useContext(BookStateContext);
    const books = externalBooks ?? contextBooks;

    // ── 빈 상태 ──────────────────────────────────────────────
    if (!books || books.length === 0) {
        return (
            <div className="flex flex-col items-center text-center py-20 max-w-lg mx-auto">
                <BookOpen className="w-16 h-16 text-linen-300 mb-5" />
                <h3 className="font-serif text-2xl text-charcoal-700 mb-3">
                    아직 작성된 독후감이 없습니다
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-8">
                    첫 번째 독후감을 작성하고 나만의 독서 기록을 시작해보세요.<br />
                    읽은 책에 대한 생각과 감상을 자유롭게 기록할 수 있습니다.
                </p>

                <div className="flex gap-3 mb-10">
                    <Link to="/new" className="btn-ink text-sm">
                        <PenLine className="w-4 h-4" />
                        독후감 작성하기
                    </Link>
                    <Link to="/search" className="btn-ghost-ink text-sm">
                        <Search className="w-4 h-4" />
                        책 검색하기
                    </Link>
                </div>

                {/* 도움말 */}
                <div className="w-full p-5 bg-linen-50 border border-linen-300 rounded-xl text-left">
                    <p className="text-sm font-semibold text-charcoal-700 mb-3">💡 독후감 작성 팁</p>
                    <ul className="text-sm text-charcoal-500 leading-relaxed space-y-1.5 list-disc list-inside">
                        <li>책을 읽고 난 후의 감상과 생각을 자유롭게 기록하세요</li>
                        <li>인상 깊었던 구절이나 문장을 함께 남겨보세요</li>
                        <li>책을 통해 얻은 인사이트나 깨달음을 정리해보세요</li>
                        <li>나중에 다시 읽을 때를 위해 평점도 매겨보세요</li>
                    </ul>
                </div>
            </div>
        );
    }

    // ── 목록 헤더 ─────────────────────────────────────────────
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-charcoal-500">
                    총 <span className="font-semibold text-charcoal-900">{books.length}</span>개의 독후감
                </p>
                <Link to="/new" className="btn-ink text-xs py-1.5 px-4">
                    <PenLine className="w-3.5 h-3.5" />
                    새 독후감
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {books.map((book) => (
                    <ReviewItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
