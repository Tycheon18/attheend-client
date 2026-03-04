import React, { useState, useEffect } from 'react';
import ReviewTitleInput from './ReviewTitleInput';
import ReviewContentInput from './ReviewContentInput';
import CoverImageInput from './CoverImageInput';
import SubmitButton from './SubmitButton';

const ReviewForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        authors: '',
        content: '',
        coverImage: '',
        rating: 5,
        readingDate: new Date().toISOString().split('T')[0],
    });
    const [showValidation, setShowValidation] = useState(false);

    useEffect(() => {
        if (initialValues) {
            setFormData({
                title: initialValues.title || '',
                authors: initialValues.authors
                    ? (Array.isArray(initialValues.authors)
                        ? initialValues.authors.join(', ')
                        : initialValues.authors)
                    : '',
                content: initialValues.content || '',
                coverImage: initialValues.coverImage || '',
                rating: initialValues.rating || 5,
                readingDate: initialValues.readingDate || new Date().toISOString().split('T')[0],
            });
        }
    }, [initialValues]);

    const set = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowValidation(true);
        if (!formData.title.trim() || !formData.content.trim()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        onSubmit({
            ...formData,
            authors: formData.authors.split(',').map((a) => a.trim()).filter(Boolean),
            id: initialValues?.id,
            createdAt: initialValues?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    };

    // 공통 input className
    const inputCls = 'w-full px-4 py-3 text-sm bg-white border border-linen-300 rounded-lg text-charcoal-900 placeholder:text-charcoal-400 outline-none focus:border-ink-400 focus:ring-1 focus:ring-ink-400 transition-colors duration-200';
    const labelCls = 'block text-sm font-semibold text-charcoal-700 mb-1.5';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* 책 제목 */}
            <div>
                <label className={labelCls}>책 제목 <span className="text-cover-500">*</span></label>
                <ReviewTitleInput
                    value={formData.title}
                    onChange={(v) => set('title', v)}
                    showValidation={showValidation}
                />
            </div>

            {/* 저자 */}
            <div>
                <label className={labelCls}>저자 <span className="text-charcoal-400 font-normal text-xs">(쉼표로 구분)</span></label>
                <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => set('authors', e.target.value)}
                    placeholder="예: 김철수, 이영희"
                    className={inputCls}
                />
            </div>

            {/* 독후감 내용 */}
            <div>
                <label className={labelCls}>독후감 내용 <span className="text-cover-500">*</span></label>
                <ReviewContentInput
                    value={formData.content}
                    onChange={(v) => set('content', v)}
                    showValidation={showValidation}
                />
            </div>

            {/* 표지 이미지 */}
            <div>
                <label className={labelCls}>표지 이미지 URL <span className="text-charcoal-400 font-normal text-xs">(선택)</span></label>
                <CoverImageInput value={formData.coverImage} onChange={(v) => set('coverImage', v)} />
            </div>

            {/* 평점 */}
            <div>
                <label className={labelCls}>평점</label>
                <select
                    value={formData.rating}
                    onChange={(e) => set('rating', parseInt(e.target.value))}
                    className={inputCls}
                >
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{'⭐'.repeat(r)} ({r}점)</option>
                    ))}
                </select>
            </div>

            {/* 읽은 날짜 */}
            <div>
                <label className={labelCls}>읽은 날짜</label>
                <input
                    type="date"
                    value={formData.readingDate}
                    onChange={(e) => set('readingDate', e.target.value)}
                    className={inputCls}
                />
            </div>

            {/* 구분선 */}
            <div className="border-t border-linen-300 pt-2">
                <SubmitButton />
            </div>
        </form>
    );
};

export default ReviewForm;
