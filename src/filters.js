
let format = (value) => {
  return value >= 10 ? value : '0' + value
}

let getWeekDay = (value) => {
  if (value === 0) {
    return '周日'
  }
  else if (value === 1) {
    return '周一'
  }
  else if (value === 2) {
    return '周二'
  }
  else if (value === 3) {
    return '周三'
  }
  else if (value === 4) {
    return '周四'
  }
  else if (value === 5) {
    return '周五'
  }
  else if (value === 6) {
    return '周六'
  }
}

/**
 * 时间格式化
 */
export const dateFilter = (time, type) => {
  time = time !== '' ? new Date(time).valueOf() : new Date().valueOf()
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  let cal = date.getDay()
  let result
  switch (type) {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`
      break
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
      break
    case 4:// 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
      break
    case 5: // 2015年01月05 11:12
      result = `${year}年${format(month)}月${format(day)}日 ${format(hours)}:${format(minutes)}`
      break
    case 6: // 2015年01月05
      result = `${year}年${format(month)}月${format(day)}日 ${getWeekDay(cal)}`
      break
  }
  return result
}

export const handleLongestText = (text, len, isBefore) => {
  if (!text || text.length === 0) {
    return ''
  }
  if (isBefore === 1) {
    if (len < text.length) {
      return text.substring(0, len)
    }
    return text
  }
  else {
    if (len < text.length) {
      return text.substring(len)
    }
    return ''
  }
}

export const statusDesc = (value) => {
  if (value === 0) {
    return '待审核'
  }
  else if (value === 1) {
    return '审核不通过'
  }
  else if (value === 2) {
    return '进行中'
  }
  else if (value === 3) {
    return '已结束'
  }
}

export const dateDiff = (dateTimeStamp) => {
  let date = new Date()
  let date1 = date.getTime() - new Date(dateTimeStamp).getTime()

  // 计算出相差天数
  let days = Math.floor(date1 / (24 * 3600 * 1000))

  // 计算出小时数
  let leave1 = date1 % (24 * 3600 * 1000)
  let hours = Math.floor(leave1 / (3600 * 1000))

  // 计算相差分钟数
  let leave2 = leave1 % (3600 * 1000)
  let minutes = Math.floor(leave2 / (60 * 1000))

  return days + '天' + hours + '小时' + minutes + '分钟'
}
