import $ from 'zepto'

// 打印钩子函数运行的时间
export const hookTime = (component, hookFnName) => {
  let date = new Date()
  let m = date.getMinutes()
  let s = date.getSeconds()
  let ms = date.getMilliseconds()
  console.log(`${component} ${hookFnName} ${m}-${s}-${ms}`)
}

// 加载动画
export const loader = {
  show () {
    if ($('.ball-beat')[0]) {
      return
    }
    let modalContainer = document.body
    $(modalContainer).append('<div class="loader-inner ball-beat"><div></div><div></div><div></div></div>')
  },
  hide () {
    $('.ball-beat').remove()
  }
}

export function handleAjaxError (response) {
  response = JSON.parse(response)
  if (response.statusCode === 401) {
    $.alert('没有权限')
  }
  if (response.statusCode === 504) {
    $.alert('登录过期，请重新登录')
    window.location.href = '/user/login'
  }
}

export function formatStr (str) {
  return function () {
    if (arguments.length === 0) return str
    let temp
    let i
    for (temp = str, i = 0; i < arguments.length; i++) {
      temp = temp.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i])
    }
    return temp
  }
}

export function isLogin (cb) {
    let userInfo = window.sessionStorage.getItem('userInfo')
    if (!userInfo || userInfo === '') {
        $.toast('未登录');
        setTimeout(function() {
            window.location.href = '/user/login';
        }, 1000);
    }
    else {
        cb(JSON.parse(userInfo));
    }
}
