<template>
    <div class="container passwd">
        <nav class="bar bar-nav" style="background: #f6383a;opacity: 0.9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">登录密码设置</h1>
            <a class="icon pull-right" style="color: #FFF;font-size: 0.8rem;" @click="save">保存</a>
        </nav>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-keyboard"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">原密码：</div>
                                <div class="item-input">
                                    <input type="password" id="originPwd">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <svg class="icon" style="width: 0.85rem;height: 0.9rem;color:#3d4145"><use xlink:href="#icon-key"></use></svg>
                            </div>
                            <div class="item-inner">
                                <div class="item-title label">新密码：</div>
                                <div class="item-input">
                                    <input type="password" id="newPwd">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <svg class="icon" style="width: 0.85rem;height: 0.9rem;color:#3d4145"><use xlink:href="#icon-key"></use></svg>
                            </div>
                            <div class="item-inner">
                                <div class="item-title label">确认密码：</div>
                                <div class="item-input">
                                    <input type="password" id="newRptPwd">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
        self.userId = userInfo._id;

        self.queryUserInfo();
    })
  },
  data () {
    return {
        token: '',
        userId: '',
        password: null
    }
  },
  methods: {
    save () {
        // 校验数据
      if ($('#originPwd').val() === '') {
        $.toast('请填写原密码')
        return false
      }
      if ($('#newPwd').val() === '') {
        $.toast('请填写新密码')
        return false
      }
      if ($('#newRptPwd').val() === '') {
        $.toast('请填写确认密码')
        return false
      }

      if ($('#newPwd').val() !== $('#newRptPwd').val()) {
        $.toast('两次密码输入不一致')
        return false
      }

      if ($('#newPwd').val().length < 6) {
        $.toast('密码长度必须大于6位')
        return false
      }

      if ($('#originPwd').val() !== this.password) {
        $.toast('原密码错误')
        return false
      }

      $.showPreloader('提交中...')
      $.ajax({
            type: 'PUT',
            data: {
                originPwd: $('#originPwd').val(),
                newPwd: $('#newPwd').val(),
                type: 0,
                token: this.token
            },
            url: RoutesConstatns.PUT_USER_PWD,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode === 200) {
                    $.toast('保存成功');
                    setTimeout(function() {
                        window.history.go(-1);
                    }, 1500);
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
                    self.password = data.body.password
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
.passwd .bar-nav ~ .content {
    top: 2rem;
    background: #FFF;
}

.passwd .submit-button {
    margin: 1rem auto;
    width: 14rem;
}
.passwd .submit-button a {
    width: 100%;
    line-height: 2.1rem !important;
    height: 2.1rem !important;
}
.passwd .list-block .item-title.label {
    width: auto
}

.passwd .list-block ul:before {
    background-color: #FFF;
}

</style>
