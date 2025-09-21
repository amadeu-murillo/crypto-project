import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd', {
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const solPrice = data.solana.usd;

    return NextResponse.json({ solPrice });
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return NextResponse.json({ error: 'Failed to fetch SOL price' }, { status: 500 });
  }
}