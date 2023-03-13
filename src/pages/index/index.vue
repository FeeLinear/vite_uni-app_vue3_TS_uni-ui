<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <view>{{ userStore.userInfo.name }}</view>
      <text class="title">{{ title }}1122</text>
      <button @click="goListPage">跳list</button>
      <uni-badge text="1"></uni-badge>
      <uni-badge text="2" type="success"></uni-badge>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import UserService from '@/api/user'
import CommonService from '@/api/common'
import router from '@/router'


// 本地缓存用户信息
const userStore = useUserStore()
userStore.setUserInfo()

//////////////

const title = ref('Hello22444')
console.log(11111)

// 网络请求
async function getData() {
  const params = {
    position: 1,
    aa: 11
  }
  const res = await UserService.getList(params)
  console.log("res", res)
  const { code, data } = res.data
  if (code === 0) {
    console.log(data) // 这里访问data会有类型提示
  }
}
getData()

////////


// 上传文件
// 选择照片或视频
function chooseMedia(mediaType: 'image' | 'video' = 'image') {
  uni.chooseMedia({
    count: 1,
    mediaType: [mediaType],
    sizeType: ['compressed'],
    maxDuration: 60,
    success(res) {
      const path = res.tempFiles.map((item) => item.tempFilePath)
      uploadFile(path[0])
    },
    fail() {
      // $toast("选取图片失败");
    },
  })
}

async function uploadFile(path: string) {
  const res = await CommonService.uploadFile(path)
  const { code, data } = res.data
  if (code === 0) {
    // 上传成功
  }
}

///////////////

// 路由跳转
function goListPage() {
  router.navigate('list', { type: '66' })
}



</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
