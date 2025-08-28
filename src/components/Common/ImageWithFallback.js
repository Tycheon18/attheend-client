import React, { useState } from 'react';
import styles from './ImageWithFallback.module.css';

const ImageWithFallback = ({ 
    src, 
    alt, 
    className,
    style,
    fallbackIcon = "📷",
    fallbackText = "이미지를 불러올 수 없습니다"
}) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    if (!src || imageError) {
        return (
            <div className={`${styles.fallbackContainer} ${className || ''}`} style={style}>
                <div className={styles.fallbackIcon}>{fallbackIcon}</div>
                <div className={styles.fallbackText}>{fallbackText}</div>
            </div>
        );
    }

    return (
        <div className={styles.imageContainer}>
            {imageLoading && (
                <div className={`${styles.loadingPlaceholder} ${className || ''}`} style={style}>
                    <div className={styles.loadingIcon}>⏳</div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${imageLoading ? styles.imageLoading : styles.imageLoaded} ${className || ''}`}
                style={style}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

export default ImageWithFallback;