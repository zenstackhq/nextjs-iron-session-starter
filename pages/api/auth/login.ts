import service from '@zenstackhq/runtime/server';
import * as bcrypt from 'bcryptjs';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';
import { sessionOptions } from '../../../lib/session';
import { AuthResponseType } from '../../../lib/types';

const loginRoute: NextApiHandler<AuthResponseType> = async (req, res) => {
    const { email, password } = req.body;

    const user = await service.db.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({
            message: 'invalid email and password combination',
        });
        return;
    }

    // don't store or return password
    delete (user as any).password;

    req.session.user = user;
    await req.session.save();

    res.json(user);
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
