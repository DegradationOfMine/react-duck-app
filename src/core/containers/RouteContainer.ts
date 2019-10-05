class RouteContainer {
    protected static instance: RouteContainer;
    //
    protected static routes: {[k:string]: object[]};

    private constructor() {
        RouteContainer.routes = {};
    }

    static get new(): RouteContainer {
        if (!RouteContainer.instance) {
            RouteContainer.instance = new RouteContainer();
        }

        return RouteContainer.instance;
    }

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

    public all(loadOrder: string[] = []) {
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

export default RouteContainer.new;