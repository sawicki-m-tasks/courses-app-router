"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonWriter = void 0;
const fs = require("fs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const common_models_1 = require("../models/common.models");
const file_processing_models_1 = require("../models/file-processing.models");
const file_reader_helper_1 = require("./file-reader.helper");
class JsonWriter {
    addObject(path, data) {
        const dataWithIDs = Object.assign(Object.assign({}, data), { id: uuid_1.v4() });
        return file_reader_helper_1.jsonReader.getLastCharacterPosition(path).pipe(operators_1.switchMap((result) => this._addObject(path, dataWithIDs, result)), operators_1.map((result) => {
            return result.successful
                ? { successful: true, result: dataWithIDs }
                : result;
        }));
    }
    deleteObject(path, id) {
        const tempFilePath = `${uuid_1.v4()}-temp.json`;
        let writer;
        let objectFound = 0;
        let count = 0;
        let isFirstIndex = true;
        return this.renameFile(path, tempFilePath).pipe(operators_1.tap(() => (writer = fs.createWriteStream(path, { flags: 'a+' }))), operators_1.switchMap(() => file_reader_helper_1.jsonReader.getObjectByObject(tempFilePath).pipe(operators_1.tap(({ parsedJsonObject, finished }) => {
            if (!finished) {
                count++;
            }
            if (parsedJsonObject && parsedJsonObject.id === id) {
                objectFound++;
            }
        }), operators_1.filter(({ parsedJsonObject, finished }) => finished || parsedJsonObject.id !== id), operators_1.map((objectInfo) => {
            if (isFirstIndex) {
                isFirstIndex = false;
                return Object.assign(Object.assign({}, objectInfo), { isFirstIndex: true });
            }
            return Object.assign(Object.assign({}, objectInfo), { isFirstIndex });
        }))), operators_1.tap((objectInfo) => this.writeToFile(objectInfo, writer)), operators_1.filter(({ finished }) => finished), operators_1.tap(() => writer.end()), operators_1.switchMap(() => this.deleteFile(tempFilePath)), operators_1.switchMap(() => count - objectFound === 0 ? this.deleteFile(path) : rxjs_1.of(null)), operators_1.map(() => ({
            successful: objectFound > 0,
            result: objectFound > 0
                ? `Object with id - ${id} was deleted.`
                : `Object with id - ${id} was not found.`,
        })));
    }
    editObject(path, data, id) {
        const tempFilePath = `${uuid_1.v4()}-temp.json`;
        let writer;
        let objectFound = null;
        return this.renameFile(path, tempFilePath).pipe(operators_1.tap(() => (writer = fs.createWriteStream(path, { flags: 'a+' }))), operators_1.switchMap(() => file_reader_helper_1.jsonReader.getObjectByObject(tempFilePath)), operators_1.map(({ isFirstIndex, finished, parsedJsonObject }) => {
            if (finished) {
                return {
                    finished,
                };
            }
            return {
                parsedJsonObject: this._editObject(parsedJsonObject, data, id),
                finished,
                isFirstIndex,
            };
        }), operators_1.tap((objectInfo) => this.writeToFile(objectInfo, writer)), operators_1.tap(({ parsedJsonObject }) => {
            if (!objectFound && parsedJsonObject && parsedJsonObject.id === id) {
                objectFound = parsedJsonObject;
            }
        }), operators_1.filter(({ finished }) => finished), operators_1.tap(() => writer.end()), operators_1.switchMap(() => this.deleteFile(tempFilePath)), operators_1.map(() => ({
            successful: !!objectFound,
            result: objectFound
                ? objectFound
                : `Object with id - ${id} was not found.`,
        })));
    }
    writeToFile({ isFirstIndex, finished, parsedJsonObject }, writer) {
        const stringToWrite = finished
            ? ']'
            : `${isFirstIndex ? '[' : ','}${JSON.stringify(parsedJsonObject)}`;
        writer.write(stringToWrite);
    }
    deleteFile(path) {
        return new rxjs_1.Observable((subscriber) => {
            fs.unlink(path, (err) => {
                if (err) {
                    subscriber.error({
                        successful: false,
                        message: 'Error during deletion.',
                    });
                }
                else {
                    subscriber.next();
                }
                subscriber.complete();
            });
        });
    }
    renameFile(path, tempPath) {
        return new rxjs_1.Observable((subscriber) => {
            fs.rename(path, tempPath, (err) => {
                if (err) {
                    subscriber.error({
                        successful: false,
                        message: 'Error during renaming.',
                    });
                }
                else {
                    subscriber.next();
                }
                subscriber.complete();
            });
        });
    }
    _editObject(parsedJsonObject, data, id) {
        if (parsedJsonObject.id !== id) {
            return parsedJsonObject;
        }
        return Object.assign(Object.assign({}, parsedJsonObject), data);
    }
    _addObject(path, data, { successful, position }) {
        return new rxjs_1.Observable((subscriber) => {
            const writer = fs.createWriteStream(path, {
                flags: 'r+',
                start: position !== null && position !== void 0 ? position : 0,
            });
            const dataAsStringifyArray = `${successful ? ',' : '['}${JSON.stringify(data)}]`;
            writer.on('close', () => {
                subscriber.next({
                    successful: true,
                    result: 'Object was added.',
                });
                subscriber.complete();
            });
            writer.on('error', () => {
                subscriber.next({
                    successful: false,
                    result: 'Error during file opening.',
                });
                subscriber.complete();
            });
            writer.once('open', () => {
                writer.write(dataAsStringifyArray, () => {
                    writer.end();
                });
            });
        });
    }
    createJSON(path, data) {
        const dataWithId = Object.assign(Object.assign({}, data), { id: uuid_1.v4() });
        return new rxjs_1.Observable((subscriber) => {
            const writer = fs.createWriteStream(path, { flags: 'w' });
            const dataAsStringifyArray = `[${JSON.stringify(dataWithId)}]`;
            writer.on('close', () => {
                subscriber.next({
                    successful: true,
                    result: dataWithId,
                });
                subscriber.complete();
            });
            writer.on('error', () => {
                subscriber.next({
                    successful: false,
                    result: 'Error during file opening.',
                });
                subscriber.complete();
            });
            writer.once('open', () => {
                writer.write(dataAsStringifyArray, () => {
                    writer.end();
                });
            });
        });
    }
}
exports.jsonWriter = new JsonWriter();
//# sourceMappingURL=file-writer.helper.js.map