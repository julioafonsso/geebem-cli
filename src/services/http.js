import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({ baseURL: "http://localhost:4000/" });

const getConfig = () => {
	return {
		headers: { Authorization: `Bearer ${getToken()}` },
	};
};

export const POST = async (url, data) => {
		let response = await api.post(url, data, getConfig());
		return response;
};

export const PUT = async (url, data) => {
	let response = await api.put(url, data, getConfig());
	return response;
};

export const GET = async (url, filter) => {
	let config = {
		...getConfig(),
		params: filter,
	};

	let response = await api.get(url, config);
	return response;
};

export const DELETE = async (url) => {};
