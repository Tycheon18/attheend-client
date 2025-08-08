import React from 'react';

const ReviewContentInput = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="독후감 내용을 자유롭게 작성해주세요..."
            rows={10}
            style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '200px',
                backgroundColor: '#fff'
            }}
        />
    );
};

export default ReviewContentInput;
