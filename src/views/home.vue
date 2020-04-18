<template>
    <div class="container">
        <div class="content short_main" style="background: #fff;">
            <div class="bangzhu">
                <div class="shots">
                    <div class="ad">
                        <img src="/img/home_bg.jpg" style="width:100%"/>
                    </div>
                </div>
                <div class="cover2">
                    <div class="opr">
                        <ul>
                            <li>
                                <div class="item-inner" style="background: #33BDEC;">
                                    <a @click="linkToSellQrCode">
                                        <svg class="icon"><use xlink:href="#icon-cart"></use></svg>
                                        <div class="item-title">出售商品</div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="item-inner" style="background: #F5A85A;">
                                    <a @click="linkToJoinUs">
                                        <svg class="icon"><use xlink:href="#icon-people"></use></svg>
                                        <div class="item-title">关于加盟</div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="item-inner" style="background: #4BD0B5;">
                                    <a @click="linkToCustomerManage">
                                        <svg class="icon"><use xlink:href="#icon-customer"></use></svg>
                                        <div class="item-title">客户管理</div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="item-inner" style="background: #4C81D9;">
                                    <a @click="linkToOrderManage">
                                        <svg class="icon"><use xlink:href="#icon-order"></use></svg>
                                        <div class="item-title">订单查询</div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="item-inner" style="background: #EE3382;">
                                    <a @click="linkToWithdraw">
                                        <svg class="icon"><use xlink:href="#icon-nav"></use></svg>
                                        <div class="item-title">我要提现</div>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="item-inner" style="background: #DB77CD;">
                                    <a @click="linkToAccountManage">
                                        <svg class="icon"><use xlink:href="#icon-money"></use></svg>
                                        <div class="item-title">账户管理</div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as util from '../util/util'

export default {
  ready () {
  },
  methods: {
    linkToSellQrCode () {
        util.isLogin(function() {
            window.location.href = '/seller/qr_code';
        })
    },
    linkToCustomerManage () {
        util.isLogin(function() {
            window.location.href = '/user/customers';
        })
    },
    linkToOrderManage () {
        util.isLogin(function() {
            window.location.href = '/order/list';
        })
    },
    linkToWithdraw () {
        util.isLogin(function() {
            window.location.href = '/user/withdraw';
        })
    },
    linkToAccountManage () {
        util.isLogin(function() {
            window.location.href = '/user/profile';
        })
    },
    linkToJoinUs () {
       window.location.href = '/product/join';
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
    padding: 0 1rem;
    margin: -1rem 0 0 0;
}
.short_main .bangzhu .cover2 ul li {
    list-style: none;
    float: left;
    width: 49.45%;
    text-align: center;
    height: 4.8rem;
    margin-bottom: 1rem;
}
.short_main .bangzhu .cover2 ul li .item-inner{
    margin-top: 1rem;
    height: 4.8rem;
    background: #B13434;
    border-radius: 1rem;
    margin: 1.2rem;
    padding-top: 0.7rem;
}
.short_main .bangzhu .cover2 ul li .item-inner a{
    display: inline-block;
}
.short_main .bangzhu .cover2 ul li .item-title{
    color: #FFF;
    margin-top: 0.3rem;
}

.short_main .bangzhu .cover2 ul li a svg{
    width: 2rem;
    height: 2rem;
    color: #FFF;
}

.short_main .shots img {
    width: 100%;
}

.short_main .cover2 .bg1 {
    width: 2rem;
    height: 1.5rem;
    position: absolute;
    left: -0.8rem;
    background: #FA6F00;
    z-index: 99;
    top: 0.3rem;
}

</style>
