<template>
    <div class="content register">
        <nav class="bar bar-nav" style="background: #11BDA5;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">欢迎加盟波尔多红颜酒庄</h1>
        </nav>
        <form id="publishForm">
            <div class="content-block">
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="text" name="realName" id="realName" placeholder="请填写姓名">
                </div>
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="password" name="password" id="password" placeholder="请填写密码">
                </div>
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="password" id="passwordRpt" placeholder="请填写确认密码">
                </div>
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="text" name="city" id="city" placeholder="请选择城市">
                </div>
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="text" name="address" id="address" placeholder="请填写收货地址(精确到街道或门牌号)">
                </div>
                <input type="hidden" name="email">
                <div class="register-input">
                    <b style="color:red">*</b>
                    <input type="number" name="phone" id="phone" placeholder="请填写手机号">
                    <input type="text" id="phoneCode" placeholder="验证码" style="width: 23%;">
                    <input type="hidden" id="phoneCodeHidden">
                    <a class="button button-primary yzmBtn" style="color:#11BDA5;display: inline-block;background: #fff; border: none; width: 24%;height: 1.6rem;line-height: 1.6rem;" @click="sendCode">获取验证码</a>
                </div>
                <div class="register-input" style="margin: 0.5rem 0 2.5rem 0;">
                    <input type="text"  name="remark" id="remark" placeholder="请填写订单备注信息">
                </div>
                <input type="hidden" name="parent" value={{parent}}>
            </div>
            <div class="submit-button">
                <a class="button button-big button-fill" @click="save">下一步</a>
            </div>
        </form>
    </div>
</template>

<script>
import $ from 'zepto'
import * as util from '../../util/util'
import Parameters from '../../constants/settings.constants'
import * as RoutesConstatns from '../../constants/routes.constants'
import city from '../../assets/js/city'

let num = 60
let dec = null

function myInterval () {
  if (num === 0) {
    $('.yzmBtn').text('重新发送')
    clearInterval(dec)
    dec = null
  }
  else {
    num--
    $('.yzmBtn').text(num + '秒')
  }
}

export default {
  ready () {
    this.parent = this.$route.query.parent;
    $('#city').cityPicker();
  },
  data () {
    return {
      parent: ''
    }
  },
  methods: {
    save () {
      // 校验数据
      if ($('#realName').val() === '') {
        $.toast('请填写姓名')
        return false
      }
      if ($('#password').val() === '') {
        $.toast('请填写密码')
        return false
      }
      if ($('#passwordRpt').val() === '') {
        $.toast('请填写确认密码')
        return false
      }
      if ($('#password').val() !== $('#passwordRpt').val()) {
        $.toast('两次密码填写不一致')
        return false
      }
      if ($('#city').val() === '') {
        $.toast('请选择城市')
        return false
      }
      if ($('#address').val() === '') {
        $.toast('请填写收货地址')
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
      if ($('#phoneCode').val().toLowerCase() !== $('#phoneCodeHidden').val().toLowerCase()) {
        $.toast('验证码错误')
        return false
      }

      $.showPreloader('提交订单...')
      $.ajax({
        type: 'POST',
        url: RoutesConstatns.POST_USER_RIGISTER,
        dataType: 'json',
        data: $('#publishForm').serialize(),
        success: function (data) {
            $.hidePreloader()
            if (data.statusCode === 200) {
              $.toast('提交成功')
              setTimeout(function() {
                window.location.href = '/product/pay?orderNum=' + data.body.order.orderNum + '&phone=' + data.body.user.phone;
              }, 1000)
            }
            else {
              $.alert(data.message)
            }
        },
        error: function (xhr) {
            $.hidePreloader()
            util.handleAjaxError(xhr.response)
        }
      })
    },
    sendCode () {
      if (dec != null) {
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
      let self = this;
      $.ajax({
        type: 'GET',
        url: RoutesConstatns.GET_PHONE_CODE + '?phone=' + $('#phone').val(),
        dataType: 'json',
        success: function (data) {
          if (data.statusCode === 200) {
            $.toast('发送成功')
            $('#phoneCodeHidden').val(data.body.code)
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

<style>
.register {
    background: #fff;
}
.register .pull-left {
    color: #6d6d72;
}
.register .content-block {
  padding: 2.5rem .45rem;
  background: #fff;
  overflow: auto;
}
.register-label {
  font-size: .7rem;
  line-height: 1.2rem;
}
.register-input {
    position: relative;
}
.register-input input{
    width: 100%;
    height: 2.15rem;
    font-size: .7rem;
    padding: .4rem .5rem;
    background-color: #fff;
    margin-bottom: .5rem;
    border: none;
    border-bottom: 1px solid #11BDA5;
    border-radius: 0;
    -webkit-appearance: none;
    line-height: normal;
}

.register-input b {
    color: red;
    top: 0.6rem;
    position: absolute;
}

.register .submit-button {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.register .submit-button a {
  background-color: #11BDA5;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
  border-radius: 0rem;
}

</style>
