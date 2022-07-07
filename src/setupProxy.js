const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://api.omanjobs.om",
      changeOrigin: true,
    }),
    createProxyMiddleware("/files", {
      target: "https://api.omanjobs.om",
      changeOrigin: true,
    })
  );
};
