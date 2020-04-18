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
                <div class="cover2">
                    <div style="text-align: center;margin-top:2rem;">
                        <svg class="icon" style="width: 2rem;height: 3.5rem;color: #15B9D5;margin-right: 0.5rem;"><use xlink:href="#icon-ok"></use></svg>
                        <h3 style="display: inline-block;">恭喜您，注册成功!
                        </h3>
                        <div style="text-align: center;">
                            <p>
                                <span style="margin-left: 1.2rem;">订单号：</span><span style="color: #15B9D5;">{{orderNum}}</span>
                            </p>
                            <span style="font-size:0.6rem;">提示：支付时请将“手机号”填写到备注信息栏</span>
                        </div>
                        <div class="next" style="margin-top:2rem;">
                            <a style="width:8rem;height:2rem;line-height:2rem;font-size:0.8rem; border-radius: 4px;background: #15B9D5;border-color: #15B9D5;" class="button button-big" @click="linkToPay" id="payLink" target="_blank">去付款</a>
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
import * as util from '../../util/util'

export default {
  ready () {
    this.orderNum = this.$route.query.orderNum;
    this.phone = this.$route.query.phone;
    let orderInfo = window.sessionStorage.getItem('order_' + this.orderNum);
    if (orderInfo && orderInfo !== '') {
        $.modal({
            title: '温馨提示',
            text: '请确认是否已经付款，不要重复支付！',
            buttons: [
                {
                    text: '留在本页',
                    onClick: function() {
                    }
                },
                {
                    text: '返回首页',
                    onClick: function() {
                        window.location.href = '/';
                    }
                }
            ]
        });
    }
    else {
        window.sessionStorage.setItem('order_' + this.orderNum, this.orderNum);
    }
  },
  data () {
    return {
      orderNum: '',
      phone: ''
    }
  },
  methods: {
    linkToPay () {
        window.sessionStorage.removeItem('order_' + this.orderNum);
        window.location.href = 'https://qr.alipay.com/aex00025btj0nxkdzgh8rc3';
        // window.location.href = 'https://qr.alipay.com/aex091534huldp4tu02fc11';
    }
  }
}
</script>



<style>

.short_main .bangzhu {
    height: 100%;
    position: relative;
}

.short_main .bangzhu .cover2 {
    padding: 0 1.2rem;
}

.short_main .bangzhu .cover2  p{
    font-size: 0.7rem;
}

.short_main .bangzhu .cover2 .next a {
    display: inline-block;
    margin: 0 0.5rem;
    border: 1px solid #29BD42;
    color: #fff;
    background: #29BD42;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 5rem;
    border-radius:0
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
