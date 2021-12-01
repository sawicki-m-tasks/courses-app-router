"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const path = require("path");
const common_models_1 = require("../models/common.models");
const common_helpers_1 = require("../helpers/common.helpers");
const items_helpers_1 = require("../helpers/items.helpers");
class User {
    constructor({ name = null, email = null, password = null }, { nameRequired = false, emailRequired = true, passwordRequired = true, } = {}) {
        this.filePath = path.join(common_helpers_1.bdMainPath, 'users.json');
        this.name = {
            value: name,
            required: nameRequired,
            isValid: (name) => name && common_helpers_1.isString(name),
            type: 'string',
        };
        this.email = {
            value: email,
            required: emailRequired,
            isValid: (email) => email &&
                common_helpers_1.isString(email) &&
                /.+@[^@]+\.[^@]{2,}$/.test(email) &&
                (nameRequired
                    ? items_helpers_1.areAllItemsExist([email], this.filePath, 'email', true)
                    : true),
            type: `string and it should be an email${nameRequired ? ' or email already exists' : ''}`,
        };
        this.password = {
            value: password,
            required: passwordRequired,
            isValid: (password) => password &&
                common_helpers_1.isString(password) &&
                (nameRequired ? password.length >= 6 : true),
            type: `string${nameRequired ? ' and length should be 6 characters minimum' : ''}`,
        };
    }
    get errorStates() {
        return common_helpers_1.getValidityStateOfModel(this);
    }
}
exports.User = User;
//# sourceMappingURL=auth.models.js.map