<template>
    <div class="container withdraw_records">
        <nav class="bar bar-nav" style="background: #4C81D9;">
            <a href="javascript:history.go(-1);">
                <svg class="icon icon-left" style="margin-left: -0.3rem;float: left;color: #fff;"><use xlink:href="#icon-left"></use></svg>
            </a>
            <h1 class="title" style="color: #fff;">提现记录</h1>
        </nav>
        <div class="content">
            <div>
                <table>
                    <thead class="user-tr">
                    <th class="user-col">申请时间</th>
                    <th class="user-col">金额</th>
                    <th class="user-col">银行卡</th>
                    <th class="user-col">状态</th>
                    </thead>
                    <tbody>
                    <template v-for="item in records">
                        <tr class="user-tr">
                            <td class="user-col" v-text="item.createTime | date 4"></td>
                            <td class="user-col">{{item.amount}}元</td>
                            <td class="user-col">{{item.card.bank + ' | 尾号' + item.card.cardNumber.substring(item.card.cardNumber.length - 4)}}</td>
                            <td class="user-col">
                                <template v-if="item.status == 0">
                                    正在审理
                                </template>
                                <template v-else>
                                    <template v-if="item.status == 1">
                                        成功
                                    </template>
                                    <template v-else>
                                        失败
                                    </template>
                                </template>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
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
        self.getUserWithdrawRecords();
    })
  },
  data () {
    return {
        token: '',
        records: []
    }
  },
  methods: {
    getUserWithdrawRecords () {
        $.showPreloader('加载中...')
        let self = this;
        $.ajax({
            type: 'GET',
            url: RoutesConstatns.GET_USER_WITHDRAW_RECORDS + '?token=' + this.token,
            dataType: 'json',
            success: function (data) {
                if (data.statusCode !== 200) {
                    $.alert('加载失败')
                }
                else {
                    self.records = data.body.list;
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
.list-block {
    margin: .5rem 0;
}

.withdraw_records .bar-nav ~ .content {
  top: 2.2rem;
  background: #FFF;
}

.withdraw_records  table {
    margin: 0 auto;
    width: 100%;
    text-align: center;
}

.withdraw_records  .user-tr {
    border-bottom: 1px dashed #D4D2D2;
}
.withdraw_records  .user-tr {
    border-bottom: 1px dashed #D4D2D2;
}

.withdraw_records .user-col {
    font-size: 0.75rem;
    border-right: 1px dashed #D4D2D2;
    padding: 0.4rem 0.8rem;
}

.withdraw_records .user-col:last-child {
    border-right: none;
}

</style>
