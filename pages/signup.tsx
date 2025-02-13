import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useUser } from '@zenstackhq/runtime/client';
import { ServerErrorCode, ValidationError } from '@zenstackhq/runtime/client';
import { signIn } from '../lib/session';
import { UserContext } from '../lib/context';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { create: signup } = useUser();
    const { mutateUser } = useContext(UserContext);
    const router = useRouter();

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await signup({
                data: {
                    email,
                    name,
                    password,
                },
            });

            try {
                await signIn(email, password, mutateUser);
            } catch (err) {
                console.error('Signin failed:', err);
                return;
            }

            router.push('/');
        } catch (error: any) {
            if (error instanceof ValidationError) {
                alert(`Input data is invalid: ${error.message}`);
            } else if (
                error.info?.code === ServerErrorCode.UNIQUE_CONSTRAINT_VIOLATION
            ) {
                alert('User already exists');
            } else {
                alert(`Signup failed: ${error.info?.message}`);
                console.error(`Signup failed: ${error.info?.message}`);
            }
        }
    };

    return (
        <Layout>
            <div className="page">
                <form onSubmit={submitData}>
                    <h1>Signup user</h1>
                    <input
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text"
                        value={name}
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        type="text"
                        value={email}
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        type="password"
                        value={password}
                    />
                    <input
                        disabled={!name || !email || !password}
                        type="submit"
                        value="Signup"
                    />
                    <a
                        className="back"
                        href="#"
                        onClick={() => router.push('/')}
                    >
                        or Cancel
                    </a>
                </form>
                <p>
                    Already have an account?{' '}
                    <a
                        className="signin"
                        onClick={() => router.push('/signin')}
                    >
                        Signin now
                    </a>
                    .
                </p>
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                form {
                    max-width: 1024px;
                }
                input[type='text'],
                input[type='password'] {
                    width: 100%;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                    border-radius: 0.25rem;
                    border: 0.125rem solid rgba(0, 0, 0, 0.2);
                }
                input[type='submit'] {
                    background: #ececec;
                    border: 0;
                    padding: 1rem 2rem;
                    cursor: pointer;
                }
                input[type='submit']:disabled {
                    cursor: not-allowed;
                }
                .signin {
                    cursor: pointer;
                    text-decoration: underline;
                }
                .back {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default SignUp;
