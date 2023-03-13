"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("./hooks");
function Wrap({ item, index, Component, }) {
    return (0, jsx_runtime_1.jsx)(Component, { item: item, index: index });
}
function Loop({ items, Component, }) {
    (0, hooks_1.useLength)(items);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item, i) => ((0, jsx_runtime_1.jsx)(Wrap, { Component: Component, item: item, index: i }, i))) }));
}
exports.Loop = Loop;
