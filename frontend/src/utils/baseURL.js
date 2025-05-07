const getBaseUrl = () => {
    return import.meta.env.VITE_API_URL || "http://localhost:5005"
}

export default getBaseUrl;