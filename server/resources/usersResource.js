const UsersResource = (response) => {
	try {
		const data = response
						.map(({ id, email, firstname, lastname}) => ({
							id, email, firstname, lastname
                     	}));
		return data;
	} catch(error) {
		return [];
	} 
}

export default UsersResource;
