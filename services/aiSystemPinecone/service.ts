import { Pinecone } from '@pinecone-database/pinecone';
import { prisma } from '@repo/prisma/db';
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const indexName = process.env.PINECONE_INDEX_NAME || 'mutual-funds-index';

export interface RecommendationInput {
  amcName?: string;
  category?: string;
  amountInvested: number;
  tenure: number;
}

export async function getRecommendations(input: RecommendationInput) {
  const { amcName, category, amountInvested, tenure } = input;

  const query = `Looking for mutual fund${amcName ? ` from ${amcName}` : ''}${category ? ` in ${category} category` : ''} for investment of ${amountInvested} rupees for ${tenure} years tenure`;

  const index = pc.index(indexName);
  const results = await index.query({
    vector: new Array(1536).fill(0),
    topK: 10,
    includeMetadata: true,
  });

  const fundIds = results.matches?.map(m => m.id) || [];
  
  const funds = await prisma.mutualFund.findMany({
    where: { id: { in: fundIds } },
  });

  const rankedFunds = funds
    .map((fund: any) => {
      const expectedReturn = tenure >= 5 && fund.returns5yr ? fund.returns5yr :
                            tenure >= 3 && fund.returns3yr ? fund.returns3yr :
                            fund.returns1yr || 0;
      
      const projectedValue = amountInvested * Math.pow(1 + expectedReturn / 100, tenure);
      const score = (fund.rating * 20) + (expectedReturn * 5) - (fund.riskLevel * 2);

      return {
        ...fund,
        expectedReturn,
        projectedValue: Math.round(projectedValue),
        score,
      };
    })
    .sort((a: any, b: any) => b.score - a.score);

  return rankedFunds;
}

export async function getAnalytics() {
  const totalFunds = await prisma.mutualFund.count();
  
  const byCategory = await prisma.mutualFund.groupBy({
    by: ['category'],
    _count: true,
  });

  const byAMC = await prisma.mutualFund.groupBy({
    by: ['amcName'],
    _count: true,
    orderBy: { _count: { amcName: 'desc' } },
    take: 10,
  });

  const avgReturns = await prisma.mutualFund.aggregate({
    _avg: { returns1yr: true, returns3yr: true, returns5yr: true },
  });

  return {
    totalFunds,
    byCategory,
    topAMCs: byAMC,
    avgReturns: avgReturns._avg,
  };
}

export async function getFundDetails(fundId: string) {
  return prisma.mutualFund.findUnique({ where: { id: fundId } });
}

export async function getFilters() {
  const amcs = await prisma.mutualFund.findMany({
    select: { amcName: true },
    distinct: ['amcName'],
    orderBy: { amcName: 'asc' },
  });

  const categories = await prisma.mutualFund.findMany({
    select: { category: true, subCategory: true },
    distinct: ['category', 'subCategory'],
    orderBy: { category: 'asc' },
  });

  return {
    amcs: amcs.map((a: any) => a.amcName),
    categories: categories.reduce((acc: any, c: any) => {
      if (!acc[c.category]) acc[c.category] = [];
      acc[c.category].push(c.subCategory);
      return acc;
    }, {} as Record<string, string[]>),
  };
}
