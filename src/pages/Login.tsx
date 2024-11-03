import LoginForm from "@/components/auth/LoginForm"
import { PATH } from "@/utils/constants";
import Cookies from 'js-cookie'

const Login = () => {
    const id = Cookies.get('id');
    const access_token = Cookies.get('access_token');

    if (id && access_token) {
        window.location.href = PATH.HOME
    }
    return (
        <LoginForm />
    )
}

export default Login