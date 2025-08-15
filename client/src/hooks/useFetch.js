import { useRef, useState } from "react";

const useFetch = () => {
    const latestRequestId = useRef(0);

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const fetch = (adapter, params) => {
        const currentRequestId = ++latestRequestId.current;
        setLoading(true);
        adapter(params)
            .then(({ data }) => {
                if (currentRequestId === latestRequestId.current) {
                    setData(data);
                }
                return { data };
            })
            .catch((error) => {
                setError(error);
                return { error };
            })
            .finally(() => setLoading(false));
    };

    return [fetch, { loading, data, error }];
};

export default useFetch;
