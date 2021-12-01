"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const common_models_1 = require("../models/common.models");
const common_helpers_1 = require("../helpers/common.helpers");
class Author {
    constructor({ name = null }) {
        this.name = {
            value: name,
            required: true,
            isValid: (name) => name && common_helpers_1.isString(name),
            type: 'string',
        };
    }
    get errorStates() {
        return common_helpers_1.getValidityStateOfModel(this);
    }
}
exports.Author = Author;
//# sourceMappingURL=authors.models.js.map