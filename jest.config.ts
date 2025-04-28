import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@emails/(.*)$": "<rootDir>/src/emails/$1",
    "^@jobs/(.*)$": "<rootDir>/src/jobs/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@logging/(.*)$": "<rootDir>/src/logging/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
};

export default config;
