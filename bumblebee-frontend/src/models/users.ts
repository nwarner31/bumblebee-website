import {BASE_URL} from "../applicationData";

export interface user {
    email: string,
    name: string,
    addresses: [{
        street1: string,
        city: string,
        state: string,
        street2?: string
    }],
    isAdmin?: boolean,
    password?: string,
}

export async function login(email: string, password: string) {
    const body = JSON.stringify({email, password})
    const response = await fetch(`${BASE_URL}user/login`,
        {method: 'POST', body, credentials: 'include',
        headers: {'Content-Type': 'application/json'}});
    const data = await response.json();
    return data;
}

export async function register(userData: user) {
    const body = JSON.stringify({...userData});
    const response = await fetch(`${BASE_URL}user/register`,
        {method: 'POST', body, credentials: 'include',
            headers: {'Content-Type': 'application/json', }});
    const data = await response.json();
    return data;
}

export async function logout() {
    try {
        const response = await fetch(`${BASE_URL}user/logout`,
            {method: 'POST', credentials: 'include', headers: {'Content-Type': 'application/json'}});
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }

}