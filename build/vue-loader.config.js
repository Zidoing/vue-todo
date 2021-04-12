module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: idDev ? "[path]-[name]-[hash:base64:5]" : '[hash:base64:5]',
      camelCase: true,
    },
  }
};
