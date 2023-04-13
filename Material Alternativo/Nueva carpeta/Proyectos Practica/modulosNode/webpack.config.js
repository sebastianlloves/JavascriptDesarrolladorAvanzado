const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  path = require("path");

module.exports = {
  entry: {
    js: "./src/index.js",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]", //Manejo de la subida de los archivos (nombres hasheados)
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: ["file-loader?name=assets/[name].[ext]", "image-webpack-loader"],
      },
      {
        test: /\.(woff)$/i,
        use: ["file-loader?name=assets/[name].[ext]"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
