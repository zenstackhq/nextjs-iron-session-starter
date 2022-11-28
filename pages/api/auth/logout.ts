import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.json({});
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
