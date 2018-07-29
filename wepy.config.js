const path = require("path");

const env = process.env.NODE_ENV || "development";
const wepyConfig = {
    wpyExt: ".wpy",
    build: {
        web: {
            htmlTemplate: path.join("src", "index.template.html"),
            htmlOutput: path.join("web", "index.html"),
            jsOutput: path.join("web", "index.js")
        }
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
            "pages": path.join(__dirname, "src/pages"),
            "assets": path.join(__dirname, "src/assets"),
            "components": path.join(__dirname, "src/components")
        },
        modules: ["node_modules"]
    },
    eslint: true,
    compilers: {
        // less: {
        //     compress: true
        // },
        /* sass: {
        outputStyle: 'compressed'
        }, */
        babel: {
            sourceMap: true,
            presets: [
                "env"
            ],
            plugins: [
                "transform-class-properties",
                "transform-decorators-legacy",
                "transform-object-rest-spread",
                "transform-export-extensions"
            ]
        }
    },
    plugins: {
        replace: {
            filter: /config\.js$/,
            config: [
                {
                    find: /__ENV__/g,
                    replace: `"${env}"`
                },
                {
                    find: /__VERSION__/g,
                    replace: `"0.0.1"`
                },
                {
                    find: /__TIMESTAMP__/g,
                    replace: +new Date()
                }
            ]
        }
    },
    appConfig: {
        noPromiseAPI: ["createSelectorQuery"]
    }
};

switch (env) {
    case "production":
        delete wepyConfig.compilers.babel.sourcesMap;
        // 压缩sass
        // wepyConfig.compilers['sass'] = {outputStyle: 'compressed'}

        // 压缩less
        wepyConfig.compilers["less"] = { compress: true };

        // 压缩js
        wepyConfig.plugins = Object.assign(wepyConfig.plugins, {
            uglifyjs: {
                filter: /\.js$/,
                config: {
                }
            },
            imagemin: {
                filter: /\.(jpg|png|jpeg)$/,
                config: {
                    jpg: {
                        quality: 80
                    },
                    png: {
                        quality: 80
                    }
                }
            }
        });
        break;
    case "localhost":
    case "development":
    case "testing":
    default:
        break;
}

module.exports = wepyConfig;
