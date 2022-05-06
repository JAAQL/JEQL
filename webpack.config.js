const path = require("path")

module.exports = [{
  entry: path.resolve(__dirname, "_JEQL_pre_package.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "JEQL_package.min.js",
    library: "JEQL",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "production",
},
{
  entry: path.resolve(__dirname, "_JEQL_pre_package.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "JEQL_package.js",
    library: "JEQL",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
}]