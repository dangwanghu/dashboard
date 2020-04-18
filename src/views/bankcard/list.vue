<template>
    <div class="container card_list">
        <nav class="bar bar-nav" style="background: #11BDA5;">
            <a href="/user/profile">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">银行卡管理</h1>
            <a class="icon pull-right" style="color: #FFF;font-size: 0.8rem;" @click="addCard">添加</a>
        </nav>
        <div class="content">
            <div class="cards">
                <template v-for="item in bankCards">
                <div class="bank_card" v-bind:style="{background: item.bgColor}">
                    <div class="card_head">
                        <span>{{item.bank}}，</span><span>{{item.deposit}}</span>
                    </div>
                    <div class="card_body">
                        <p class="cardNo" style="padding-top: 0.3rem;float:left;margin: 0;margin-right: 0.2rem;">
                            *** **** ****
                        </p>
                        <p class="cardNo">
                           {{item.cardNumber && item.cardNumber.substring(item.cardNumber.length - 4)}}
                        </p>
                    </div>
                    <span class="del_card" @click="deleteCard($index)">
                        <svg class="icon" style="width: 1.85rem;height: 1.2rem;color:#3d4145"><use xlink:href="#icon-remove"></use></svg>
                    </span>
                </div>
                </template>
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
        self.queryBankList();
    })
  },
  data () {
    return {
        bankCards: [],
        token: ''
    }
  },
  methods: {
    addCard () {
        util.isLogin(function() {
            window.location.href = '/bankcard/add';
        })
    },
    deleteCard (index) {
        let self = this;
        $.modal({
            title: '温馨提示',
            text: '确认要移除该银行卡？',
            buttons: [
                {
                    text: '是的',
                    onClick: function() {
                        $.showPreloader('提交中...')
                          $.ajax({
                                type: 'DELETE',
                                data: {
                                    _id: self.bankCards[index]._id,
                                    token: self.token
                                },
                                url: RoutesConstatns.DELETE_BANK,
                                dataType: 'json',
                                success: function (data) {
                                    $.hidePreloader()
                                    if (data.statusCode === 200) {
                                        $.toast('移除成功');
                                        self.bankCards.splice(index, 1)
                                    }
                                    else {
                                        $.toast(data.message);
                                    }
                                },
                                error: function (xhr) {
                                    util.handleAjaxError(xhr.response)
                                }
                          })
                    }
                },
                {
                    text: '再考虑下',
                    onClick: function() {
                    }
                }
            ]
        });
    },
    queryBankList () {
        $.showPreloader('加载中...')
        let self = this;
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_BANK_CARDS + '?token=' + this.token,
            dataType: 'json',
            success: function (data) {
                $.hidePreloader()
                if (data.statusCode !== 200) {
                    $.alert('加载失败')
                }
                else {
                    self.bankCards = data.body.list;

                    // 生成随机颜色
                    let colors = ['#E9517A', '#0DA1B0', '#4064AE', '#C5862B'];
                    for (let bank of self.bankCards) {
                        let colorIndex = parseInt(Math.random() * colors.length + 1, 10) - 1;
                        bank.bgColor = colors[colorIndex];
                    }
                }
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

.card_list .bar-nav ~ .content {
  top: 2.2rem;
  background: #FFF;
}

.card_list .cards {
  padding: 1rem;
}

.card_list .cards .bank_card {
    margin: 0.8rem 0;
    color: #FFF;
    border-radius: 6px;
    padding: 0.6rem 1rem;
}

.card_list .cards .bank_card .card_body .cardNo{
    font-size: 1.3rem;
}

.card_list .cards .bank_card  {
    position: relative;
}

.card_list .cards .bank_card .del_card{
    position: absolute;
    right: 2px;
    top: 0;
    padding: 0.45rem 0;
}

</style>
