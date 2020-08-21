export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const signIn = async (credentials, dispatch, history, route) => {
    const response = await fetch(`http://localhost:3000/${route}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    try {
        const userData = await response.json();
        if(userData) {
            if(userData.error) {
                if(route === "login")
                    history.push("/signin");
                else
                    history.push("/signup")
                logout(dispatch);
                return;
            }
            const token = userData.token;
            localStorage.setItem("token", token);
            dispatch(setUser(userData.user));
            history.push('/transactions');
        }
        else {
            console.log("error", userData.err.message);
            logout(dispatch);
        }
    }
    catch (err) {
        console.log("error!", err)
        logout(dispatch);
    }
};

export const setUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    };
}

export const logout = (dispatch, history) => {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    history.replace('/signin');
};