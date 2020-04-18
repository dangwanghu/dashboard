<template>
    <div class="content profile">
        <div class="banner">
            <div class="logo">
                <div class="logo_img">
                    <div class="base_profile" style="margin-left: 0rem;">
                        <p style="font-size: 1.1rem;margin-top:0.5rem;">{{realName}}</p>
                        <p style="margin-top:0.6rem;">
                            <svg class="icon icon-phone" style="width: 0.8rem;height: 0.65rem; margin-bottom: 0.1rem;"><use xlink:href="#icon-phone"></use></svg>
                            <span>{{phone}}</span>
                        </p>
                    </div>
                    <div class="base_profile" style="float: right;">
                        <p style="font-size: 0.8rem;margin-top:0.6rem;">余额：￥{{parseFloat(balance).toFixed(2)}}</p>
                        <p style="margin-top:0.6rem;text-align: right;">
                            <span>交易量：{{orderCount}} 笔</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <nav class="bar bar-tab user-tab">
            <a class="tab-item" @click="linkToWithdraw">
                <span class="icon icon-boxiaole"></span>
                <span class="tab-label">我要提现</span>
            </a>
            <a class="tab-item" @click="linkToOrderList">
                <span class="icon icon-management"></span>
                <span class="tab-label">订单记录</span>
            </a>
            <a class="tab-item" @click="linkToMyQrCode">
                <svg class="icon" style="width: 1.5rem;height: 1.2rem;"><use xlink:href="#icon-qr-code"></use></svg>
                <span class="tab-label">我的二维码</span>
            </a>
            <a class="tab-item" href="tel://15888888888">
                <span class="icon icon-consultation"></span>
                <span class="tab-label">联系客服</span>
            </a>
        </nav>
        <div class="con-block">
            <div class="list-block">
                <ul>
                    <li class="item-content item-link" @click="linkToUserInfo">
                        <div class="item-media"><i class="icon icon-center"></i></div>
                        <div class="item-inner">
                            <div class="item-title">个人信息</div>
                        </div>
                    </li>
                    <li class="item-content item-link" @click="linkToBankCardManage">
                        <div class="item-media">
                            <svg class="icon" style="width: 0.85rem;height: 1.2rem;color:#3d4145"><use xlink:href="#icon-card"></use></svg>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">银行卡管理</div>
                        </div>
                    </li>
                    <li class="item-content item-link" @click="linkToUpdatePwd">
                        <div class="item-media">
                            <svg class="icon" style="width: 0.85rem;height: 0.9rem;color:#3d4145"><use xlink:href="#icon-key"></use></svg>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">登录密码修改</div>
                        </div>
                    </li>
                    <li class="item-content item-link" @click="linkToUpdateWithdrawPwd">
                        <div class="item-media">
                            <svg class="icon" style="width: 0.85rem;height: 0.9rem;color:#3d4145"><use xlink:href="#icon-key"></use></svg>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">提现密码修改</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="text-align: center;padding-top: 2rem;">
                <div class="submit-button">
                    <a class="button button-big button-fill" style="background-color: #12B7F5;color: #FFF;border: 1px solid #12B7F5;" href="/home">返回主页</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as RoutesConstatns from '../../constants/routes.constants'
import * as util from '../../util/util'

export default {
  ready () {
    let self = this;
    util.isLogin(function(userInfo) {
        self.userId = userInfo._id;
        self.token = userInfo.token;
        self.balance = userInfo.balance;
        self.realName = userInfo.realName;
        self.phone = userInfo.phone;
        self.orderCount = userInfo.orderCount;
        self.queryUserInfo();
    })
  },
  data () {
    return {
      token: '',
      userId: '',
      balance: '',
      realName: '',
      phone: '',
      orderCount: 0
    }
  },
  methods: {
    linkToWithdraw () {
        util.isLogin(function() {
            window.location.href = '/user/withdraw';
        })
    },
    linkToOrderList () {
        util.isLogin(function() {
            window.location.href = '/order/list';
        })
    },
    linkToMyQrCode () {
        util.isLogin(function() {
            window.location.href = '/user/qrcode';
        })
    },
    linkToUserInfo () {
        util.isLogin(function() {
            window.location.href = '/user/info';
        })
    },
    linkToBankCardManage () {
        util.isLogin(function() {
            window.location.href = '/bankcard/list';
        })
    },
    linkToUpdatePwd () {
        util.isLogin(function() {
            window.location.href = '/user/passwd';
        });
    },
    linkToUpdateWithdrawPwd () {
        util.isLogin(function() {
            window.location.href = '/user/withdraw_passwd';
        })
    },
    queryUserInfo () {
        $.showPreloader('正在加载...')

        let self = this;
        // 请求个人信息
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_USER_INFO + '?_id=' + this.userId + '&token=' + this.token,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode !== 200) {
                    $.alert('获取个人信息失败')
                }
                else {
                    self.balance = data.body.balance;
                    self.orderCount = data.body.orderCount;
                }
            },
            error: function (xhr) {
                $.hidePreloader()
                util.handleAjaxError(xhr.response)
            }
        })
    }
  }
}
</script>

<style>
.profile .banner {
  width: 100%;
  background: #12B7F5;
}
.profile .banner .logo {
  width: 100%;
  padding: 20.2666654px 21.333332px 5.333333px;
}
.profile .banner .logo .logo_img {
  margin-top: 0px;
  height: 3.5rem;
}

.profile .base_profile {
  color:white;line-height: 8px;font-size: 0.8rem;padding-top: 0.1rem;float: left;margin-left:2.1rem;
}

.profile .con-block .ptitle {
  margin: 0.3rem 0.55rem;
}
.profile .con-block .info {
  border-bottom: 1px dashed #0F9675;
  margin-bottom: 0.5rem;
}
.profile .con-block .info .stitle {
  font-size: 0.7rem;
  font-weight: 600;
  border-left: 1px dashed rgba(0, 0, 0, 0.8);
  padding-left: 0.4rem;
  line-height: 1rem;
  height: 0.8rem;
  display: inline-block;;
}
.profile .con-block .info .time {
  display: block;
  font-size: 0.5rem;
  padding-left: 0.5rem;
}
.profile .con-block .info .comment {
  font-size: 0.7rem;
  margin: 0.5rem 0;
  display: inline-block;
  padding-left: 0.5rem;
}

.profile .con-block .info .exchange-num {
  font-size: 0.7rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}

.profile .con-block .info .exchange-status {
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.profile .con-block .info .scan-detail {
  margin-bottom: 0.5rem;
  font-size: 0.55rem;
  padding-left: 0.5rem;
}

.profile .con-block .info .green {
  color: #0F9675;
}

.profile .list-block {
   margin: 0.5rem 0;
}

.profile ul li {
    border-bottom: 1px dashed #d1d1d1;
    padding: 0.3rem 0;
}

.profile .list-block .item-inner:after {
    background-color: #FFF;
    opacity: 0.0;
}

.profile .user-tab {
  background: #12B7F5;
  height: 4rem;
  position: relative;
}
.profile .user-tab .tab-item {
  height: 3rem;
}
.profile .bar-tab .tab-item .icon {
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  margin-top: 0.5rem;
  color: #fff;
  font-weight: bold;
}
.profile  .bar-tab .tab-item .tab-label {
  font-weight: bold;
  margin-top: 0.1rem;
  padding-bottom: 0.3rem;
  color: #fff;
  font-size: 0.6rem;
}
.profile .submit-button {
    margin: 1rem auto;
    width: 14rem;
}
.profile .submit-button a {
    width: 100%;
    line-height: 2.1rem !important;
    height: 2.1rem !important;
}
</style>
