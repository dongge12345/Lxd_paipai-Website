import Mock from 'mockjs'
import y2017 from './2017.json'
import y2018 from './2018.json'
import y2019 from './2019.json'
import './articles/202304/index.js'
Mock.mock('/mock/2017',y2017)
Mock.mock('/mock/2018',y2018)
Mock.mock('/mock/2019',y2019)