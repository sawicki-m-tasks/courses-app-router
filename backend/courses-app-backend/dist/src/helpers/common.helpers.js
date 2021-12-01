"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidityStateOfModel = exports.getValuesFromModel = exports.isNumber = exports.isString = exports.bdMainPath = void 0;
const path = require("path");
const common_models_1 = require("../models/common.models");
exports.bdMainPath = path.join(__dirname, '..', '..', '..', 'bd');
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
function getValuesFromModel(model) {
    return Object.entries(model).reduce((acc, [key, { value }]) => {
        if (!value) {
            return acc;
        }
        return Object.assign(Object.assign({}, acc), { [key]: value });
    }, {});
}
exports.getValuesFromModel = getValuesFromModel;
async function getValidityStateOfModel(self) {
    const promises = Object.keys(self).map((key) => Promise.resolve(key)
        .then((key) => {
        const classProperty = self[key];
        if (classProperty.required && !classProperty.value) {
            return `'${key}' was missed.`;
        }
        return (classProperty.value && classProperty.isValid(classProperty.value));
    })
        .then((result) => {
        if (typeof result !== 'boolean') {
            return result;
        }
        const classProperty = self[key];
        return result ? null : `'${key}' should be a ${classProperty.type}`;
    }));
    return Promise.all(promises).then((keys) => {
        return keys.filter(Boolean);
    });
}
exports.getValidityStateOfModel = getValidityStateOfModel;
//# sourceMappingURL=common.helpers.js.map