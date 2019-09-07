function defineVars(env = {}, isProd= false) {
    const output = {};

    output['NODE_ENV'] = isProd ? '"production"' : '"development"';

    Object
        .keys(env)
        .forEach(key => {
            if (key.startsWith('APP_')) {
                output[key] = `"${env[key] || ''}"`
            }
        });

    return output;
}

module.exports.defineVars = defineVars;