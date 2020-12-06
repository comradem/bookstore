import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        if (body)
            body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
        try{
            // console.log(`calling BE from http hook with url: ${url}, method: ${method} body: ${body} headers: ${JSON.stringify(headers)}`);
            const response = await fetch(url,{method, body, headers});
            const data = await response.json();
            // console.log("data that was received as response: " + JSON.stringify(data));
            if (!response.ok){
                setError(data.errors)
                throw new Error(`${data.message()}` || "something went wrong");
            }
            setLoading(false);
            return data;
        }
        catch (e){
            setLoading(false);
            setError(e.message());
            throw e;
        }
    },[]);

    const clearError = () => {
      setError(null)
    };

    return {loading, error, request, clearError};
};
