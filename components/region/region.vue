<template>
	<view>
		
		<!-- 省市区3级联动组件 -->
		<picker mode="multiSelector" :value="multiIndex" :range="multiArray" @change="handleValueChange"
			@columnchange="handleColumnChange">
			<slot></slot>
		</picker>
		
	</view>
</template>
 
<script>
	// 省市区数据
	import regionData from "../../common/cityJson.js"
    //const regionData = require('./regions.json')
	// const regionData = uni.getStorageSync('regionData');
 
	export default {
		data() {
			console.log(regionData)
			return {
				cityArr: regionData,
				districtArr: regionData[0].child[0].child,
				multiIndex: [0, 0, 0],
				isInitMultiArray: true,
			}
		},
		methods: {
			// 某一列的值改变时触发 columnchange 事件
			handleColumnChange(e) {
				// console.log(e);
				let _this = this;
				_this.isInitMultiArray = false;
				let col = e.detail.column;
				let row = e.detail.value;
				_this.multiIndex[col] = row;
				try {
					switch (col) {
						case 0:
							if (regionData[_this.multiIndex[0]].child.length == 0) {
								_this.cityArr = _this.districtArr = [regionData[_this.multiIndex[0]]]
								break;
							}
							_this.cityArr = regionData[_this.multiIndex[0]].child
							_this.districtArr = regionData[_this.multiIndex[0]].child[_this.multiIndex[1]].child
							break;
						case 1:
							_this.districtArr = regionData[_this.multiIndex[0]].child[_this.multiIndex[1]].child
							break;
						case 2:
							break;
					}
				} catch (e) {
					// console.log(e);
					_this.districtArr = regionData[_this.multiIndex[0]].child[0].child
				}
			},
 
			// value 改变时触发 change 事件
			handleValueChange(e) {
				// console.log(e);
				// 结构赋值
				let _this = this;
				let [index0, index1, index2] = e.detail.value;
				let [arr0, arr1, arr2] = _this.pickedArr;
				let address = [arr0[index0], arr1[index1], arr2[index2]];
				// console.log(address);
				_this.$emit('getRegion', address)
			},
		},
		computed: {
			multiArray() {
				return this.pickedArr.map(arr => arr.map(item => item.name))
			},
			pickedArr() {
				// 进行初始化
				if (this.isInitMultiArray) {
					return [
						regionData,
						regionData[0].child,
						regionData[0].child[0].child
					]
				}
				return [regionData, this.cityArr, this.districtArr];
			}
		},
	}
</script>