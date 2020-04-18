
import Parameters from './settings.constants'

/** ***************************** Router ********************************/
// TODO BaseURL
// export const BASE_URL = 'http://192.168.1.100:3000'
export const BASE_URL = 'http://106.14.81.137:3300'

// TODO 获取系统设置
export const GET_CONFIGS = BASE_URL + Parameters.api.prefix1_1 + '/admin/system/configs'

// TODO 商户登录
export const GET_USER_LOGIN = BASE_URL + Parameters.api.prefix1_1 + '/user/login'

// TODO 验证码
export const GET_PHONE_CODE = BASE_URL + Parameters.api.prefix1_1 + '/phone/code'

// TODO 商户注册
export const POST_USER_RIGISTER = BASE_URL + Parameters.api.prefix1_1 + '/user/register'


// TODO 下属商户
export const GET_UNDER_USERS = BASE_URL + Parameters.api.prefix1_1 + '/under/users'

// TODO 我的订单
export const GET_USER_ORDERS = BASE_URL + Parameters.api.prefix1_1 + '/user/orders'

// TODO 查询商户信息
export const GET_USER_INFO = BASE_URL + Parameters.api.prefix1_1 + '/user'

// TODO 查询我的银行卡
export const GET_USER_CARDS = BASE_URL + Parameters.api.prefix1_1 + '/user/bank_cards'

// TODO 提现申请
export const POST_USER_WITHDRAW = BASE_URL + Parameters.api.prefix1_1 + '/user/withdraw'

// TODO 提现记录
export const GET_USER_WITHDRAW_RECORDS = BASE_URL + Parameters.api.prefix1_1 + '/user/withdraws'

// TODO 修改商户登录密码/提现密码
export const PUT_USER_PWD = BASE_URL + Parameters.api.prefix1_1 + '/user/password'

// TODO 添加银行卡
export const POST_BANK_CARD = BASE_URL + Parameters.api.prefix1_1 + '/user/bank_card'

// TODO 查询银行卡列表
export const GET_BANK_CARDS = BASE_URL + Parameters.api.prefix1_1 + '/user/bank_cards'

// TODO 移除银行卡
export const DELETE_BANK = BASE_URL + Parameters.api.prefix1_1 + '/user/bank_card'

// TODO 获取某项设置项
export const GET_SYSTEM_CONFIG = BASE_URL + Parameters.api.prefix1_1 + '/system/config'
