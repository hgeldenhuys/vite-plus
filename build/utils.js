"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPath = exports.getPath = void 0;
function getPath(obj, path) {
    if (typeof path === 'string' && path.indexOf('.') > -1) {
        const parts = path.split('.');
        let current = obj;
        for (const part of parts)
            current = current === null || current === void 0 ? void 0 : current[part];
        return current;
    }
    else
        return obj[path];
}
exports.getPath = getPath;
function setPath(obj, path, value) {
    if (typeof path === 'string' && path.indexOf('.') > -1) {
        const parts = path.split('.');
        let current = obj;
        for (const part of parts.slice(0, parts.length - 1)) {
            current = current === null || current === void 0 ? void 0 : current[part];
        }
        current[parts[parts.length - 1]] = value;
    }
    else
        obj[path] = value;
}
exports.setPath = setPath;
