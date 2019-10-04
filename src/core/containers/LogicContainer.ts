import {Logic} from "redux-logic";

class LogicContainer {
    protected static instance: LogicContainer;
    //
    protected static logics: {[k:string]: Logic[]};

    private constructor() {
        LogicContainer.logics = {}
    }

    static get new(): LogicContainer {
        if (!LogicContainer.instance) {
            LogicContainer.instance = new LogicContainer();
        }
        return LogicContainer.instance;
    }

    public put(module: string, logics: Logic[]): void {
        const obj = {...LogicContainer.logics};
        obj[module] = logics;
        LogicContainer.logics = {...obj};
    }

    public remove(module: string): void {
        const obj = {...LogicContainer.logics};
        delete obj[module];
        LogicContainer.logics = {...obj};
    }

    public all(loadOrder: string[] = []): Logic[] {
        const order = 0 === loadOrder.length
            ? Object.keys(LogicContainer.logics)
            : loadOrder;

        let logics: Logic[] = [];

        order.forEach((k: string) => {
            if (LogicContainer.logics.hasOwnProperty(k)) {
                logics = [...logics, ...LogicContainer.logics[k]]
            }
        });

        return logics;
    }
}

export default LogicContainer.new;