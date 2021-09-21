import { API_URL } from "./config";

const defaultConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"

	},
};

const defaultConfigPut = {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"

	},

};



const apisetting = {
	getAllDocuments: async () => {
		const endpoint = `${API_URL}`
		return await (await fetch(endpoint)).json();
	},

	createOneDocument: async (name, body) => {

		const endpoint = `${API_URL}`
		const document = await (
			await fetch(endpoint, {
			  ...defaultConfig,
			  body: JSON.stringify( {name: name, body: body} )
			})
		  ).json();
		return document;
	},


	getSpecificDocument: async (id) => {
		const endpoint = `${API_URL}s/${id}`
		const document = await (await fetch(endpoint)).json();
		return document;
	},


	updateOneDocument: async (id, body1) => {
		const endpoint = `${API_URL}`
		console.log("IDBODY",id,body1 )

		const document = await (
			await fetch(endpoint, {
			  ...defaultConfigPut,
			  body: JSON.stringify({_id: id, body: body1})
			})
		  ).json();

		return document;
	},
};



export default apisetting
