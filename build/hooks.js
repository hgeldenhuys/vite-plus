"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLength = exports.useCheckHandler = exports.useInputChangeHandler = exports.useChangeHandler = void 0;
const valtio_1 = require("valtio");
const react_1 = require("react");
const utils_1 = require("./utils");
function useChangeHandler(obj, name) {
    const snapshot = (0, valtio_1.useSnapshot)(obj);
    const value = snapshot[name];
    console.log(snapshot);
    return [
        value,
        (value) => {
            if (value.target)
                obj[name] = value.target.value;
            else
                obj[name] = value;
        },
    ];
}
exports.useChangeHandler = useChangeHandler;
function useInputChangeHandler(config) {
    const { obj, name, path } = config;
    const [value, setValue] = (0, react_1.useState)((0, utils_1.getPath)(obj, name || path));
    let unsub;
    (0, react_1.useEffect)(() => {
        unsub = (0, valtio_1.subscribe)(obj, (ops) => {
            console.log(ops);
            for (const op of ops) {
                if (op[1].length === 1) {
                    if (op[1][0] === name) {
                        setValue(op[2]);
                    }
                }
                else {
                    const path2 = op[1].join(".");
                    if (path2 === path) {
                        setValue(op[2]);
                    }
                }
            }
        });
        return unsub;
    }, [(0, utils_1.getPath)(obj, name)]);
    const onCommit = () => {
        unsub === null || unsub === void 0 ? void 0 : unsub();
        (0, utils_1.setPath)(obj, name, value);
    };
    const onChange = (value) => {
        if (value.target)
            setValue(value.target.value);
        else
            setValue(value);
    };
    const onKeyEvent = (evt) => {
        if (evt.key === "Enter")
            onCommit();
        if (evt.key === "Escape")
            setValue((0, utils_1.getPath)(obj, name));
    };
    return [value, onChange, onCommit, onKeyEvent, setValue];
}
exports.useInputChangeHandler = useInputChangeHandler;
function useCheckHandler(config) {
    const { obj, name } = config;
    const [value, setValue] = useChangeHandler(obj, name);
    const onChange = (value) => {
        if (value.target)
            setValue(value.target.checked);
        else
            setValue(value);
    };
    return [value, onChange];
}
exports.useCheckHandler = useCheckHandler;
function useLength(list) {
    const [length, setLength] = (0, react_1.useState)(list.length);
    (0, react_1.useEffect)(() => {
        return (0, valtio_1.subscribe)(list, (ops) => {
            if (length !== list.length)
                setLength(list.length);
        });
    }, []);
}
exports.useLength = useLength;
