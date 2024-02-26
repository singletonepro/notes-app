module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],

  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>src/__mocks__/styleMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!uuid)/"],
  transform: {
    "^.+\\.m?js$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};
