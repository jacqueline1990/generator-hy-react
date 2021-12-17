import React, { ComponentType, LazyExoticComponent } from 'react';

type LazyComponent = () => Promise<{ default: ComponentType<any> }>;

type LazyPreloadComponent = LazyExoticComponent<ComponentType<any>> & {
  preload: LazyComponent;
};

/**
 * 懒加载中预加载
 * @param factory
 */
export function lazyWithPreload(factory: LazyComponent): LazyPreloadComponent {
  const Component = React.lazy(factory) as LazyPreloadComponent;
  Component.preload = factory;
  return Component;
}
