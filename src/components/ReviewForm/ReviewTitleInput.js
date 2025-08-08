import React from 'react';

const ReviewTitleInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="책 제목을 입력하세요"
            style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#fff'
            }}
        />
    );
};

export default ReviewTitleInput;