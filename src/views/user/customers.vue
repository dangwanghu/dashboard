<template>
    <div class="container customer">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">我的客户</h1>
        </nav>
        <div class="content">
            <div class="list-block media-list">
                <ul>
                    <li>
                        <a @click="getUnderUsers(1)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">一级客户</div>
                                <div class="item-text">每笔返佣金9元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 1" class="user-content">
                        <template v-for="item in users">
                            <div class="user-tr">
                                <span class="user-col" v-text="item.realName"></span>
                                <span class="user-col" v-text="item.agentNumber"></span>
                                <span class="user-col" >{{item.orderCount}}笔</span>
                            </div>
                        </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(2)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">二级客户</div>
                                <div class="item-text">每笔返佣金8元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 2" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(3)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">三级客户</div>
                                <div class="item-text">每笔返佣金7元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 3" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(4)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">四级客户</div>
                                <div class="item-text">每笔返佣金6元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 4" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(5)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">五级客户</div>
                                <div class="item-text">每笔返佣金5元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 5" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(6)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">六级客户</div>
                                <div class="item-text">每笔返佣金4元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 6" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(7)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">七级客户</div>
                                <div class="item-text">每笔返佣金3元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 7" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(8)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">八级客户</div>
                                <div class="item-text">每笔返佣金2元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 8" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
                        </div>
                    </li>
                    <li>
                        <a @click="getUnderUsers(9)" class="item-link item-content">
                            <div class="item-media"><img src="/img/customer.png"></div>
                            <div class="item-inner">
                                <div class="item-subtitle">九级客户</div>
                                <div class="item-text">每笔返佣金1元</div>
                            </div>
                        </a>
                        <div v-show="curLevel == 9" class="user-content">
                            <template v-for="item in users">
                                <div class="user-tr">
                                    <span class="user-col" v-text="item.realName"></span>
                                    <span class="user-col" v-text="item.agentNumber"></span>
                                    <span class="user-col" >{{item.orderCount}}笔</span>
                                </div>
                            </template>
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
    })
  },
  data () {
    return {
        token: '',
        curLevel: 0,
        users: []
    }
  },
  methods: {
    getUnderUsers (level) {
        if (this.curLevel === level) {
            return false;
        }
        $.showPreloader('正在加载...')
        let self = this;
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_UNDER_USERS + '?level=' + level + '&token=' + this.token,
            dataType: 'json',
            success: function (data) {
                self.curLevel = level;
                if (data.statusCode !== 200) {
                    $.alert('加载失败')
                }
                else {
                    self.users = data.body.list;
                    if (self.users.length === 0) {
                        $.alert('暂无客户');
                    }
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

.customer .media-list .item-content .item-media img {
    width: 3rem;
}

.customer .media-list .user-content {
    border-top: 1px solid #D4D2D2;
}

.customer .media-list .user-tr {
    padding: 0.5rem 1rem;
    border-bottom: 1px dashed #D4D2D2;
}

.customer .media-list .user-col {
    font-size: 0.75rem;
    border-right: 1px solid #585252;
    padding: 0 0.5rem;
}

.customer .media-list .user-col:last-child {
    border-right: none;
}

.customer .media-list .item-content .item-inner .item-subtitle {
    font-size: 1rem;
}
.customer .media-list .item-content .item-inner .item-text {
    padding-top: 0.4rem;
}

</style>
