module.exports = {
  'files': './dist/**/*.css, ./dist/**/*.js, ./dist/**/*.html',
  'server': {
    baseDir: './dist/',
    index: 'index.html',
  },
  // 'server': false,
  'proxy': false,
  // 'proxy': 'localhost:3000',
  'port': 3000,
};
