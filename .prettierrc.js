module.exports = {
  // Настройки Prettier
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  // Добавьте настройку, чтобы Prettier форматировал TypeScript файлы
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
