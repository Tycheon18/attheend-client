import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const SubmitButton = ({ loading = false, children = "📝 독후감 저장" }) => {
    return (
        <button
            type="submit"
            disabled={loading}
            style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: loading ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}
            onMouseOver={(e) => {
                if (!loading) {
                    e.target.style.backgroundColor = '#0056b3';
                }
            }}
            onMouseOut={(e) => {
                if (!loading) {
                    e.target.style.backgroundColor = '#007bff';
                }
            }}
        >
            {loading ? (
                <LoadingSpinner size="small" className="inline-spinner" />
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitButton;