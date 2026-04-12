module.exports = {
  'auth-api': {
    input: 'http://localhost:8000/api/openapi.json',
    output: {
      target: './src/api/generated.ts',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        useTypeScript: false,
        mutator: {
          path: './src/api/apiClient.js',
          name: 'customInstance',
        },
      },
    },
  },
};