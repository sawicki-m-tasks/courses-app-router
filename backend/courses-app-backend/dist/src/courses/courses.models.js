"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const path = require("path");
const common_models_1 = require("../models/common.models");
const common_helpers_1 = require("../helpers/common.helpers");
const items_helpers_1 = require("../helpers/items.helpers");
class Course {
    constructor({ title = null, description = null, duration = null, authors = null, }, { titleRequired = true, descriptionRequired = true, durationRequired = true, authorsRequired = true, } = {}) {
        this.filePath = path.join(common_helpers_1.bdMainPath, 'authors.json');
        this.title = {
            value: title,
            required: titleRequired,
            isValid: (title) => title && common_helpers_1.isString(title),
            type: 'string',
        };
        this.description = {
            value: description,
            required: descriptionRequired,
            isValid: (description) => description && common_helpers_1.isString(description),
            type: 'string',
        };
        this.duration = {
            value: duration,
            required: durationRequired,
            isValid: (duration) => duration && common_helpers_1.isNumber(duration),
            type: 'number',
        };
        this.authors = {
            value: authors,
            required: authorsRequired,
            isValid: (authors) => authors &&
                authors.length &&
                items_helpers_1.areAllItemsExist(authors, this.filePath, 'id'),
            type: 'string[] and those strings must be actual IDs.',
        };
    }
    get errorStates() {
        return common_helpers_1.getValidityStateOfModel(this);
    }
}
exports.Course = Course;
//# sourceMappingURL=courses.models.js.map