'use strict';
Object.defineProperty(exports, "__esModule", { value: true })
const { Controller } = require('egg');
const tslib_1 = require('tslib');
const router_1 = require('egg-ts-router');

/**
 * 控制器基类
 */
class  BaseController extends Controller {
  constructor (ctx) {
    super(ctx);
    this.OpService = this.service.comm.data;
    this.init();
  }

  init() {

  }

  /**
   * 设置服务
   * @param service
   */
  setService (service) {
    this.OpService = service;
  }

  /**
   * 配置分页查询
   * @param option
   */
  setPageOption (option) {
    this.pageOpton = option
  }

  /**
   * 设置操作实体
   * @param entity
   */
  setEntity (entity) {
    this.entity = entity;
  }

  /**
   * 获的query请求参数
   */
  getQuery () {
    return this.ctx.request.query;
  }

  /**
   * 获取body参数
   */
  getBody () {
    return this.ctx.request.body;
  }

  /** 
   * 分页查询数据
   */
  async page () {
    const result = await this.OpService.page(this.getQuery(), this.pageOpton, this.entity);
    this.res({ data: result });
  }

  /**
   * 获取列表
   */
  async list () {
    const result = await this.OpService.list(this.entity);
    this.res({ data: result })
  }

  /**
   * 获取详情
   */
  async info () {
    const result = await this.OpService.info(this.getQuery().id, this.entity);
    this.res({ data: result })
  }

  /** 
   * 新增
   */
  async add () {
    await this.OpService.add(this.getBody(), this.entity);
    this.res({ data: { result: true } });
  }

  /**
   * 更新单个
   */
  async update () {
    await this.OpService.update(this.getBody(), this.entity);
    this.res({ data: { result: true } });
  }

  /**
   * 删除多个
   */
  async delete () {
    await this.OpService.delete(this.getBody().ids, this.entity);
    this.res({ data: { result: true }})
  }

  /**
   * 返回数据
   * @param op 返回结果，返回失败需要单独配置
   */
  res (op) {
    const { ctx } = this;
    if (!op || !op.success) {
      ctx.body = {
        code: op? op.code || 1001 : 10001,
        data: op? op.data || {} : {},
        message: op? op.message || 'fail' : 'fail'
      }
      return
    }
    ctx.body = {
      code: op.code || 1000,
      message: op.message || 'success',
      data: op.data || {}
    }
  }
 }
 tslib_1.__decorate([
   router_1.default.get('/page'),
   tslib_1.__metadata('design:type', Funtion),
   tslib_1.__metadata('design.paramtypes', []),
   tslib_1.__metadata('design:returntype', Promise)
 ], BaseController.prototype, "page", null);
 tslib_1.__decorate([
  router_1.default.get('/list'),
  tslib_1.__metadata('design:type', Funtion),
  tslib_1.__metadata('design.paramtypes', []),
  tslib_1.__metadata('design:returntype', Promise)
], BaseController.prototype, "list", null);
tslib_1.__decorate([
  router_1.default.get('/info'),
  tslib_1.__metadata('design:type', Funtion),
  tslib_1.__metadata('design.paramtypes', []),
  tslib_1.__metadata('design:returntype', Promise)
], BaseController.prototype, "info", null);
tslib_1.__decorate([
  router_1.default.get('/add'),
  tslib_1.__metadata('design:type', Funtion),
  tslib_1.__metadata('design.paramtypes', []),
  tslib_1.__metadata('design:returntype', Promise)
], BaseController.prototype, "add", null);
tslib_1.__decorate([
  router_1.default.get('/update'),
  tslib_1.__metadata('design:type', Funtion),
  tslib_1.__metadata('design.paramtypes', []),
  tslib_1.__metadata('design:returntype', Promise)
], BaseController.prototype, "update", null);
tslib_1.__decorate([
  router_1.default.get('/delete'),
  tslib_1.__metadata('design:type', Funtion),
  tslib_1.__metadata('design.paramtypes', []),
  tslib_1.__metadata('design:returntype', Promise)
], BaseController.prototype, "delete", null);
exports.BaseController = BaseController;
