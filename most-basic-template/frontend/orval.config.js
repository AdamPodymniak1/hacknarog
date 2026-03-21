module.exports = {
  'my-app-api': {
    input: 'http://localhost:8000/api/openapi.json',
    output: {
      target: './src/api/generated.js',
      client: 'react-query',
    },
  },
};