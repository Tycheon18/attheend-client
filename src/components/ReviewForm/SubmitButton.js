import React from 'react';

const SubmitButton = () => {
    return (
        <button
            type="submit"
            style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = '#007bff';
            }}
        >
            📝 독후감 저장
        </button>
    );
};

export default SubmitButton;