"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(payload);
    return result;
});
// get product
const getProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    console.log('main query obj', query);
    console.log('Copy query obj', queryObj);
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchableFileds = ['title', 'author', 'category'];
    const searchQuery = product_model_1.ProductModel.find({
        $or: searchableFileds.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    // filtering
    const excludeFields = [
        'searchTerm',
        'sort',
        'limit',
        'page',
        'minPrice',
        'maxPrice',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    const filterQuery = searchQuery.find(queryObj);
    //price filter query by price ranage
    let minPrice = 0;
    let maxPrice = 50000;
    if (query.maxPrice && query.minPrice) {
        minPrice = Number(query.minPrice);
        maxPrice = Number(query.maxPrice);
    }
    const priceFilterQuery = filterQuery.find({
        price: { $gte: minPrice, $lte: maxPrice },
    });
    // sort query
    let sort = '-createdAt';
    if (query.sort) {
        sort = query.sort;
    }
    const sortQuery = priceFilterQuery.sort(sort);
    let page = 1;
    let limit = 100;
    let skip = 0;
    if (query.limit) {
        limit = Number(query.limit);
    }
    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = yield paginateQuery.limit(limit);
    return limitQuery;
});
const getSpecificProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(id);
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(id);
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.productServices = {
    createProduct,
    getProduct,
    getSpecificProduct,
    deleteProduct,
    updateProduct,
};
