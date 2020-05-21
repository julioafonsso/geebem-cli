import { POST } from "./http";

const TOKEN = "token-auth";

export const isAuthenticated = () => {
	let token = getToken();
	return token != null && token.length > 0;
};

export const authLogin = async (username, password) => {
		let { data } = await POST("/login", { username, password });
		setToken(data.token);
		return true;
};

export const authSignup = async (username, password) => {
	return await POST("/signup", { username, password });
};

export const getToken = () => sessionStorage.getItem(TOKEN);
const setToken = (token) => sessionStorage.setItem(TOKEN, token);
