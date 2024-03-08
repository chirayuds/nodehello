import * as helpers from '../../helpers/functions.js';

const test = async  (req, res) => {
	let response = {};  
	response.status = 'success';
	response.message = 'success';
	response.data = {};
	helpers.api_response(res,response);
}

export {test};
