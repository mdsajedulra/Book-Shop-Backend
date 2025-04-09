"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
exports.ProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        author: zod_1.z.string(),
        price: zod_1.z.number(),
        category: zod_1.z.enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"]),
        description: zod_1.z.string(),
        quantity: zod_1.z.number(),
        inStock: zod_1.z.boolean()
    })
});
