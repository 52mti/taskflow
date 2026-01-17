import request from './request'

export const findChildrenByCode = (code) => {
  return request({
    method: 'POST',
    url: `/general/dictionary/findChildrenByCode/${code}`,
    data: { code: code },
  })
}

export const getCustomer = () => {
  return request({
    method: 'POST',
    url: '/user/customer',
    data: {
      noFlow: true,
      pageSize: 99,
    },
  })
}
export const getMaterial = () => {
  return request({
    method: 'POST',
    url: '/project/material',
    data: {
      noFlow: true,
      pageSize: 99,
    },
  })
}
export const getSupplier = () => {
  return request({
    method: 'POST',
    url: '/user/supplier',
    data: {
      noFlow: true,
      pageSize: 99,
    },
  })
}
export const getConstructionTeam = () => {
  return request({
    method: 'POST',
    url: '/user/constructionTeam',
    data: {
      auditStatus: 1,
      noFlow: true,
      pageSize: 99,
    },
  })
}
export const getUnitDetailList = (projectId) => {
  return request({
    method: 'POST',
    url: '/project/unitDetail',
    data: {
      page: 1,
      pageSize: 99,
      projectId: projectId,
      constructionTeamId: '$NULL$',
    },
  })
}
