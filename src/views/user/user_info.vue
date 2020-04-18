<template>
    <div class="container user_info">
        <nav class="bar bar-nav" style="background: #11BDA5;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">个人信息</h1>
        </nav>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">姓名</div>
                            <div class="item-after" v-text="userInfo && userInfo.realName"></div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">代理商编号</div>
                            <div class="item-after">{{userInfo && userInfo.agentNumber}}</div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">注册时间</div>
                            <div class="item-after">{{userInfo && userInfo.createTime | date 4}}</div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">联系地址</div>
                            <div class="item-after" style=" width: 48%;max-height: 5rem;white-space: inherit;float: right;">{{userInfo && (userInfo.city + ' ' + userInfo.address)}}</div>
                        </div>
                    </li>

                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">联系电话</div>
                            <div class="item-after" v-text="userInfo && userInfo.phone"></div>
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
        self.userInfo = userInfo;
        self.queryUserInfo();
    })
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    queryUserInfo () {
        $.showPreloader('正在加载...')

        let self = this;
        // 请求个人信息
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_USER_INFO + '?_id=' + this.userInfo._id + '&token=' + this.userInfo.token,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode !== 200) {
                    $.alert('获取个人信息失败')
                }
                else {
                    self.userInfo = data.body;
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

.user_info .bar-nav ~ .content {
  top:1.75rem;
  background: #FFF;
}

</style>
