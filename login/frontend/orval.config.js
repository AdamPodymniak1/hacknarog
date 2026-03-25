module.exports = {
  'auth-api': {
    input: 'http://localhost:8000/api/openapi.json',
    output: {
      target: './src/ts/generated.ts',
      client: 'axios',
      mode: 'single',
      httpClient: 'axios',
      override: {
        useTypeScript: false,
      },
    },
  },
};