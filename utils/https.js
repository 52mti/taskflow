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

// 获取招投标列表
export const getBiddingList = () => {
  return request({
    method: 'POST',
    url: '/project/bidding',
    data: {
      noFlow: true,
      pageSize: 99,
      tenderStatus: 2, // COMPLETED
    },
  })
}

// 获取框架项目列表
export const getFrameworkProjectList = () => {
  return request({
    method: 'POST',
    url: '/project/frameworkProject',
    data: {
      noFlow: true,
      pageSize: 99,
    },
  })
}

// 获取订单项目列表（根据框架项目ID）
export const getProjectList = (frameworkProjectId) => {
  return request({
    method: 'POST',
    url: '/project/project',
    data: {
      noFlow: true,
      pageSize: 99,
      frameworkProjectId: frameworkProjectId,
    },
  })
}

// 获取单位明细结算列表（根据项目ID和施工队ID）
export const getUnitDetailSettlementList = () => {
  return request({
    method: 'POST',
    url: '/project/unitDetail',
    data: {
      page: 1,
      pageSize: 99,
    },
  })
}

// 获取施工队合作列表（根据项目ID）
export const getConstructionTeamCooperateList = () => {
  return request({
    method: 'POST',
    url: '/project/constructionTeamCooperate',
    data: {
      noFlow: true,
      pageSize: 99,
      auditStatus: 1, // 已通过
    },
  })
}
