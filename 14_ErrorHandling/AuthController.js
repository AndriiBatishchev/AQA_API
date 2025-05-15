const BaseController = require("./BaseController");

class AuthController extends BaseController {
    async createUser(userName, password) {
        return await this.axiosInstance.post('/Account/v1/User', {
            userName,
            password
        });
    }
    async genToken(userName, password) {
        return await this.axiosInstance.post('/Account/v1/GenerateToken', {
            userName,
            password
        });
    }
    async getUserById(userId, token) {
        return await this.axiosInstance.post(`/Account/v1/User/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }    
    // async getUserByToken(token) {
    //     return await this.axiosInstance.post('/Account/v1/User/', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //}
}
module.exports = new AuthController();