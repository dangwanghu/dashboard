<template>
  <div id="islider"></div>
</template>

<script>
import ISlider from '../assets/js/iSlider'
import * as RoutesConstatns from '../constants/routes.constants'
import * as util from '../util/util'

export default {
  data () {
    return {
      slider: null
    }
  },
  props: {
    url: ''
  },
  ready () {
    let self = this
    $.showPreloader('加载中...')
    $.ajax({
        type: 'GET',
        url: RoutesConstatns.GET_SYSTEM_CONFIG + '?key=product',
        dataType: 'json',
        success: function (data) {
            $.hidePreloader()
            if (data.statusCode !== 200) {
                $.alert('图片加载失败')
            }
            else {
                let product = data.body;
                window.sessionStorage.setItem('product', JSON.stringify(product));
                let imgs = product.banners.map((img) => {
                    return {
                        content: img
                    };
                });
                for (let i = 0; i < data.length; i++) {
                    imgs.push(data[i])
                }
                self.slider = new ISlider({
                    dom: self.$el,
                    data: imgs,
                    animateTime: 3000,
                    isVertical: false,
                    isLooping: true,
                    isDebug: false,
                    isAutoplay: true
                })
            }
        },
        error: function (xhr) {
            $.hidePreloader()
            util.handleAjaxError(xhr.response)
        }
    })
  }
}
</script>

<style>
#islider {
  width: 100%;
  position: relative;
  height: 10rem;
}
#islider  ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#islider li {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-pack: start;
  list-style: none;
  width: 100%;
  text-align: center;
  display: inline-block;
}


@media only screen and (min-width: 640px) {
  #islider li img {
    height: 100%;
    }
}

@media only screen and (max-width: 640px) {
  #islider li img {
   height: 100%;
  }
}
</style>
