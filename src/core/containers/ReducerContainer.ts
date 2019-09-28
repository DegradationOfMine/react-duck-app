import {ReducersMapObject} from "redux";

export default class ReducerContainer {
    protected static instance: ReducerContainer;
    //
    protected static reducers: {[k:string]: object};

    private constructor() {
        ReducerContainer.reducers = {}
    }

    static get new(): ReducerContainer {
        if (!ReducerContainer.instance) {
            ReducerContainer.instance = new ReducerContainer();
        }
        return ReducerContainer.instance;
    }

    public put(module: string, reducers: object): void {
        const obj = {...ReducerContainer.reducers};
        obj[module] = reducers;
        ReducerContainer.reducers = {...obj};
    }

    public remove(module: string): void {
        const obj = {...ReducerContainer.reducers};
        delete obj[module];
        ReducerContainer.reducers = {...obj};
    }

    public getReducers(loadOrder: string[] = []): ReducersMapObject {
        let reducers: {[k: string]: any} = {};

        if (0 < loadOrder.length) {
            loadOrder.forEach((k: string) => {
                if (ReducerContainer.reducers.hasOwnProperty(k)) {
                    reducers[k] = ReducerContainer.reducers[k]
                }
            });
        } else {
            reducers = ReducerContainer.reducers
        }


        return reducers;
    }
}