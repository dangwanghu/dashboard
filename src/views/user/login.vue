<template>
    <div class="container">
        <div class="content short_main" style="background: #fff;">
            <div class="bangzhu">
                <div class="shots">
                    <div class="ad">
                        <div style="text-align: center;padding-top: 1.5rem;">
                            <div class="pBg">
                                <div class="pNameEn">
                                    <span class="brandName">热情之火 - </span><span class="fpName">eDSP</span>
                                </div>
                                <div class="pNameZh">
                                    红酒分销平台
                                </div>
                                <div class="wTitle">
                                    中国最好的分销平台
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="opr">
                    <div class="list-block" style="margin: 1.75rem 0.5rem;">
                        <ul>
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-center"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">手机号码</div>
                                        <div class="item-input">
                                            <input type="text" id="phone" placeholder="请输入代理商编号" value="{{phone}}">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-keyboard"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">密码</div>
                                        <div class="item-input">
                                            <input type="password" id="password" placeholder="请输入密码" value="{{password}}">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="content-block" style="margin: 1.75rem 0.2rem;">
                        <div class="row" style="margin: 0 0.1rem;">
                            <div class="col-50" style="height: 2rem;line-height: 1.9rem;">
                                <div class="item-inner">
                                <div class="item-input">
                                    <label class="label-switch">
                                        <input type="checkbox" @change="switchAccount" checked="{{rememberMe}}">
                                        <div class="checkbox"></div>
                                    </label>
                                    <span>记住我</span>
                                </div>
                                </div>
                            </div>
                            <div class="col-50" style="margin-left: 0;height: 2rem;line-height: 1.9rem; width: 42%;">
                                <a @click="login" style="border-radius:2px;background: #F37835;border-color: #F37835;color: #FFF;font-size: 1.2rem;height: 2rem;line-height: 1.9rem;" class="button button-big button-success"><i class="icon icon-alert-border" style="float: left;"></i>登陆</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as RoutesConstatns from '../../constants/routes.constants'

export default {
  ready () {
    if (this.getCookie('pwdChecked') !== null && this.getCookie('pwdChecked') !== '') {
        this.rememberMe = true;
    }
    if (this.getCookie('account') !== null && this.getCookie('account') !== '') {
		this.phone = this.getCookie('account');
	}
	if (this.getCookie('password') !== null && this.getCookie('password') !== '') {
		this.password = this.getCookie('password');
	}
  },
  data () {
    return {
        rememberMe: false,
        phone: '',
        password: ''
    }
  },
  methods: {
    login () {
      let phone = $('#phone').val();
      let password = $('#password').val();

      if (!phone || phone === '') {
        $.toast('手机号码不能为空');
        return false;
      }
      if (!password || password === '') {
        $.toast('密码不能为空');
        return false;
      }

      try {
        let self = this
        $.ajax({
            type: 'POST',
            data: {
                phone: phone,
                password: password
            },
            url: RoutesConstatns.GET_USER_LOGIN,
            dataType: 'json',
            success: function (data) {
                if (data.statusCode === 200) {
                    if (self.rememberMe) {
                        self.setCookie('account', phone);
                        self.setCookie('password', password);
                        self.setCookie('pwdChecked', '1');
                    }
                    else {
                        self.delCookie('account');
                        self.delCookie('password');
                        self.delCookie('pwdChecked');
                    }
                    $.toast('登录成功');
                    window.sessionStorage.setItem('userInfo', JSON.stringify(data.body));
                    window.location.href = '/home';
                }
                else {
                    $.toast(data.message);
                }
            },
            error: function (xhr) {
                $.toast('登录失败')
            }
        })
      }
      catch (err) {
          console.error(err)
      }
    },
    switchAccount (e) {
        // 记住密码
        if (e.target.checked) {
            this.rememberMe = true
        }
        else {
            this.rememberMe = false
        }
    },
    setCookie (name, value) {
        let Days = 30;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    },
    getCookie (name) {
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        else {
            return null;
        }
	},
    delCookie (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
        }
    }
  }
}
</script>

<style>

.short_main .bangzhu {
    height: 100%;
    position: relative;
    overflow: hidden;
}

.short_main .bangzhu .cover2 ul {
    padding: 0 1.2rem;
}
.short_main .bangzhu .cover2 ul li {
    list-style: none;
    float: left;
    width: 33.3%;
    text-align: center;
    height: 5.5rem;
    border:1px solid #C5C3C3
}
.short_main .bangzhu .cover2 ul li .item-inner{
    margin-top: 1rem;
}

.short_main .bangzhu .cover2 ul li .item-title{
    color: #6B6A6A;
}

.short_main .shots img {
    width: 100%;
}

.short_main .shots .ad {
    background: #15B9D5;
    height: 13rem;
}

.short_main .shots .ad .pBg {
    margin: 0 auto;
    width: 10rem;
    border-radius: 12rem;
    background: #FFF;
    height: 10rem;
    font-family: "Microsoft YaHei";
    color: #141414;
}

.short_main .shots .ad .pBg .pNameEn {
    padding-top: 2.5rem;
    font-family: fantasy;
    font-size: 0.9rem;
}

.short_main .shots .ad .pBg .pNameEn .fpName {
     color: #1CBDAE;
}

.short_main .shots .ad .pBg .pNameEn .brandName {
    font-weight: 600;
}

.short_main .shots .ad .pBg .pNameZh {
    padding-top: 0.2rem;
    font-size: 1.5rem;
    color: #1CBDAE;
    font-weight: 600;
}

.short_main .shots .ad .pBg .wTitle {
    padding-top: 1rem;
    font-size: 0.5rem;
    font-weight: 600;
}

</style>
