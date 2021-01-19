import { logout } from './authenticationApi';

export function handleResponse(response) {
        const data = response;
        if (!data.message) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.code;
            return Promise.reject(error);
        }
        return data;
}
