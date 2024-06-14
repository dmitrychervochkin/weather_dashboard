import { sessions } from '../sessions';

export const logout = async (userSession) => {
	console.log(userSession)
	sessions.remove(userSession);
};
