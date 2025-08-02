import { DI_DEPENDENCIES } from "./createDecorator";

type Factory<T = any> = (...args: any[]) => T;
type Class<T = any> = new (...args: any[]) => T;

export class Container {
    public providers = new Map<any, Factory>();
    public singletons = new Map<any, any>();

    constructor(private options: { parent?: Container } = {}) {
        const parent = this.options.parent;
        if (parent) {
            parent.providers.forEach((provider, token) => {
                if (!this.providers.has(token)) {
                    this.providers.set(token, provider);
                }
            });
            parent.singletons.forEach((instance, token) => {
                if (!this.singletons.has(token)) {
                    this.singletons.set(token, instance);
                }
            }
            );
        }
    }

    // 解析装饰器依赖元数据
    private getDependencies(target: Function): any[] {
        const depsMeta = (target as any)[DI_DEPENDENCIES] as Array<{ id: any, index: number }>;
        if (!depsMeta || !Array.isArray(depsMeta)) return [];
        // 按参数顺序排列
        const sorted = depsMeta.slice().sort((a, b) => a.index - b.index);
        return sorted.map(dep => dep.id);
    }

    registerSingleton(token: any, constructor: Factory | Class, args: any[] = []) {
        const self = this;
        /** provider以装饰器函数作为key，初始化构造函数的方法作为value */
        this.providers.set(token, function () {
            /** 如果已经创建了实例则直接返回 */
            if (!self.singletons.has(token)) {
                /** 未创建实例，准备创建实例 */
                let instance;
                if (/^class /.test(constructor.toString())) {
                    // 通过装饰器依赖元数据自动注入，获取到依赖的装饰器函数
                    const depIds = self.getDependencies(constructor);
                    /** 初始化依赖服务并作为参数传入 */
                    const dependencies = depIds.map(depId => self.resolve(depId));
                    instance = new (constructor as Class)(...args, ...dependencies);
                } else {
                    throw new Error(`Cannot register non-class as singleton: ${token}`);
                }
                /** 将创建的实例存入单例映射 */
                self.singletons.set(token, instance);
            }
            return self.singletons.get(token);
        });
    }

    unregister(token: any) {
        this.providers.delete(token);
        this.singletons.delete(token);
    }

    resolve<T = any>(token: any, ...args: any[]): T {
        const provider = this.providers.get(token);
        if (!provider) throw new Error(`No provider for ${token}`);
        return provider(...args);
    }

    getService<T = any>(token: any): T {
        const instance = this.singletons.get(token);
        if (!instance) {
            this.resolve(token); // 确保实例化
            return this.singletons.get(token) as T;
        };
        return instance;
    }

    createInstance<T = any>(constructor: Class<T>, args: any[] = []): T {
        const self = this;
        let instance;
        if (/^class /.test(constructor.toString())) {
            // 通过装饰器依赖元数据自动注入，获取到依赖的装饰器函数
            const depIds = self.getDependencies(constructor);
            /** 初始化依赖服务并作为参数传入 */
            const dependencies = depIds.map(depId => self.resolve(depId));
            instance = new (constructor as Class)(...args, ...dependencies);
        } else {
            throw new Error(`Cannot createInstance because it is not class: ${constructor.name}`);
        }
        return instance;
    }
}