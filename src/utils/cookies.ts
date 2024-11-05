import Cookies from 'js-cookie'

export const getCookies = () => {
    const id = Cookies.get('id');
    const access_token = Cookies.get('access_token');
    return { id, access_token }
}

export const removeCookies = () => {
    Cookies.remove('id');
    Cookies.remove('access_token');
}
