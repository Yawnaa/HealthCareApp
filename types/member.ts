// 登录参数
export interface LoginParams {
	account: string
	password: string
}

// 微信小程序登录参数
export interface WxMinLoginParams {
	code: string
}

// 登录结果
export interface LoginResult {
	id: number
	account: string
	nickname: string
	avatar: string
	token: string
} 