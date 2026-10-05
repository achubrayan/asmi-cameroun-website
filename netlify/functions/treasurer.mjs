import { getStore } from '@netlify/blobs';
import { handleTreasurer } from '../lib/logic.mjs';
export default async (req) => handleTreasurer(req, getStore('campaign'), process.env.ADMIN_TOKEN);
export const config = { path: '/api/treasurer' };
