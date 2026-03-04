import React, { useContext, useState, useMemo } from 'react';
import ReviewList from '../components/ReviewList/ReviewList';
import { BookStateContext } from '../App';
import { BookOpen, Star, Calendar, BookMarked, SlidersHorizontal } from 'lucide-react';

// ── 통계 카드 ────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, colorCls }) => (
    <div className={`flex flex-col items-center justify-center gap-1 p-5 rounded-xl text-white ${colorCls}`}>
        <Icon className="w-6 h-6 mb-1 opacity-90" />
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        <span className="text-xs opacity-80 font-medium">{label}</span>
    </div>
);

// ── 셀렉트 공통 스타일 ───────────────────────────────────
const selectCls =
    'text-sm border border-linen-300 rounded-lg px-3 py-2 bg-white text-charcoal-700 outline-none ' +
    'focus:border-ink-400 focus:ring-1 focus:ring-ink-400 transition-colors cursor-pointer';

// ────────────────────────────────────────────────────────
const Gallery = () => {
    const books = useContext(BookStateContext);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    // 통계 계산
    const stats = useMemo(() => {
        if (!books || books.length === 0) return null;
        const total = books.length;
        const avgRating = (books.reduce((s, b) => s + (b.rating || 0), 0) / total).toFixed(1);
        const fiveStar = books.filter((b) => b.rating === 5).length;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recent = books.filter((b) => new Date(b.readingDate || b.createdAt) > thirtyDaysAgo).length;
        return { total, avgRating, fiveStar, recent };
    }, [books]);

    // 필터 + 정렬
    const filtered = useMemo(() => {
        if (!books) return [];
        let list = filter === 'rating' ? books.filter((b) => b.rating >= 4) : [...books];
        const sorters = {
            newest:  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            oldest:  (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            rating:  (a, b) => (b.rating || 0) - (a.rating || 0),
        };
        return list.sort(sorters[sortOrder] || sorters.newest);
    }, [books, filter, sortOrder]);

    return (
        <div className="max-w-[1100px] mx-auto px-6 py-10">

            {/* ── 페이지 헤더 ── */}
            <div className="mb-5">
                <p className="eyebrow mb-1">내 갤러리</p>
                <h1 className="section-heading text-2xl mb-1">나의 독서 기록</h1>
                <p className="text-sm text-charcoal-500">
                    작성한 독후감을 모아보고 읽기 이력을 관리하세요
                </p>
            </div>

            {books && books.length > 0 ? (
                <>
                    {/* ── 통계 카드 ── */}
                    {stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <StatCard icon={BookOpen}   value={stats.total}    label="총 독후감"   colorCls="bg-ink-500" />
                            <StatCard icon={Star}       value={stats.avgRating} label="평균 평점"  colorCls="bg-spine-600" />
                            <StatCard icon={BookMarked} value={stats.fiveStar} label="5점 도서"    colorCls="bg-cover-500" />
                            <StatCard icon={Calendar}   value={stats.recent}   label="최근 30일"   colorCls="bg-ink-400" />
                        </div>
                    )}

                    {/* ── 필터 + 정렬 바 ── */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 bg-linen-50 border border-linen-300 rounded-xl">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-charcoal-500" />
                            <span className="text-sm font-semibold text-charcoal-700">필터</span>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} className={selectCls}>
                                <option value="all">전체</option>
                                <option value="rating">4점 이상</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-charcoal-700">정렬</span>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectCls}>
                                <option value="newest">최신순</option>
                                <option value="oldest">오래된순</option>
                                <option value="rating">평점순</option>
                            </select>
                        </div>
                    </div>

                    <ReviewList books={filtered} />
                </>
            ) : (
                <ReviewList />
            )}
        </div>
    );
};

export default Gallery;
