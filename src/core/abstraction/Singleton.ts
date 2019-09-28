export default class Singleton {
    protected static instance: Singleton;


    protected constructor() {
    }

    static get new(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}