// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';
import type { User } from '@zenstackhq/runtime/types';
import { KeyedMutator } from 'swr';
import fetchJson from './fetchJson';

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'zenstack-iron-session-example',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
    interface IronSessionData {
        user?: User;
    }
}

export async function signIn(
    email: string,
    password: string,
    mutateUser: KeyedMutator<User>
) {
    const r = await fetchJson<User>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'content-type': 'application/json',
        },
    });
    mutateUser(r);
    return r;
}

export async function signOut(mutateUser: KeyedMutator<User>) {
    const r = await fetchJson('/api/auth/logout', {
        method: 'POST',
    });
    mutateUser(undefined);
    return r;
}
