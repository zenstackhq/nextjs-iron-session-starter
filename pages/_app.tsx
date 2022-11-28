import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { UserContext, useSessionUser } from '../lib/context';
import fetchJson from '../lib/fetchJson';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const sessionUser = useSessionUser();

    return (
        <SWRConfig
            value={{
                fetcher: fetchJson,
                onError: (err) => {
                    console.error(err);
                },
            }}
        >
            <UserContext.Provider value={sessionUser}>
                <Component {...pageProps} />
            </UserContext.Provider>
        </SWRConfig>
    );
}
