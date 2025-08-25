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
        readingDate: new Date().toISOString().split('T')[0]
    });

    // 초기값이 있으면 폼 데이터에 설정
    useEffect(() => {
        if (initialValues) {
            setFormData({
                title: initialValues.title || '',
                authors: initialValues.authors ? (Array.isArray(initialValues.authors) ? initialValues.authors.join(', ') : initialValues.authors) : '',
                content: initialValues.content || '',
                coverImage: initialValues.coverImage || '',
                rating: initialValues.rating || 5,
                readingDate: initialValues.readingDate || new Date().toISOString().split('T')[0]
            });
        }
    }, [initialValues]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 폼 데이터 검증
        if (!formData.title.trim()) {
            alert('책 제목을 입력해주세요.');
            return;
        }
        if (!formData.content.trim()) {
            alert('독후감 내용을 입력해주세요.');
            return;
        }

        // 제출할 데이터 준비
        const submitData = {
            ...formData,
            authors: formData.authors.split(',').map(author => author.trim()).filter(author => author),
            id: initialValues?.id, // New.js/Edit.js에서 ID 설정
            createdAt: initialValues?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3>📚 독후감 작성</h3>
            </div>

            {/* 책 제목 입력 */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    책 제목 *
                </label>
                <ReviewTitleInput 
                    value={formData.title}
                    onChange={(value) => handleInputChange('title', value)}
                />
            </div>

            {/* 저자 입력 */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    저자 (쉼표로 구분)
                </label>
                <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => handleInputChange('authors', e.target.value)}
                    placeholder="예: 김철수, 이영희"
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                />
            </div>

            {/* 독후감 내용 입력 */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    독후감 내용 *
                </label>
                <ReviewContentInput 
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                />
            </div>

            {/* 표지 이미지 입력 */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    표지 이미지 URL
                </label>
                <CoverImageInput 
                    value={formData.coverImage}
                    onChange={(value) => handleInputChange('coverImage', value)}
                />
            </div>

            {/* 평점 */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    평점
                </label>
                <select
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                    style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                >
                    {[5, 4, 3, 2, 1].map(rating => (
                        <option key={rating} value={rating}>
                            {'⭐'.repeat(rating)} ({rating}점)
                        </option>
                    ))}
                </select>
            </div>

            {/* 읽은 날짜 */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    읽은 날짜
                </label>
                <input
                    type="date"
                    value={formData.readingDate}
                    onChange={(e) => handleInputChange('readingDate', e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                />
            </div>

            {/* 제출 버튼 */}
            <SubmitButton />
        </form>
    );
};

export default ReviewForm;