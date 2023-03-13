/// <reference types="react" />
export declare function Loop<T>({ items, Component, }: {
    items: T[];
    Component: (props: {
        item: T;
        index: number;
    }) => JSX.Element;
}): JSX.Element;
