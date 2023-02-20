import JWT, { type VerifyOptions, type SignOptions } from "jsonwebtoken";

import { Key } from "@thechamomileclub/database";

import { APP_SECRET } from "../config";

export default class AuthService {
	generateAuthLink(accessKey: Pick<Key, "challenge" | "id">) {
		const isDevelopment = process.env.NODE_ENV === "development";

		const host = isDevelopment ? "http://localhost:3000" : "https://app.thechamomileclub.com";

		return `${host}/login?id=${accessKey.id}&code=${accessKey.challenge}`;
	}

	signToken(payload: string | object | Buffer, config?: SignOptions) {
		return JWT.sign(payload, APP_SECRET, config);
	}

	verifyToken = <T extends string | JWT.Jwt | JWT.JwtPayload>(
		token: string,
		config: VerifyOptions & { error?: Error } = {}
	) => {
		const { error: errorToThrow, ...jwtOptions } = config;

		try {
			const decodedToken = JWT.verify(token, APP_SECRET, jwtOptions);
			return { decoded: decodedToken as T, error: null }
		} catch (error) {
			if (errorToThrow) { throw errorToThrow; }

			return { decoded: null, error }
		}
	}

	generateRandomString = (length: number) => {
		if (typeof length !== "number") { throw new TypeError("length should be a integer"); }

		const alphabet = [
			"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
			"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
		];

		const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

		const chars = [...alphabet, ...numbers];

		const array = new Array(length).fill(null).map((_) => {
			const char = chars[Math.floor(Math.random() * chars.length)];

			return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
		});

		return array.join("");
	}
}