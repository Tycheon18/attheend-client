import React, { useContext } from 'react';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import { BookDispatchContext, BookIdContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../components/Common/Toast';
import { PenLine, Search, ArrowRight } from 'lucide-react';

const New = () => {
    const dispatch = useContext(BookDispatchContext);
    const idRef = useContext(BookIdContext);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const getInitialData = () => {
        try {
            const t = sessionStorage.getItem('tempBookData');
            return t ? JSON.parse(t) : null;
        } catch {
            return null;
        }
    };

    const initialData = getInitialData();
    const isDirectAccess = !initialData; // navbar에서 직접 접근한 경우

    const handleCreate = (data) => {
        dispatch({ type: 'CREATE', data: { ...data, id: idRef.current } });
        idRef.current += 1;
        sessionStorage.removeItem('tempBookData');
        addToast('독후감이 성공적으로 저장되었습니다!', 'success');
        navigate('/gallery');
    };

    return (
        <div className="max-w-[720px] mx-auto px-6 pt-8 pb-16">
            <div className="flex items-center gap-2 mb-1">
                <PenLine className="w-4 h-4 text-ink-500" />
                <p className="eyebrow">독후감 작성</p>
            </div>
            <h1 className="section-heading text-2xl mb-1">새 독후감</h1>
            <p className="text-sm text-charcoal-500 mb-7">
                읽은 책에 대한 생각과 감상을 자유롭게 기록해보세요
            </p>

            {/* 도서 검색 안내 배너 - 직접 접근 시에만 표시 */}
            {isDirectAccess && (
                <div className="mb-7 p-4 bg-linen-50 border border-linen-300 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-start gap-3 flex-1">
                        <Search className="w-5 h-5 text-ink-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-charcoal-700 mb-0.5">
                                도서를 먼저 검색해보세요
                            </p>
                            <p className="text-xs text-charcoal-500">
                                도서 검색에서 책을 선택하면 제목, 저자, 표지가 자동으로 입력됩니다
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/search"
                        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-ink-600 hover:bg-ink-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap sm:flex-shrink-0"
                    >
                        도서 검색하기
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            )}

            <ReviewForm onSubmit={handleCreate} initialValues={initialData} />
        </div>
    );
};

export default New;
