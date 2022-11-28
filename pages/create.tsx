import { usePost } from '@zenstackhq/runtime/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { UserContext } from '../lib/context';

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { user, error: userLoadError } = useContext(UserContext);
    const { create } = usePost();
    const router = useRouter();

    if (!user && !userLoadError) {
        return <p>Loading ...</p>;
    } else if (userLoadError) {
        return <p>Unauthorized</p>;
    }

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await create({
                data: {
                    title,
                    content,
                    author: { connect: { id: user!.id } },
                },
            });
            router.push('/drafts');
        } catch (error: any) {
            alert(`Failed to create draft: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>Create Draft</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={8}
                        value={content}
                    />
                    <input
                        disabled={!content || !title}
                        type="submit"
                        value="Create"
                    />
                    <a
                        className="back"
                        href="#"
                        onClick={() => router.push('/')}
                    >
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input[type='text'],
                textarea {
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

                .back {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default Draft;
