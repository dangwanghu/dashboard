<template>
    <div class="container add_card">
        <nav class="bar bar-nav" style="background: #11BDA5;">
            <a href="/bankcard/list">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">添加银行卡</h1>
            <a class="icon pull-right" style="color: #FFF;font-size: 0.8rem;" @click="save">保存</a>
        </nav>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-management"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">银行卡号：</div>
                                <div class="item-input">
                                    <input type="text" id="cardNumber" @blur="analyseCardNumber(this.value)">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-coupon"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">所属银行：</div>
                                <div class="item-input">
                                    <input type="text" id="bank" readonly="true">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-plan2"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">开户行：</div>
                                <div class="item-input">
                                    <input type="text" id="deposit">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
    .add_card .list-block .item-title.label {
        width: auto
    }
    .add_card .bar-nav ~ .content {
       top: 0.45rem;
    }
</style>
<script>
import $ from 'zepto'
import * as RoutesConstatns from '../../constants/routes.constants'
import * as util from '../../util/util'

export default {
  ready () {
    let self = this;
    util.isLogin(function(userInfo) {
        self.initBanks();
        self.token = userInfo.token;
    })
  },
  data () {
    return {
        banks: [],
        token: ''
    }
  },
  methods: {
    save () {
      if ($('#cardNumber').val() === '') {
        $.toast('请填写银行卡号')
        return false
      }
      if ($('#bank').val() === '') {
        $.toast('银行卡号无法识别')
        return false
      }
      if ($('#deposit').val() === '') {
        $.toast('请填写开户行')
        return false
      }

      $.showPreloader('提交中...')
      $.ajax({
            type: 'POST',
            data: {
                bank: $('#bank').val(),
                deposit: $('#deposit').val(),
                cardNumber: $('#cardNumber').val(),
                token: this.token
            },
            url: RoutesConstatns.POST_BANK_CARD,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode === 200) {
                    $.toast('添加成功');
                    setTimeout(function() {
                        window.location.href = '/bankcard/list';
                    }, 2000);
                }
                else {
                    $.toast(data.message);
                }
            },
            error: function (xhr) {
                util.handleAjaxError(xhr.response)
            }
        })
    },
    initBanks () {
        let self = this;
        this.$http.get('/data/banks.json')
        .then((data) => {
          let banks = new Map();
          for (let item of data.data) {
            let bankEndIndex = item.bank.indexOf('银行');
            banks.set(item.code, item.bank.substring(0, bankEndIndex + 2))
          }
          self.banks = banks;
        })
    },
    analyseCardNumber () {
        let cardNumber = $('#cardNumber').val();

        if (cardNumber.length < 6) {
            return '';
        }
        let bank = this.banks.get(cardNumber.substring(0, 6));
        if (!bank) {
            bank = '';
            $.toast('银行卡号无法识别')
        }

        $('#bank').val(bank);
    }
  }
}
</script>
