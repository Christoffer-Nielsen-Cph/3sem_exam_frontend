import apiFacade from "./apiFacade.js";
import loginFacade from "./loginFacade.js";

import {API_URL} from "../../settings.js";

function UserFacade () {


    const createUser = (user, pass,email,streetAddress,zipCode,cityName) => {
        const options = apiFacade.makeOptions("POST", null,
            {"userName": user,
                  "userEmail": email,
                  "userPass":pass,
                  "address": {
                      "streetAddress": streetAddress,
                      "cityInfo":{
                      "zipCode": zipCode,
                      "cityName": cityName
                      }}}
        )
        return fetch(API_URL + "/api/users", options)
            .then(apiFacade.handleHttpErrors)
    }

  /*  const updateUser = (user, userId) => {
        const options = apiFacade.makeOptions("PUT", null, {"userName": user})
        return fetch(API_URL + "/api/users/" + userId, options)
            .then(apiFacade.handleHttpErrors)
    }

   */

    const deleteUser = (userName) => {
        const options = apiFacade.makeOptions("DELETE",null,null);
        return fetch(API_URL +"/api/users/"+userName,options)
            .then(apiFacade.handleHttpErrors)
    }

    const getUserByUserName = (userName) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/users/"+userName,options)
            .then(apiFacade.handleHttpErrors)
    }
    const getAllUsers = () => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/users/all",options)
            .then(apiFacade.handleHttpErrors)
    }

    const addUserToTrainingSession = (userName,trainingId) => {
        const options = apiFacade.makeOptions("POST",null,null);
        return fetch(API_URL+"/api/users/add/"+userName+"/"+trainingId)
            .then(apiFacade.handleHttpErrors)
    }
    const removeUserToTrainingSession = (userName,trainingId) => {
        const options = apiFacade.makeOptions("DELETE",null,null);
        return fetch(API_URL+"/api/users/add/"+userName+"/"+trainingId)
            .then(apiFacade.handleHttpErrors)
    }

    const getUserRoles = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }


    const getUserName = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const username = decodedClaims.username
            return username
        } else return ""
    }

    const getUserId = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const id = decodedClaims.id
            return id
        } else return ""
    }
    return {
        createUser,
      //  updateUser,
        hasUserAccess,
        getUserRoles,
        getUserName,
        getUserId
    }

}

const userFacade = UserFacade();
export default userFacade;