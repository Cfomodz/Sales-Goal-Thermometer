import { NextResponse } from 'next/server';
import config from '../../../src/data/config.json';

export async function GET() {
  try {
    // This would be where you'd make an API call in the real app
    // For now, we'll use a static value similar to the Python script
    const totalSumCents = 50000; // Example value that would come from API
    
    // Calculate progress values
    const progress = Math.floor(totalSumCents / 100);
    
    // Calculate progress values for visualization
    const fixedStart = config.initial_progress;
    const totalProgress = fixedStart + progress;
    const progressPercent = totalProgress / config.goal_amount;
    const percentRounded = Math.round(progressPercent * 100 * 10) / 10; // Round to 1 decimal place
    const progressCommas = totalProgress.toLocaleString();
    
    // Return data for components
    return NextResponse.json({
      progress,
      totalProgress,
      progressPercent,
      percentRounded,
      progressCommas,
      goalAmount: config.goal_amount,
      thermometerConfig: config.thermometer
    });
  } catch (error) {
    console.error('Error fetching thermometer data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thermometer data' },
      { status: 500 }
    );
  }
} 