import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import request from '../../utils/request';
import CONFIG from './config';
import config from '../../config';

Page({
  data: {
    status: "",           // 任务状态
    tabTableList: [],     // 选项卡表格数据
    activeTab: 0,         // 当前激活的标签索引
    detailKeyList: [],    // 详情渲染列表（分组）
    btnList: [],          // 当前节点可操作按钮列表
    rejectReason: "",     // 驳回原因
    handleBeforeClose: null, // 弹窗关闭前的拦截器
    rejectDialogFocus: false,
    showRejectDialog: false,
    showApprovalDialog: false,
    entityId: "",         // 业务单据ID
    taskKey: "",          // 工作流任务节点Key
    formKey: "",          // 页面表单Key
    processInstanceId: "", // 流程实例ID
    showFlow: false,      // 是否显示流程图弹窗
    steps: [],            // 流程进度条步骤
    activeStep: 1         // 当前进度位置
  },

  /**
   * 统一按钮点击分发器
   */
  clickButton: function(e) {
    const index = e.currentTarget.dataset.index;
    const btn = this.data.btnList[index];
    // 根据 config.js 中定义的 action 名称动态调用本页方法
    if (this[btn.action]) {
      this[btn.action](btn.actionPayload);
    }
  },

  onLoad: function(options) {
    const { status, id, processDefinitionId, processInstanceId, formKey } = options;
    
    this.setData({ status, formKey });

    // status 为 "0" 通常代表从任务列表进入的“待办详情”
    if (status === "0") {
      this.setData({ entityId: id });
      this.fetchTaskDetail(id, processDefinitionId);
    } else {
      // 否则为“已办详情”，直接获取流程轴
      this.fetchWorkflow(processInstanceId);
    }
  },

  /**
   * 获取业务表单详情
   */
  fetchTaskDetail: function(id, configKey) {
    const pageConfig = CONFIG[configKey];

    request({
      url: pageConfig.url,
      method: "POST",
      data: { id }
    }).then(res => {
      const serverData = res.data;
      this.__initialData = serverData
      
      // 设置导航栏标题
      wx.setNavigationBarTitle({ title: pageConfig.title || "详情" });

      // 1. 根据 config 中的 isVisible 过滤按钮权限
      const visibleButtons = pageConfig.btnList.filter(btn => btn.isVisible(serverData));
      
      // 2. 预设驳回逻辑的拦截器
      const rejectBtn = visibleButtons.find(btn => btn.text === "驳回");
      
      this.setData({
        btnList: visibleButtons,
        taskKey: serverData.taskKey,
        processInstanceId: serverData.processInstanceId,
        handleBeforeClose: rejectBtn ? this.handleBeforeClose.bind(this, rejectBtn.actionPayload.url) : null
      });

      // 3. 解析详情字段分组 (DetailKeyList)
      let fieldGroups = [];
      pageConfig.formField.forEach(field => {
        if (field.label) {
          // 如果有 label，创建新分组
          fieldGroups.push({ title: field.label, list: [] });
        } else if (fieldGroups.length > 0) {
          const rawValue = serverData[field.key] || "";
          const isUrl = String(rawValue).startsWith("http");
          
          fieldGroups[fieldGroups.length - 1].list.push({
            title: field.title,
            value: field.valueFormatter(rawValue), // 调用 config 中的格式化工具
            fileValue: isUrl ? rawValue.split(",") : "" // 处理附件
          });
        }
      });

      // 4. 解析 Tab 表格数据
      let tabTables = [];
      if (pageConfig.tabList) {
        pageConfig.tabList.forEach(tab => {
          tabTables.push({
            title: tab.title,
            tableHeadList: tab.headerList,
            tableBodyList: serverData[tab.key]
          });
        });
      }

      this.setData({
        detailKeyList: fieldGroups,
        tabTableList: tabTables
      });
    });
  },

  /**
   * 获取并渲染工作流时间轴
   */
  fetchWorkflow: function(instanceId) {
    request({
      url: `/task/workflowTask/getTaskTimeline/${instanceId}`,
      method: "POST"
    }).then(res => {
      wx.setNavigationBarTitle({ title: "流程详情" });
      
      const timeline = res.data.map(item => ({
        text: item.name,
        desc: `${item.updated}\n执行人: ${item.executorName}`
      }));

      // 如果最后一个节点有完成时间，增加“已完成”标记
      if (res.data[res.data.length - 1].finishTime) {
        timeline.push({ text: "已完成" });
      }

      this.setData({
        steps: timeline,
        activeStep: timeline.length - 1
      });
    });
  },

  /**
   * 附件处理：图片预览或文档打开
   */
  onClickFile: function(e) {
    const fileUrl = e.currentTarget.dataset.file;
    const ext = fileUrl.slice(fileUrl.lastIndexOf(".") + 1).toLowerCase();
    const imgExts = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

    if (imgExts.includes(ext)) {
      wx.previewImage({ current: fileUrl, urls: [fileUrl] });
    } else {
      wx.showLoading({ title: "加载中..." });
      wx.downloadFile({
        url: fileUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: res.tempFilePath,
              fileType: ext,
              showMenu: true,
              fail: (err) => {
                Toast.fail("无法打开此格式文档")
              }
            });
          }
        },
        complete: () => wx.hideLoading()
      });
    }
  },

  // 重新提交
  handleReapply(payload) {
    wx.navigateTo({ url: `/pages/taskEdit/taskEdit?type=${payload.type}&initialData=${encodeURIComponent(JSON.stringify(this.__initialData))}` })
  },

  /**
   * 审批通过
   */
  handleApprove: function(payload) {
    const self = this;
    Dialog.confirm({
      title: "确定通过吗？",
      beforeClose: (action) => {
        return new Promise((resolve) => {
          if (action === 'confirm') {
            request({
              url: payload.url,
              method: "POST",
              data: {
                id: self.data.entityId,
                auditStatus: 1, // 1 代表通过
                formKey: self.data.formKey,
                taskKey: self.data.taskKey
              }
            }).then(() => {
              resolve(true);
              Toast.success("已通过");
              self.navigateBack();
            }).catch(() => {
              resolve(false);
              Toast.fail("审批失败");
            });
          } else {
            resolve(true);
          }
        });
      }
    });
  },

  /**
   * 审批驳回逻辑（点击驳回按钮时先弹框输入原因）
   */
  handleReject: function() {
    this.setData({ showRejectDialog: true });
    setTimeout(() => {
      this.setData({ rejectDialogFocus: true });
    }, 200);
  },

  onFieldChange(e) {
    // Vant 的值在 e.detail 中，原生 input 的值在 e.detail.value 中
    const value = e.detail; 

    this.setData({
      rejectReason: value
    });
  },
    
  /**
   * 驳回弹窗关闭前的提交逻辑
   */
  handleBeforeClose: function(apiUrl, action) {
    if (action === 'cancel') return Promise.resolve(true);
    
    if (!this.data.rejectReason) {
      wx.showToast({ title: "请输入驳回原因", icon: "none" });
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      request({
        url: apiUrl,
        method: "POST",
        data: {
          id: this.data.entityId,
          auditStatus: 2, // 2 代表驳回
          formKey: this.data.formKey,
          taskKey: this.data.taskKey,
          auditRemarks: this.data.rejectReason
        }
      }).then(() => {
        Toast.success("已驳回");
        resolve(true);
        this.navigateBack();
      }).catch(err => {
        Toast.fail(err.msg || "驳回失败");
        resolve(true);
      });
    });
  },

  /**
   * 文件上传逻辑（支持批量上传后保存到业务单据）
   */
  uploadFiles: function(payload) {
    const self = this;
    const { url: saveUrl, field: fieldName } = payload;

    wx.chooseMedia({
      count: 9,
      mediaType: ["image", "video"],
      success: (res) => {
        const token = wx.getStorageSync("token");
        const tokenName = wx.getStorageSync("tokenName");
        
        Toast.loading({ message: "上传中...", forbidClick: true, duration: 0 });

        // 构造上传 Promise 队列
        const uploadTasks = res.tempFiles.map(file => {
          return new Promise((resolve) => {
            wx.uploadFile({
              url: `${config.baseUrl}/general/file/upload`,
              filePath: file.tempFilePath,
              name: "file",
              header: { [tokenName]: token },
              success: (uploadRes) => {
                const data = JSON.parse(uploadRes.data);
                resolve(data.code === 200 ? data.data : "");
              },
              fail: () => resolve("")
            });
          });
        });

        Promise.all(uploadTasks).then(urls => {
          const validUrls = urls.filter(u => u !== "");
          if (validUrls.length === 0) {
            Toast.fail("上传失败");
            return;
          }

          Toast.loading({ message: "保存中...", forbidClick: true });

          // 将上传成功的 URL 拼接到业务单据中
          request({
            url: saveUrl,
            method: "POST",
            data: {
              id: self.data.entityId,
              formKey: self.data.formKey,
              taskKey: self.data.taskKey,
              [fieldName]: validUrls.join(",")
            }
          }).then(() => {
            Toast.success("保存成功");
            self.navigateBack();
          });
        });
      }
    });
  },

  showWorkflow: function() {
    this.fetchWorkflow(this.data.processInstanceId);
    this.setData({ showFlow: true });
  },

  closeWorkflow: function() {
    this.setData({ showFlow: false });
  },

  navigateBack: function() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      // 通知上一页需要刷新
      pages[pages.length - 2].setData({ refreshWhenShow: true });
    }
    wx.navigateBack();
  }
});