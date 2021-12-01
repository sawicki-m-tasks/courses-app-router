"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAllItemsExist = exports.deleteItem = exports.editItem = exports.addItem = exports.getItem = exports.getAllItems = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const common_models_1 = require("../models/common.models");
const file_reader_helper_1 = require("./file-reader.helper");
const file_writer_helper_1 = require("./file-writer.helper");
function getAllItems(filePath) {
    return file_reader_helper_1.jsonReader.getWholeJson(filePath).pipe(operators_1.catchError((err) => {
        if (err.message === 'Error during file reading.') {
            return rxjs_1.of({
                successful: true,
                result: [],
            });
        }
        return rxjs_1.of(err);
    }));
}
exports.getAllItems = getAllItems;
function getItem(id, filePath) {
    return file_reader_helper_1.jsonReader
        .getSingleObject(filePath, { id })
        .pipe(operators_1.tap(({ result }) => {
        if (!result) {
            throw new common_1.HttpException({ successful: false, result: `Item with id - ${id} was not found` }, common_1.HttpStatus.NOT_FOUND);
        }
    }), operators_1.catchError((err) => {
        if (err.message === 'Error during file reading.') {
            throw new common_1.HttpException({ successful: false, result: `Item with id - ${id} was not found` }, common_1.HttpStatus.NOT_FOUND);
        }
        return rxjs_1.throwError(err);
    }));
}
exports.getItem = getItem;
function addItem(item, filePath) {
    return file_writer_helper_1.jsonWriter.addObject(filePath, item).pipe(operators_1.catchError((err) => {
        if (err.message === 'Error during file reading.') {
            return file_writer_helper_1.jsonWriter
                .createJSON(filePath, item)
                .pipe(operators_1.catchError((err) => rxjs_1.of(err)));
        }
        return rxjs_1.of(err);
    }));
}
exports.addItem = addItem;
function editItem(item, id, filePath) {
    return file_writer_helper_1.jsonWriter.editObject(filePath, item, id).pipe(operators_1.catchError((err) => {
        if (err.message === 'Error during renaming.') {
            throw new common_1.HttpException({ successful: false, result: `Item with id - ${id} was not found` }, common_1.HttpStatus.NOT_FOUND);
        }
        return rxjs_1.of(err);
    }));
}
exports.editItem = editItem;
function deleteItem(id, filePath) {
    return file_writer_helper_1.jsonWriter.deleteObject(filePath, id).pipe(operators_1.catchError((err) => {
        if (err.message === 'Error during renaming.') {
            throw new common_1.HttpException({ successful: false, result: `Item with id - ${id} was not found` }, common_1.HttpStatus.NOT_FOUND);
        }
        return rxjs_1.of(err);
    }));
}
exports.deleteItem = deleteItem;
function areAllItemsExist(ids, filePath, property, reverse = false) {
    return file_reader_helper_1.jsonReader
        .areAllItemsExistByProperty(ids, filePath, property)
        .toPromise()
        .then((allItemsExist) => {
        return reverse ? !allItemsExist : allItemsExist;
    });
}
exports.areAllItemsExist = areAllItemsExist;
//# sourceMappingURL=items.helpers.js.map