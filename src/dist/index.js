import { subscribe, useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import { getPath, setPath } from "./utils";
export function useChangeHandler(obj, name) {
    const snapshot = useSnapshot(obj);
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
export function useInputChangeHandler(config) {
    const { obj, name, path } = config;
    const [value, setValue] = useState(getPath(obj, name || path));
    let unsub;
    useEffect(() => {
        unsub = subscribe(obj, (ops) => {
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
    }, [getPath(obj, name)]);
    const onCommit = () => {
        unsub === null || unsub === void 0 ? void 0 : unsub();
        setPath(obj, name, value);
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
            setValue(getPath(obj, name));
    };
    return [value, onChange, onCommit, onKeyEvent, setValue];
}
export function useCheckHandler(config) {
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
