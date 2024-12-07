export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: [
		'**/tests/**/*.test.ts', // Chỉ tìm các tệp .test.ts trong thư mục tests
	],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
