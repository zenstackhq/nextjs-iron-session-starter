import service, {
    requestHandler,
    type RequestHandlerOptions,
} from '@zenstackhq/runtime/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';

const options: RequestHandlerOptions = {
    async getServerUser(req: NextApiRequest, res: NextApiResponse) {
        const user = req.session?.user;
        if (!user) {
            return undefined;
        }

        const dbUser = await service.db.user.findUnique({
            where: { email: user.email },
        });

        return dbUser ?? undefined;
    },
};

export default withIronSessionApiRoute(
    requestHandler(service, options),
    sessionOptions
);
