import Singleton from "../abstraction/Singleton";

export default class RouteContainer extends Singleton {
    protected static routes: {[k:string]: object[]};

    public put(module: string, routes: object[]): void {
        const obj = {...RouteContainer.routes};
        obj[module] = routes;
        RouteContainer.routes = {...obj};
    }

    public remove(module: string): void {
        const obj = {...RouteContainer.routes};
        delete obj[module];
        RouteContainer.routes = {...obj};
    }

    public getRoutes(loadOrder: string[] = []) {
        const order = 0 === loadOrder.length
            ? Object.keys(RouteContainer.routes)
            : loadOrder;

        let routes: object[] = [];

        order.forEach((k: string) => {
            if (RouteContainer.routes.hasOwnProperty(k)) {
                routes = [...routes, ...RouteContainer.routes[k]]
            }
        });

        return routes;
    }
}