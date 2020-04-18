<template>
    <div class="container join">
        <nav class="bar bar-nav" style="background: #1F72F4;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">关于加盟</h1>
        </nav>
        <div class="content" v-html="text">
        </div>
    </div>
</template>
<style>
.join .bar-nav ~ .content {
    top: 2.2rem;
}

.join .content {
    background: #fff;
}

.join img {
    width: 100%;
}

.join .content img{
     width: 100%;
}

.join .content font {
    font-size: 0.7rem;
}
</style>
<script>
import $ from 'zepto'
import * as RoutesConstatns from '../../constants/routes.constants'

export default {
  ready () {
    let self = this
    $.ajax({
      type: 'GET',
      url: RoutesConstatns.GET_CONFIGS + '?token=woingi929k48fj2372he8dn289kmoi3',
      dataType: 'json',
      success: function (data) {
        if (data.statusCode !== 200) {
          $.toast('获取内容失败')
        }
        else {
          let configs = data.body.config
          let text = ''
          self.updateTime = data.body.updateTime
          console.info(self.updateTime)
          for (let index = 0; index < configs.length; index ++) {
            let config = configs[index]
            if (config.key === 'join_us') {
              self.text = config.value
              break
            }
          }
        }
      },
      error: function (xhr) {
        console.info(JSON.parse(xhr.response).message)
      }
    })
  },
  data () {
    return {
      text: '',
      updateTime: ''
    }
  }
}
</script>
