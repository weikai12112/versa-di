import React from "react";

/**
 * 闲时加载组件
 * @param importer 
 * @returns 
 */
export function lazyComponentLoadAtIdle<T extends React.ComponentType<any>>(importer: () => Promise<{ default: T }>) {
  let loaded: Promise<{ default: T }> | null = null;
  const load = () => loaded || (loaded = importer());
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(load);
  } else {
    setTimeout(load);
  }
  return React.lazy(() => load());
}