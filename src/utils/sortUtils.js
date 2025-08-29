// 검색 결과 정렬 유틸리티 함수들

export const sortBookResults = (results, sortBy) => {
    if (!results || results.length === 0) return results;

    const sortedResults = [...results];

    switch (sortBy) {
        case 'title':
            return sortedResults.sort((a, b) => {
                const titleA = a.title?.toLowerCase() || '';
                const titleB = b.title?.toLowerCase() || '';
                return titleA.localeCompare(titleB, 'ko-KR');
            });

        case 'authors':
            return sortedResults.sort((a, b) => {
                const authorsA = Array.isArray(a.authors) ? a.authors.join(', ').toLowerCase() : '';
                const authorsB = Array.isArray(b.authors) ? b.authors.join(', ').toLowerCase() : '';
                return authorsA.localeCompare(authorsB, 'ko-KR');
            });

        case 'publisher':
            return sortedResults.sort((a, b) => {
                const publisherA = a.publisher?.toLowerCase() || '';
                const publisherB = b.publisher?.toLowerCase() || '';
                return publisherA.localeCompare(publisherB, 'ko-KR');
            });

        case 'datetime':
            return sortedResults.sort((a, b) => {
                // 출간일 기준 정렬 (최신순)
                const dateA = new Date(a.datetime || 0);
                const dateB = new Date(b.datetime || 0);
                return dateB - dateA; // 내림차순 (최신순)
            });

        case 'relevance':
        default:
            // 관련도순은 API에서 제공하는 기본 순서 유지
            return results;
    }
};

export const getSortDisplayName = (sortBy) => {
    const sortNames = {
        'relevance': '관련도순',
        'title': '제목순',
        'authors': '저자순', 
        'publisher': '출판사순',
        'datetime': '출간일순'
    };
    return sortNames[sortBy] || '관련도순';
};