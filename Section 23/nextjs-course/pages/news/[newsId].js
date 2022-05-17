import { useRouter } from 'next/router';
import React from 'react';


function DetailPage() {
    const router = useRouter();

    if (router && router.query && router.query.newsId) {
        console.log(router.query.newsId);
    }

    // React.useEffect(() => {
    //     if (router.isReady) {
    //         console.log(router.query.newsId);
    //     }
    // }, [router.isReady]);

    return <h1>The Detail Page</h1>;
}

export default DetailPage;