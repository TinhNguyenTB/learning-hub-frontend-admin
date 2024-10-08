import { useSearchParams } from "react-router-dom";

const useQueryString = () => {
    const [searchParams] = useSearchParams();
    return Object.fromEntries([...searchParams])
}

export default useQueryString