import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../config/mongodb";

export default async (req: NextApiRequest, rsp: NextApiResponse) => {
    const slug = req.query.id;

    if (!slug) return rsp.json('Page not found.');

    const { db, client } = await connectToDatabase();

    if (client.isConnected()) {
        const pageViewBySlug = await db.collection('pageviews').findOne({ slug });

        let total = 0;
        if (pageViewBySlug) {
            total = pageViewBySlug.total;
        }

        return rsp.status(200).json({ total });
    }

    return rsp.status(500).json({ err: 'client DB is not connected' })
}