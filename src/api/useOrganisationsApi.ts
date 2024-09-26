import { useState, useEffect } from 'react';
import { useStore } from '../stores/StoreProvider';

const API_TOKEN = '1b12a024ef1f9cd0532e3c55357fe5b0';
const API_URL = `https://dev.mintconf.ru/api/external/1b12a024ef1f9cd0532e3c55357fe5b0/organisations`;

const useOrgApi = (method = 'GET', body = null) => {
    const orgStore = useStore();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_URL}`, {
                    method,
                    // headers: {
                    //     'Authorization': `Bearer ${API_TOKEN}`,
                    //     'Content-Type': 'application/json',
                    // },
                    body: body ? JSON.stringify(body) : null,
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (Array.isArray(result)) {
                    result.forEach(org => orgStore.addOrg(org));
                }

            } catch (err: any) {
              console.log(err);
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // controller.abort();
        };
    }, [method, body, orgStore]);

    return { error, loading };
};

export default useOrgApi;