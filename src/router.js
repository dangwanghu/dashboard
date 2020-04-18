import $ from 'zepto'

export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/home'], resolve)
      }
    },
    '/user/login': {
      component (resolve) {
        require(['./views/user/login'], resolve)
      }
    },
    '/seller/qr_code': {
        component (resolve) {
            require(['./views/user/seller_qrcode'], resolve)
        }
    },
    '/product/detail': {
      component (resolve) {
          require(['./views/product/detail'], resolve)
      }
    },
    '/user/register': {
      component (resolve) {
          require(['./views/user/register'], resolve)
      }
    },
    '/product/pay': {
      component (resolve) {
          require(['./views/product/pay'], resolve)
      }
    },
    '/product/payQrCode': {
      component (resolve) {
          require(['./views/product/payQrCode'], resolve)
      }
    },
    '/user/customers': {
      component (resolve) {
          require(['./views/user/customers'], resolve)
      }
    },
    '/order/list': {
      component (resolve) {
          require(['./views/user/orders'], resolve)
      }
    },
    '/user/withdraw': {
      component (resolve) {
          require(['./views/user/withdraw'], resolve)
      }
    },
    '/withdraw/apply': {
      component (resolve) {
          require(['./views/withdraw/apply'], resolve)
      }
    },
    '/withdraw/records': {
      component (resolve) {
          require(['./views/withdraw/records'], resolve)
      }
    },
    '/user/passwd': {
        component (resolve) {
            require(['./views/user/passwd'], resolve)
        }
    },
    '/user/withdraw_passwd': {
      component (resolve) {
          require(['./views/user/withdraw_passwd'], resolve)
      }
    },
    '/user/profile': {
      component (resolve) {
          require(['./views/user/profile'], resolve)
      }
    },
    '/user/qrcode': {
      component (resolve) {
          require(['./views/user/my_qrcode'], resolve)
      }
    },
    '/user/info': {
      component (resolve) {
          require(['./views/user/user_info'], resolve)
      }
    },
    '/product/join': {
      component (resolve) {
          require(['./views/product/join'], resolve)
      }
    },
    '/bankcard/add': {
      component (resolve) {
          require(['./views/bankcard/add'], resolve)
      }
    },
    '/bankcard/list': {
      component (resolve) {
          require(['./views/bankcard/list'], resolve)
      }
    }
  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    if (toPath.replace(/[^/]/g, '').length > 1) {
      router.app.isIndex = false
    }
    else {
      let depath = toPath === '/' || toPath === '/rank'
      router.app.isIndex = depath ? 0 : 1
    }
    next()
  })

  router.afterEach(function ({to}) {
    // 解决SUI picker bug
    $.closeModal('.picker-modal.modal-in')
    $.refreshScroller()
  })
}
