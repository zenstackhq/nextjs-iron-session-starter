import { User } from '@zenstackhq/runtime/types';
import { createContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import fetchJson from './fetchJson';

export type UserContextType = {
    user: User | undefined;
    error: any;
    mutateUser: KeyedMutator<User>;
};

export const UserContext = createContext<UserContextType>({
    user: undefined,
    error: undefined,
    mutateUser: async () => undefined,
});

export function useSessionUser() {
    const {
        data: user,
        error,
        mutate: mutateUser,
    } = useSWR<User>('/api/auth/user', fetchJson, {
        shouldRetryOnError: false,
    });
    return { user, error, mutateUser };
}
