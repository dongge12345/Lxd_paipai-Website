import mockAxios from './mock'

export const getYearPicture = (year) => mockAxios({url:`/${year}`,method:'get'})