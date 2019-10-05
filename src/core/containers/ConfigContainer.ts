import {set, get} from "lodash";

class ConfigContainer {
    protected static instance: ConfigContainer;
    //
    protected static configs: {[k: string]: any};

    private constructor() {
        ConfigContainer.configs = {
            env: process.env
        }
    }

    static get new(): ConfigContainer {
        if (!ConfigContainer.instance) {
            ConfigContainer.instance = new ConfigContainer();
        }
        return ConfigContainer.instance;
    }

    get(from: string|null = null, def: any|null = null) {
        if (!from) {
            return ConfigContainer.configs;
        }
        return get(ConfigContainer.configs, from, def);
    }

    set(to: string, value: any) {
        return set(ConfigContainer.configs, to, value);
    }
}

export default ConfigContainer.new;