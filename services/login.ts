import type { LoginParams, LoginResult, WxMinLoginParams } from '../types/member'

// 传统登录
export const postLoginAPI = (data: LoginParams) => {
  return uni.request<LoginResult>({
    url: '/api/login',
    method: 'POST',
    data
  })
}

// 微信小程序登录
export const postLoginWxMinAPI = (data: WxMinLoginParams) => {
  return uni.request<LoginResult>({
    url: '/api/login/wx-min',
    method: 'POST',
    data
  })
}

// 微信小程序模拟登录
export const postLoginWxMinSimpleAPI = (phone: string) => {
  return uni.request<LoginResult>({
    url: '/api/login/wx-min/simple',
    method: 'POST',
    data: { phone }
  })
} 