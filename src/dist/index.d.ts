/// <reference types="react" />
/// <reference types="react" />
import { BooleanKeys } from "./types";
export declare function useChangeHandler<T, K extends keyof T = keyof T>(obj: T, name: K): readonly [T[K], (value: T[K] | {
    target: {
        value: T[K];
    };
}) => void];
export declare function useInputChangeHandler<T, K extends keyof T = keyof T>(config: {
    obj: T;
    name?: K;
    path?: string;
}): readonly [T[K], (value: T[K] | {
    target: {
        value: T[K];
    };
}) => void, () => void, (evt: React.KeyboardEvent<HTMLInputElement>) => void, import("react").Dispatch<import("react").SetStateAction<T[K]>>];
export declare function useCheckHandler<T, K extends BooleanKeys<T> = BooleanKeys<T>>(config: {
    obj: T;
    name: K;
}): readonly [T[K], (value: boolean | {
    target: {
        checked: boolean;
    };
}) => void];
//# sourceMappingURL=index.d.ts.map