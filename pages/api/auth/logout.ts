import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';
import { sessionOptions } from '../../../lib/session';

const logoutRoute: NextApiHandler = async (req, res) => {
    req.session.destroy();
    res.json({});
};

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
