import React from 'react';

const CoverImageInput = ({ value, onChange }) => {
    return (
        <div>
            <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/book-cover.jpg"
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: '#fff'
                }}
            />
            {value && (
                <div style={{ marginTop: '10px' }}>
                    <img 
                        src={value} 
                        alt="책 표지 미리보기" 
                        style={{
                            maxWidth: '150px',
                            maxHeight: '200px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CoverImageInput;
