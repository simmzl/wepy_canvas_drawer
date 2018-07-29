const env = __ENV__;
const version = __VERSION__;
const buildTimestamp = __TIMESTAMP__;

const appConfig = {
    localhost: {
    },
    development: {
    },
    testing: {
    },
    beta: {
    },
    production: {
    }
};

export default {
    env,
    version,
    buildTimestamp,
    ...appConfig[env]
};
