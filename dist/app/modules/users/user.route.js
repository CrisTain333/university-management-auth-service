"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const user_validate_1 = require("./user.validate");
// import usersController from './user.controller';
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(user_validate_1.UserValidate.userZodSchema), user_controller_1.UserController.createStudent);
exports.UserRoute = router;
