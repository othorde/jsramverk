import { API_URL, API_URL_LOGIN, API_PUT_DOC, API_URL_AUTHFORUSER, API_URL_GRAPHQL, API_URL_INVITE } from "./config";
import { v4 as uuidv4 } from 'uuid';

const defaultConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
	},
};

const defaultConfig2 = {
	method: 'POST',
	headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

	},
};

const apisetting = {
	getByGraphQl: async (query) => {

		const endpoint = `${API_URL_GRAPHQL}`
		const documents = await (
			await fetch(endpoint, {
				...defaultConfig2,
				body: JSON.stringify({ 
					query: query,
				}) 
			})
		  ).json();
		  console.log(documents, "HÄÄÄÄÄÄÄÄÄR")
		return documents;
	},

	getAllDocuments: async () => {
		const endpoint = `${API_URL}`
		return await (await fetch(endpoint)).json();
	},

	getAllAuthDocuments: async (user) => {
		const endpoint = `${API_PUT_DOC}`
		const documents = await (
			await fetch(endpoint, {
			  ...defaultConfig,
			  body: JSON.stringify( {user: user} )
			})
		  ).json();
		return documents;
	},

	getAllUsers: async (user) => {

		const endpoint = `${API_PUT_DOC}`
		const documents = await (
			await fetch(endpoint, {
			  ...defaultConfig,
			  body: JSON.stringify( {user: user} )
			})
		  ).json();
		return documents;
	},

	createOneDocument: async (docname, text, user) => {

		const endpoint = `${API_URL}`
		const document = await (
			await fetch(endpoint, {
			  ...defaultConfig,
			  body: JSON.stringify( {docname: docname, text: text} )
			})
		  ).json();
		return document;
	},

	createOneUser: async (name, email, psw) => {
		const endpoint = `${API_URL}`
		let allowed_user = [];
		allowed_user.push(email)
		let randomnr = uuidv4();
		const document = await (
			await fetch(endpoint, {
			  	...defaultConfig,
			  	body: JSON.stringify( {name: name, email: email, psw: psw, 
			  	docs: [{ docname: `${name} dokument`, docid: randomnr,  text: `${name} skriv här`, allowed_user }],
				})
			})
		  ).json();
			console.log(document)
			if (document.data.msg === "Got a POST request, sending back 201 Created") {
				return document
			} else {
				return false
			}
	},
		
	postExecuteCode: async (code) => {
		var data = {
			code: btoa(code)
		};
		
		fetch("https://execjs.emilfolino.se/code", {
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
		.then(function (response) {
			return response.json();
		})
		.then(function(result) {
			let decodedOutput = atob(result.data);
			console.log(decodedOutput); // outputs: hej
		});
	},

	findUser: async(email, psw) => {
		const endpoint = `${API_URL_LOGIN}`
		
		let result = await (
			await fetch(endpoint, {
			  	...defaultConfig,
			  	body: JSON.stringify( {email: email, psw: psw})
			})
		  ).json();
		return result
	},

	getSpecificDocument: async (id) => {
		
		const endpoint = `${API_URL}s/${id}`
		const document = await (await fetch(endpoint)).json();
		return document;
	},


	addOneDocument: async (docname, text, user, token, codeMode) => {
		const defaultConfigPut = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'x-access-token': token
			},
		};
		let randomnr = uuidv4();
		if (codeMode) {
			randomnr = `codeMode${randomnr}`
		}
		const endpoint = `${API_PUT_DOC}`
		const document = await (
			await fetch(endpoint, {
			  ...defaultConfigPut,
			  body: JSON.stringify( {docname: docname, text: text, email: user, token, randomnr: randomnr} )
			})
		  ).json();

		return document;
	},
	

	updateOneDocument: async (id, text1, token) => {
		const defaultConfigPut = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'x-access-token': token
			},
		};

		const endpoint = `${API_URL}`
		const document = await (
			await fetch(endpoint, {
			  ...defaultConfigPut,
			  body: JSON.stringify({_id: id, text: text1})
			})
		  ).json();
		return document;
	},


	updateUserAuthForDoc: async (email, docid, emailToAdd, token) => {
		const defaultConfigPut = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'x-access-token': token
			},
		};
		const endpoint = `${API_URL_AUTHFORUSER}`
		const document = await (
			await fetch(endpoint, {
			  ...defaultConfigPut,
			  body: JSON.stringify({docid: docid, email: email, emailToAdd: emailToAdd})
			})
		  ).json();
		return document;
	},

	inviteUser2Doc: async (email, user, token) => {
	
		const endpoint = `${API_URL_INVITE}`;
		const defaultConfigAuthPost = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'x-access-token': token
			},
		};
		const inviteConfirmation = await (
			await fetch(endpoint, {
			  	...defaultConfigAuthPost,
			  	body: JSON.stringify( {email: email, user: user } )
			})
		  ).json();
		  console.log(inviteConfirmation)

		return inviteConfirmation;
	}

};



export default apisetting
