import request from './request'

export const findChildrenByCode = (code) => {
  return request({
    method: 'POST',
    url: `/general/dictionary/findChildrenByCode/${code}`,
    data: { code: code },
  })
}
