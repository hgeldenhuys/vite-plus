import { useLength } from "./hooks";

function Wrap<T>({
  item,
  index,
  Component,
}: {
  item: T;
  index: number;
  Component: (props: { item: T; index: number }) => JSX.Element;
}) {
  return <Component item={item} index={index} />;
}
export function Loop<T>({
  items,
  Component,
}: {
  items: T[];
  Component: (props: { item: T; index: number }) => JSX.Element;
}) {
  useLength(items);
  return (
    <>
      {items.map((item, i) => (
        <Wrap Component={Component} item={item} index={i} />
      ))}
    </>
  );
}
