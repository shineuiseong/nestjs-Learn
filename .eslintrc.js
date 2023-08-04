module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowSpacing: ['error', { before: true, after: true }], // 화살표 함수의 스페이싱 설정
        singleQuote: true, // 작은따옴표 사용
        semi: false, // 세미콜론 사용하지 않음
        useTabs: false, // 탭 대신 스페이스 사용
        tabWidth: 2, // 탭의 너비
        trailingComma: 'none', // 후행 콤마 사용하지 않음
        printWidth: 80, // 한 줄의 최대 길이
        bracketSpacing: true, // 객체 리터럴의 괄호 사이에 공백 사용
        arrowParens: 'always', // 화살표 함수의 매개변수 괄호 사용
        endOfLine: 'auto', // 플랫폼에 맞게 개행문자 설정
      },
    ],
  },
};
