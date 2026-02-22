const authFetch = async (url, options) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
        localStorage.removeItem('auth-token');
        window.dispatchEvent(new Event('authChange')); // To update Navbar etc.
        window.dispatchEvent(new Event('sessionExpired'));
    }

    return response;
};

export default authFetch;
