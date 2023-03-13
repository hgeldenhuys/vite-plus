import { subscribe, useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import { getPath, setPath } from "./utils";
import { BooleanKeys } from "./types";

export function useChangeHandler<T, K extends keyof T = keyof T>(
  obj: T,
  name: K
) {
  const snapshot = useSnapshot(obj as any);
  const value = snapshot[name] as T[K];
  console.log(snapshot);
  return [
    value,
    (value: T[K] | { target: { value: T[K] } }) => {
      if ((value as any).target) obj[name] = (value as any).target.value;
      else obj[name] = value as any;
    },
  ] as const;
}

export function useInputChangeHandler<T, K extends keyof T = keyof T>(config: {
  obj: T;
  name?: K;
  path?: string;
}) {
  const { obj, name, path } = config;
  const [value, setValue] = useState<T[K]>(
    getPath(obj, (name as string) || (path as string))
  );
  let unsub: () => void;
  useEffect(() => {
    unsub = subscribe(obj as any, (ops) => {
      console.log(ops);
      for (const op of ops) {
        if (op[1].length === 1) {
          if (op[1][0] === name) {
            setValue(op[2] as any);
          }
        } else {
          const path2 = op[1].join(".");
          if (path2 === path) {
            setValue(op[2] as any);
          }
        }
      }
    });
    return unsub;
  }, [getPath(obj, name as string)]);

  const onCommit = () => {
    unsub?.();
    setPath(obj, name as string, value);
  };

  const onChange = (value: T[K] | { target: { value: T[K] } }) => {
    if ((value as any).target) setValue((value as any).target.value);
    else setValue(value as any);
  };

  const onKeyEvent = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") onCommit();
    if (evt.key === "Escape") setValue(getPath(obj, name as string));
  };

  return [value, onChange, onCommit, onKeyEvent, setValue] as const;
}

export function useCheckHandler<
  T,
  K extends BooleanKeys<T> = BooleanKeys<T>
>(config: { obj: T; name: K }) {
  const { obj, name } = config;
  const [value, setValue] = useChangeHandler<T, K>(obj, name);
  const onChange = (value: boolean | { target: { checked: boolean } }) => {
    if ((value as any).target) setValue((value as any).target.checked);
    else setValue(value as any);
  };

  return [value, onChange] as const;
}

export function useLength<T>(list: Array<T>) {
  const [length, setLength] = useState(list.length);
  useEffect(() => {
    return subscribe(list, (ops) => {
      if (length !== list.length) setLength(list.length);
    });
  }, []);
}
