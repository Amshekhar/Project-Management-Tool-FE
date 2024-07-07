// api.js

export const getUserDashboard = async () => {
    const token = sessionStorage.getItem("token");
    // console.log(token)

    const response = await fetch('http://localhost:8143/getUserDashBoardByToken', {
        method: 'GET',
        headers: {
            "token": `Bearer ${token}`
        }
    });
    // console.log(response);

    return await response.json();
}

// api.js

const BASE_URL = 'http://localhost:8143'; // Update with your actual API base URL

export async function updateUserProfile(profileData, token) {
    console.log(profileData, token);
    const url = `${BASE_URL}/updateOwnProfile`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': `Bearer ${token}` // Assuming token is passed as an argument
        },
        body: JSON.stringify(profileData)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error updating profile: ${response.statusText}`);
        }
        console.log(response);
        const data = response.json()
        return data; // Assuming the API returns the updated profile data
    } catch (error) {
        throw new Error(`Error updating profile: ${error.message}`);
    }
}

