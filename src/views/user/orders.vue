<template>
    <div class="container orders">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">订单查询</h1>
        </nav>
        <div class="content">
            <div class="buttons-tab">
                <a href="#tab1" class="tab-link active button">我的佣金</a>
                <a href="#tab2" class="tab-link button">我购买的</a>
            </div>
            <div class="content-block">
                <div class="tabs">
                    <div id="tab1" class="tab active">
                        <div>
                            <table>
                            <thead class="user-tr">
                                <th class="user-col">姓名</th>
                                <th class="user-col">订单号</th>
                                <th class="user-col">佣金</th>
                            </thead>
                            <tbody>
                            <template v-for="item in sellList">
                                <tr class="user-tr">
                                    <td class="user-col" v-text="item.realName"></td>
                                    <td class="user-col" v-text="item.orderNum"></td>
                                    <td class="user-col">{{item.profit}}元</td>
                                </tr>
                            </template>
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="tab2" class="tab">
                        <div v-show="buyInfo != null">
                            <div class="list-block">
                                <ul>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">商品名称</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.product"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">金额</div>
                                            <div class="item-after">{{buyInfo && buyInfo.amount}}元</div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">订单状态</div>
                                            <div class="item-after">
                                                <template v-if="buyInfo && buyInfo.status == 1">
                                                    已付款
                                                </template>
                                                <template v-else>
                                                    <template v-if="buyInfo && buyInfo.status == 2">
                                                        已发货
                                                    </template>
                                                    <template v-else>
                                                        未知
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">物流信息</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.logisticsInfo"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">订单号</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.orderNum"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">下单时间</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.createTime | date 4"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">平台收款时间</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.recvTime"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">收货地址</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.address"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">收货人</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.user.realName"></div>
                                        </div>
                                    </li>
                                    <li class="item-content">
                                        <div class="item-media"><i class="icon icon-f7"></i></div>
                                        <div class="item-inner">
                                            <div class="item-title">联系电话</div>
                                            <div class="item-after" v-text="buyInfo && buyInfo.phone"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div v-show="buyInfo == null">
                            <p style="text-align: center">未购买过任何商品</p>
                        </div>
                    </div>
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
        self.getUserOrder();
    })
  },
  data () {
    return {
        sellList: [],
        buyInfo: null,
        token: ''
    }
  },
  methods: {
    getUserOrder () {
        $.showPreloader('加载中...')
        let self = this;
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_USER_ORDERS + '?token=' + this.token,
            dataType: 'json',
            success: function (data) {
                if (data.statusCode !== 200) {
                    $.alert('加载失败')
                }
                else {
                    if (data.body.buyInfo[0]) {
                        self.buyInfo = data.body.buyInfo[0]
                    }
                    self.sellList = data.body.sellList;
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
.orders .content {
    background: #FFF;
}

.orders .bar-nav ~ .content {
   top: 2.2rem;
}

.orders .buttons-tab .button.active {
    color: #4C81D9;
    border-color: #4C81D9;
}

.orders  table {
    margin: 0 auto;
    width: 100%;
    text-align: center;
}

.orders .list-block {
    margin: 0;
}

.orders .list-block .item-content {
    padding-left: 0;
}
.orders .list-block .item-media + .item-inner {
    margin-left: 0;
    padding-left: 0.75rem;
}

.orders  .user-tr {
    border-bottom: 1px dashed #D4D2D2;
}
.orders  .user-tr {
    border-bottom: 1px dashed #D4D2D2;
}

.orders .user-col {
    font-size: 0.75rem;
    border-right: 1px dashed #D4D2D2;
    padding: 0.4rem 0.8rem;
}

.orders .user-col:last-child {
    border-right: none;
}

</style>
