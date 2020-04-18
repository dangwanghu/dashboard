<template>
    <div class="container withdraw">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">我要提现</h1>
        </nav>
        <div class="content">
            <div style="text-align: center;padding-top: 4rem;">
                <svg class="icon icon-rmb"><use xlink:href="#icon-doller"></use></svg>
                <p style="margin-top: 0.5rem;color: #666;">我的可提现佣金</p>
                <p style="margin-top: -0.5rem;">￥{{balance.toFixed(2)}}</p>
                <div class="submit-button">
                    <a class="button button-big button-fill" style="background-color: #F47742;" @click="linkToApplyWithdraw">提现到银行卡</a>
                </div>
                <div class="submit-button">
                    <a class="button button-big button-fill" style="background-color: #FFF;color: #686363;border: 1px solid #9E9A9A;" @click="linkToWithdrawHistory">提现记录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as util from '../../util/util'
import * as RoutesConstatns from '../../constants/routes.constants'

export default {
  ready () {
    let self = this;
    util.isLogin(function(userInfo) {
        self.token = userInfo.token;
        self.balance = userInfo.balance;
        self.userId = userInfo._id;
        self.queryUserInfo();
    })
  },
  data () {
    return {
        token: '',
        userId: '',
        balance: 0
    }
  },
  methods: {
    linkToApplyWithdraw () {
        util.isLogin(function() {
            window.location.href = '/withdraw/apply';
        })
    },
    linkToWithdrawHistory () {
        util.isLogin(function() {
            window.location.href = '/withdraw/records';
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
                if (data.statusCode !== 200) {
                    $.alert('获取个人信息失败')
                }
                else {
                    self.balance = data.body.balance;
                }
                $.hidePreloader()
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

<style scoped>
.list-block {
    margin: .5rem 0;
}
.withdraw .bar-nav ~ .content {
    top: 2rem;
    background: #FFF;
}
.withdraw .icon-rmb {
    color: #F5A85A;
    width: 5rem;
}

.withdraw .submit-button {
    margin: 1rem auto;
    width: 14rem;
}
.withdraw .submit-button a {
    width: 100%;
    line-height: 2.1rem !important;
    height: 2.1rem !important;
}
</style>
