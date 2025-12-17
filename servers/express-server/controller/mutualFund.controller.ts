import { Request, Response } from 'express';
import * as service from '@repo/ai-pinecone/service.js';

export async function getRecommendations(req: Request, res: Response) {
  try {
    const { amcName, category, amountInvested, tenure } = req.body;

    if (!amountInvested || !tenure) {
      return res.status(400).json({ error: 'amountInvested and tenure are required' });
    }

    const recommendations = await service.getRecommendations({
      amcName,
      category,
      amountInvested: parseFloat(amountInvested),
      tenure: parseFloat(tenure),
    });

    res.json({ success: true, data: recommendations });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const analytics = await service.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getFundDetails(req: Request, res: Response) {
  try {
    const fund = await service.getFundDetails(req.params.id!);
    if (!fund) {
      return res.status(404).json({ error: 'Fund not found' });
    }
    res.json({ success: true, data: fund });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getFilters(req: Request, res: Response) {
  try {
    const filters = await service.getFilters();
    res.json({ success: true, data: filters });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
