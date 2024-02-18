import {
	Index
} from './index.js';
const API = new Index();

// 轮播图
export function getBanner() {
	return new Promise(resolve => {
		API.getBanner({
		}).then(res => {
			console.log(res)
			resolve(res.data)
		})
	})
}