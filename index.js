"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const egg_1 = require("egg");
const router_1 = require("egg-cool-router");
/**
 * 控制器基类
 */
class BaseController extends egg_1.Controller {
    constructor(ctx) {
        super(ctx);
        this.OpService = this.service.comm.data;
        this.init();
    }
    /**
     * 初始化
     */
    init() {
    }
    /**
     * 设置服务
     * @param service
     */
    setService(service) {
        this.OpService = service;
    }
    /**
     * 配置分页查询
     * @param option
     */
    setPageOption(option) {
        this.pageOption = option;
    }
    /**
     * 设置操作实体
     * @param entity
     */
    setEntity(entity) {
        this.entity = entity;
    }
    /**
     * 获得query请求参数
     */
    getQuery() {
        return this.ctx.request.query;
    }
    /**
     * 获得body请求参数
     */
    getBody() {
        return this.ctx.request.body;
    }
    /**
     * 分页查询数据
     */
    async page() {
        const result = await this.OpService.page(this.getQuery(), this.pageOption, this.entity);
        this.res({ data: result });
    }
    /**
     * 数据列表
     */
    async list() {
        const result = await this.OpService.list(this.entity);
        this.res({ data: result });
    }
    /**
     * 信息
     */
    async info() {
        const result = await this.OpService.info(this.getQuery().id, this.entity);
        this.res({ data: result });
    }
    /**
     * 新增
     */
    async add() {
        await this.OpService.add(this.getBody(), this.entity);
        this.res();
    }
    /**
     * 修改
     */
    async update() {
        await this.OpService.update(this.getBody(), this.entity);
        this.res();
    }
    /**
     * 删除
     */
    async delete() {
        await this.OpService.delete(this.getBody().ids, this.entity);
        this.res();
    }
    /**
     * 返回数据
     * @param op 返回配置，返回失败需要单独配置
     */
    res(op) {
        if (!op) {
            this.ctx.body = {
                code: 1000,
                message: 'success',
            };
            return;
        }
        if (op.isFail) {
            this.ctx.body = {
                code: op.code ? op.code : 1001,
                data: op.data,
                message: op.message ? op.message : 'fail',
            };
        }
        else {
            this.ctx.body = {
                code: op.code ? op.code : 1000,
                message: op.message ? op.message : 'success',
                data: op.data,
            };
        }
    }
}
tslib_1.__decorate([
    router_1.default.get('/page'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "page", null);
tslib_1.__decorate([
    router_1.default.get('/list'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "list", null);
tslib_1.__decorate([
    router_1.default.get('/info'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "info", null);
tslib_1.__decorate([
    router_1.default.post('/add'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "add", null);
tslib_1.__decorate([
    router_1.default.post('/update'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "update", null);
tslib_1.__decorate([
    router_1.default.post('/delete'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "delete", null);
exports.BaseController = BaseController;