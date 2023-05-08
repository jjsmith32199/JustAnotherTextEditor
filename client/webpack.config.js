const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// The following code is used to create a webpack configuration object that includes entry points, output settings, and various plugins
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // HTMLWebpackPlugin is used to generate the index.html file
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE Text Editor",
      }),
      // InjectManifest is used to generate the service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./sw.js",
      }),
      // WebpackPwaManifest is used to generate the manifest.json file
      new WebpackPwaManifest({
        name: "JATE Text Editor",
        short_name: "JATE",
        description: "A simple text editor",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        icons: [
          {
            src: "./src/images/logo.png",
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // This section is used to configure the webpack-dev-server by setting rules for processing CSS and JavaScript files
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};