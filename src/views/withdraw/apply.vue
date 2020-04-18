<template>
    <div class="container withdraw_apply">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">提现申请</h1>
            <a class="icon pull-right" style="color: #FFF;font-size: 0.8rem;" @click="save">提交</a>
        </nav>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-management"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">银行卡：</div>
                                <div class="item-input">
                                    <input type="text" id="bankCards">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-scot"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">提现金额：</div>
                                <div class="item-input">
                                    <input type="number" id="amount">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-keyboard"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">提现密码：</div>
                                <div class="item-input">
                                    <input type="password" id="withdrawPwd">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-tel-border"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">手机号码：</div>
                                <div class="item-input">
                                    <input type="number" id="phone">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-picture"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">验证码：</div>
                                <input type="text" id="phoneCode" style="width: 53%;">
                                <input type="hidden" id="phoneCodeHidden">
                                <a class="button button-primary yzmBtn" style="color:#4C81D9;display: inline-block;background: #fff; border: none; width: 24%;height: 1.6rem;line-height: 1.6rem;" @click="sendCode">获取验证码</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="tips">
                <p style="font-size: 0.8rem;">可用余额：<span style="color:#F6383A">￥{{balance.toFixed(2)}}元</span></p>
                <p>您可能还需要：</p>
            </div>
            <div class="submit-button">
                <a href="/bankcard/add" class="button button-big button-fill" style="background-color: #4C81D9;">添加银行卡</a>
            </div>
            <div class="submit-button">
                <a href="/user/withdraw_passwd" class="button button-big button-fill" style="background-color: #f6383a;">设置提现密码</a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as util from '../../util/util'
import * as RoutesConstatns from '../../constants/routes.constants'

let num = 60
let dec = undefined

function myInterval () {
  if (num === 0) {
    $('.yzmBtn').text('重新发送')
    clearInterval(dec)
    dec = undefined
  }
  else {
    num--
    $('.yzmBtn').text(num + '秒')
  }
}

export default {
  ready () {
    let self = this;
    util.isLogin(function(userInfo) {
        self.token = userInfo.token;
        self.balance = userInfo.balance;
        self.userId = userInfo._id;
        self.phone = userInfo.phone;

        self.queryUserBankCodes();
    })
  },
  data () {
    return {
        token: '',
        userId: '',
        balance: 0,
        selectedBankId: '',
        withdrawPassword: null
    }
  },
  methods: {
    linkToAddBankCard () {
        util.isLogin(function() {
            window.location.href = '/withdraw_apply/apply';
        })
    },
    linkToSetWithdrawPwd () {
        util.isLogin(function() {
            window.location.href = '/withdraw_apply/records';
        })
    },
    save () {
        // 校验数据
      if ($('#bankCards').val() === '') {
        $.toast('请选择银行卡')
        return false
      }
      if ($('#amount').val() === '') {
        $.toast('请填写提现金额')
        return false
      }
      if (parseFloat($('#amount').val()) > this.balance) {
        $.toast('余额不足')
        return false
      }
      if ($('#withdrawPwd').val() === '') {
        $.toast('请填写提现密码')
        return false
      }
      if ($('#phone').val() === '') {
        $.toast('请填写手机号码')
        return false
      }
      if ($('#phoneCode').val() === '') {
        $.toast('请填写手机验证码')
        return false
      }
      if ($('#phoneCode').val() !== $('#phoneCodeHidden').val()) {
        $.toast('验证码错误')
        return false
      }
      if (!this.withdrawPassword) {
        $.alert('您未设置过提现密码，请先去设置密码吧~');
        return false
      }
      if ($('#withdrawPwd').val() !== this.withdrawPassword) {
        $.toast('提现密码错误')
        return false
      }
      $.showPreloader('提交中...')
      $.ajax({
            type: 'POST',
            data: {
                amount: $('#amount').val(),
                card: this.selectedBankId,
                token: this.token
            },
            url: RoutesConstatns.POST_USER_WITHDRAW,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode === 200) {
                    $.toast('申请成功，24小时内为您处理');
                    setTimeout(function() {
                        window.location.href = '/withdraw/records';
                    }, 2000);
                }
                else {
                    $.toast(data.message);
                }
            },
            error: function (xhr) {
                util.handleAjaxError(xhr.response)
            }
        })
    },
    queryUserInfo () {
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
                    self.withdrawPassword = data.body.withdrawPassword
                }
            },
            error: function (xhr) {
                util.handleAjaxError(xhr.response)
            }
        })
    },
    queryUserBankCodes () {
        $.showPreloader('正在加载...')

        let self = this;
        // 请求个人信息
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_USER_CARDS + '?token=' + this.token,
            dataType: 'json',
            success: function (data) {
                if (data.statusCode !== 200) {
                    $.alert('获取银行卡列表失败')
                }
                else {
                    let values = data.body.list.map((item) => {
                      return item._id;
                    })
                    let displayValues = data.body.list.map((item) => {
                      return item.bank + ' | 尾号' + item.cardNumber.substring(item.cardNumber.length - 4);
                    })
                    $('#bankCards').picker({
                      toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-right close-picker">确定</button><h1 class="title">请选择银行卡</h1></header>',
                      cols: [
                        {
                          textAlign: 'center',
                          values: displayValues
                        }
                      ],
                      onClose: function(picker) {
                        self.selectedBankId = values[Math.abs(picker.cols[0].activeIndex)];
                      }
                    })
                }
                $.hidePreloader()
                self.queryUserInfo();
            },
            error: function (xhr) {
                $.hidePreloader()
                util.handleAjaxError(xhr.response)
            }
        })
    },
    sendCode () {
      if (dec) {
        return false
      }
      if ($('#phone').val() === '') {
        $.toast('请填写手机号码')
        return false
      }
      if (!(/^1[34578]\d{9}$/.test($('#phone').val()))) {
        $.toast('手机号码格式不正确')
        return false
      }
      if ($('#phone').val() !== this.phone) {
        $.toast('手机号码与预留的号码不一致')
        return false
      }
      let self = this;
      $.ajax({
        type: 'GET',
        url: RoutesConstatns.GET_PHONE_CODE + '?phone=' + $('#phone').val(),
        dataType: 'json',
        success: function (data) {
          $.hidePreloader()
          if (data.statusCode === 200) {
            $.toast('发送成功')
            $('#phoneCodeHidden').val(data.body.code)
            $('#phoneCode').val(data.body.code)
            num = 60
            dec = setInterval(myInterval, 1000)
          }
          else {
            $.alert('发送失败')
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

<style scoped>
.list-block {
    margin: .5rem 0;
}
.withdraw_apply .bar-nav ~ .content {
    top: 2rem;
    background: #FFF;
}

.withdraw_apply .submit-button {
    margin: 1rem auto;
    width: 14rem;
}
.withdraw_apply .submit-button a {
    width: 100%;
    line-height: 2.1rem !important;
    height: 2.1rem !important;
}
.withdraw_apply .list-block .item-title.label {
    width: auto
}

.withdraw_apply .list-block ul:before {
    background-color: #FFF;
}

.withdraw_apply  .tips {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.65rem;
}
</style>
