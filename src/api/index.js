import mockAxios from './mock'


export const getYearPicture = (year) => mockAxios({url:`/${year}`,method:'get'})

export const getArticle = (yearMonth,articleNum) => mockAxios({url:`/${yearMonth}/article_${articleNum}`,method:'get'})