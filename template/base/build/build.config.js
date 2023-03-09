module.exports = {
  dll: {
    dev: {
      cache: ".cache/dll/dev",
      entry: {
        vendor: ["react", "react-dom/client"],
      },
    },
    prod: {
      cache: ".cache/dll/prod",
      entry: {
        vendor: ["react", "react-dom/client"],
      },
    },
  },
};
