module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript
    testEnvironment: 'node', // Use Node.js environment for testing
    testMatch: [
        '**/__tests__/**/*.test.ts', // Match all .test.ts files in __tests__ directories and subdirectories
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Include TypeScript and JavaScript file extensions
};
process.env.DATABASE_URL='mongodb://localhost:27017/bumblebee_test';