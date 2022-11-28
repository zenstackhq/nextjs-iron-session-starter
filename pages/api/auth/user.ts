import service from '@zenstackhq/runtime/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';
import { AuthResponseType } from '../../../lib/types';

async function userRoute(
    req: NextApiRequest,
    res: NextApiResponse<AuthResponseType>
) {
    if (req.session?.user) {
        // fetch user from db for fresh data
        const user = await service.db.user.findUnique({
            where: { email: req.session.user.email },
        });
        if (!user) {
            res.status(401).send({ message: 'invalid login status' });
            return;
        }

        delete (user as any).password;
        res.json(user);
    } else {
        res.status(401).json({ message: 'invalid login status' });
    }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
