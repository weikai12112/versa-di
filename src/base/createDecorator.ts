
interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

export const serviceIds = new Map<string, ServiceIdentifier<any>>();
export const DI_TARGET = '$di$target';
export const DI_DEPENDENCIES = '$di$dependencies';
function storeServiceDependency(id: Function, target: Function, index: number): void {
    if ((target as any)[DI_TARGET] === target) {
        (target as any)[DI_DEPENDENCIES].push({ id, index });
    } else {
        (target as any)[DI_DEPENDENCIES] = [{ id, index }];
        (target as any)[DI_TARGET] = target;
    }
}
export function createDecorator<T>(serviceId: string): ServiceIdentifier<T> {

    if (serviceIds.has(serviceId)) {
        return serviceIds.get(serviceId)!;
    }

    /** 类声明时使用到装饰器，即将依赖写入构造函数数组中 */
    const id = <any>function (target: Function, _: string, index: number) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }

        storeServiceDependency(id, target, index);
    };

    id.toString = () => serviceId;

    serviceIds.set(serviceId, id);
    return id;
}