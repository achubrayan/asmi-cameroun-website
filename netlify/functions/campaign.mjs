import { getStore } from '@netlify/blobs';
import { handleCampaign } from '../lib/logic.mjs';
export default async (req) => handleCampaign(req, getStore('campaign'));
export const config = { path: '/api/campaign' };
