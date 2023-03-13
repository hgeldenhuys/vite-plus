export type BooleanKeys<T> = {
    [k in keyof T]: T[k] extends boolean ? k : never;
}[keyof T];
//# sourceMappingURL=types.d.ts.map