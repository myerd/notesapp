import axios from 'axios'

export const register = async (user) => {

}

export const login = async (user) => {
    let request = {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
    }
    let response = await fetch("/api/user/login", request).catch(error => {
        console.log("There was an error:" + error)
    });
    if (!response) {
        return;
    }
    if (response.ok) {
        let data = await response.json().catch(error => {
            console.log("Error parsing json:" + error);
        });
        if (!data) {
            console.log("Failed to parse json")
            return;
        }
        console.log(data);
        return data;
    } else {
        console.log("Server responded with a status:" + response.status)
    }
}

export const logout = async () => {

}