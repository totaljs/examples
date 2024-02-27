import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-type": "application/json"
	}
});
