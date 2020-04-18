<template>
    <div class="container myshots">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">我的二维码</h1>
        </nav>
        <div class="content">
            <div class="qr_code" style="text-align: center;">
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import * as util from '../../util/util'
import qrCode from '../../assets/js/jquery.qrcode.min'

export default {
  ready () {
    util.isLogin(function(userInfo) {
        $('.qr_code').qrcode({
            width: 200,
            height: 200,
            text: userInfo.qrCode
        });
    })
  }
}
</script>

<style scoped>
.list-block {
    margin: .5rem 0;
}

.myshots .bar-nav ~ .content {
  top: 5rem;
}

</style>
