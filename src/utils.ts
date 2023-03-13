export function getPath(obj: any, path: string | symbol) {
  if (typeof path === "string" && path.indexOf(".") > -1) {
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) current = current?.[part];
    return current;
  } else return (obj as any)[path];
}

export function setPath(obj: any, path: string | symbol, value: any) {
  if (typeof path === "string" && path.indexOf(".") > -1) {
    const parts = path.split(".");
    let current = obj;
    for (const part of parts.slice(0, parts.length - 1)) {
      current = current?.[part];
    }
    current[parts[parts.length - 1]] = value;
  } else (obj as any)[path] = value;
}
