/**
 * 카카오 Books API 검색 결과 정렬 유틸
 */
export const sortBookResults = (books = [], sortBy = 'relevance') => {
    const list = [...books];
    switch (sortBy) {
        case 'title':
            return list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'ko'));
        case 'authors':
            return list.sort((a, b) => {
                const aA = (a.authors?.[0] || '');
                const bA = (b.authors?.[0] || '');
                return aA.localeCompare(bA, 'ko');
            });
        case 'publisher':
            return list.sort((a, b) => (a.publisher || '').localeCompare(b.publisher || '', 'ko'));
        case 'datetime':
            return list.sort((a, b) => {
                const aD = a.datetime ? new Date(a.datetime) : new Date(0);
                const bD = b.datetime ? new Date(b.datetime) : new Date(0);
                return bD - aD;
            });
        case 'relevance':
        default:
            return list; // 원본 순서 유지 (카카오 API가 이미 관련도순)
    }
};
