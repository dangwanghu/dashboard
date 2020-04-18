<template>
    <div class="container">
        <nav class="bar bar-nav" style="background: #11BDA5;">
            <a href="/home">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">商品详情</h1>
        </nav>
        <div class="content productdetail">
            <slider url=""></slider>
            <div class="desc desc1">
                <span class="pTitle" v-text="product.title"></span>
            </div>
            <div class="desc desc2">
                <div>
                    <span></span><span><span style="font-size:0.7rem;">现价：</span><span class="red" style="font-size:1rem;">￥199.00</span></span>
                    <span></span><span style="margin-left:8%;font-size:0.7rem;text-decoration:line-through">￥{{parseFloat(product.orginPrice).toFixed(2)}}</span>
                    <span></span><span style="margin-left:8%;font-size:0.7rem;">销量：{{product.sellerCount}}瓶</span>
                </div>
            </div>
            <div class="desc desc2">
                <div class="sellerInfo">
                    <span style="margin-left: 0.52rem;color: #666666;line-height: 2.8em;height: 2.8rem;">
                        数量：暂每人限购1瓶，快快抢购~
                    </span>
                    <a class="submit-button button button-big button-fill" @click="buy">购买</a>
                </div>
                <div class="sellerInfo">
                    <span class="infoBlock">进口红酒</span>
                    <span class="infoBlock">保证正品</span>
                    <span class="infoBlock">{{product.sendGoodsTime}}发货</span>
                    <span class="infoBlock">{{product.sendGoodsFee}}</span>
                </div>
            </div>
            <div class="desc">
                <div class="buttons-tab" style="margin-left: 0.05rem;">
                    <a href="#tab1" class="tab-link active button">图文详情</a>
                    <a href="#tab2" class="tab-link button">进口属性</a>
                </div>
                <div class="content-block" style="padding:0">
                    <div class="tabs">
                        <div id="tab1" class="tab active">
                            <div class="content-block" style="border: 1px solid #E5E5E5;border-top: none;margin-left: 0.05rem;">
                                <div class="tr">
                                    <div class="td">
                                        <span class="feature">产品类别：</span><span class="value" v-text="product.desc.productType"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">品牌：</span><span class="value" v-text="product.desc.brand"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">是否进口：</span><span class="value" v-text="product.desc.isEntrance ? '是' : '否'"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">原产国/地区：</span><span class="value" v-text="product.desc.originPlace"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">等级：</span><span class="value" v-text="product.desc.level"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">葡萄酒类型：</span><span class="value" v-text="product.desc.wineType"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">葡萄品种：</span><span class="value" v-text="product.desc.grapeType"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">酒精含量：</span><span class="value" v-text="product.desc.alcohol"></span>
                                    </div>
                                    <div class="td" style="width:100%">
                                        <span class="feature">原料与配料：</span><span class="value" v-text="product.desc.material"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-block">
                                <div class="imgContent">
                                    <template v-for="img in product.desc.images">
                                        <img v-bind:src="img">
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div id="tab2" class="tab">
                            <div class="content-block" style="border: 1px solid #E5E5E5;border-top: none;margin-left: 0.05rem;">
                                <div class="tr">
                                    <div class="td">
                                        <span class="feature">原产国（地）：</span><span class="value" v-text="product.desc.entranceProp.place"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">有无原产地证：</span><span class="value" v-text="product.desc.entranceProp.isHasCert"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">货物清关状态：</span><span class="value" v-text="product.desc.entranceProp.clearanceStatus"></span>
                                    </div>
                                    <div class="td">
                                        <span class="feature">进口口岸：</span><span class="value" v-text="product.desc.entranceProp.importPort"></span>
                                    </div>
                                    <div class="td" style="width:100%;">
                                        <span class="feature">报关单号：</span><span class="value" v-text="product.desc.entranceProp.bgNum"></span>
                                    </div>
                                </div>
                                <div class="content-block">
                                    <div class="imgContent" style="margin-top: -3rem;">
                                        <template v-for="img in product.desc.entranceImages">
                                            <img v-bind:src="img">
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Slider from '../../components/Slider'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'
import $ from 'zepto'
import * as util from '../../util/util'
import * as RoutesConstatns from '../../constants/routes.constants'

export default {
  ready () {
    let product = window.sessionStorage.getItem('product')
    if (product && product !== '') {
        this.product = JSON.parse(product);
    }
    else {
        this.getProductDetail();
    }
  },
  data () {
    return {
        product: {
            desc: {
                entranceProp: {}
            }
        }
    }
  },
  methods: {
    getProductDetail () {
        let self = this;
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_SYSTEM_CONFIG + '?key=product',
            dataType: 'json',
            success: function (data) {
                if (data.statusCode !== 200) {
                    $.alert('图片加载失败')
                }
                else {
                    self.product = data.body;
                }
            },
            error: function (xhr) {
                util.handleAjaxError(xhr.response)
            }
        })
    },
    buy () {
        window.location.href = '/user/register?parent=' + this.$route.query.parent;
    }
  },
  components: {
    Slider,
    Bar,
    BarItem
  }
}
</script>

<style scoped>

.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.productdetail {
  background: #fff;
  top: 2.2rem !important;
}

.productdetail a.submit-button {
    background-color: #EB4643;
    line-height: 2.1rem !important;
    height: 2.1rem !important;
    width: 4rem;
    display: inline-block;
    float: right;
    margin-right: 0.4rem;
}

.productdetail  .content-block .tr{
    height: 8.5rem;
    padding-top: 0.8rem;
}

.productdetail  .content-block .tr .feature{
    color: #999;
}

.productdetail  .content-block .tr .value{
    color: #333;
}

.productdetail  .content-block .tr .td{
    width: 50%;
    display: inline-block;
    float: left;
    font-size: 0.65rem;
    padding-left: 0.8rem;
    padding-bottom: 0.5rem;
}

.productdetail .content-block .imgContent {
    line-height: 0;
}

.productdetail .content-block img {
    width: 100%;
    box-sizing: content-box;
}

.productdetail .buttons-tab .button {
    color: #655E5E;
    padding:0;
}

.productdetail .buttons-tab .button.active {
    border-left: 1px solid #E5E5E5;
    border-right: 1px solid #E5E5E5;
    border-top: 3px solid #EB4643;
    border-bottom: 1px solid #FFF;
}

.productdetail .desc {
    padding: 0.5rem 0.5rem 0 0.5rem;
    margin-top: 0.5rem;
}

.productdetail .desc .descTitle {
    border-bottom: 1px solid #26BB3F;
    margin-bottom: 0.8rem;
}

.productdetail .desc .descTitle .subTitle {
    background: #26BB3F;
    color: #fff;
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
}

.productdetail .desc1 {
    margin-top: 0;
    padding-top: 0.5rem;
}
.productdetail .desc1 .pTitle {
    width: 10rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size: 0.85rem;
    font-weight: 600;
}
.productdetail .desc2 {
    font-size: 0.75rem;
    margin-top: 0rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid #E8E8E8;
}
.productdetail .desc2 div {
    margin: 0.2rem 0.1rem
}
.productdetail .desc2 .sellerInfo {
    font-size: 0.7rem;
    margin-bottom: 1rem;
}
.productdetail .desc2 .pTitle {
    font-size: 0.75rem
}
.productdetail .desc2 .infoBlock {
    background: #eef1ff;
    color: #655E5E;
    margin: 0 2%;
    padding: 0.2rem 2.3%;
}

span.red{
  color: #e4393c;
  margin-right: 0.2rem;
}


</style>
