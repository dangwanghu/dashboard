<template>
    <div class="container">
        <div class="content short_main" style="background: #fff;">
            <div class="bangzhu">
                <div class="cover2">
                    <div style="text-align: center;margin-top:2rem;">
                        <svg class="icon" style="width: 2rem;height: 3.5rem;color: #15B9D5;margin-right: 0.5rem;"><use xlink:href="#icon-ok"></use></svg>
                        <h3 style="display: inline-block;">恭喜您，注册成功!
                        </h3>
                        <div style="text-align: center;">
                            <p>
                                <span style="margin-left: 1.2rem;">订单号：</span><span style="color: #15B9D5;">{{orderNum}}</span>
                            </p>
                            <p>
                                <span>代理商编号：</span><span style="color: #15B9D5;">{{phone}}</span>
                            </p>
                            <span style="font-size:0.6rem;">提示：请复制您的代理商编号，用于填写支付信息</span>
                        </div>
                        <div class="next" style="margin: 1rem 2rem;">
                            <img src="/img/tianpengfeiqrcode.png" width="100%"/>
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
  },
  data () {
    return {
      orderNum: '',
      phone: ''
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
