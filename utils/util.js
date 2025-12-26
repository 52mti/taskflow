/**
 * 工具函数库
 */

/**
 * 补零函数：将数字转换为字符串，若不足两位则在前面补0
 * @param {number|string} n
 */
export const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 格式化日期时间
 * 输出格式：YYYY/MM/DD HH:mm:ss
 * @param {Date} date
 */
export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * 获取指定日期的整天范围
 * 输出格式：{ startTime: "YYYY-MM-DD 00:00:00", endTime: "YYYY-MM-DD 23:59:59" }
 * @param {Date|string|number} dateParam
 */
export const getDayRange = (dateParam) => {
  const date = new Date(dateParam)

  // 校验日期合法性
  if (isNaN(date.getTime())) {
    console.error('Invalid Date')
    return null
  }

  // 内部辅助补零函数
  const pad = (n) => n.toString().padStart(2, '0')

  /**
   * 内部构造日期字符串函数
   * @param {Date} d
   * @param {string} timeStr "00:00:00" 或 "23:59:59"
   */
  const buildDateTimeString = (d, timeStr) => {
    const year = d.getFullYear()
    const month = pad(d.getMonth() + 1)
    const day = pad(d.getDate())
    return `${year}-${month}-${day} ${timeStr}`
  }

  return {
    startTime: buildDateTimeString(date, '00:00:00'),
    endTime: buildDateTimeString(date, '23:59:59'),
  }
}
