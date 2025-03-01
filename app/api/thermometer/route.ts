import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configure the route for static export
export const dynamic = 'force-static';
export const revalidate = false; // This makes it fully static for export

// Define the config interface
interface ThermometerConfig {
  layout: string;
  fill_color: string;
  goal_amount: number;
  show_goal_amount: boolean;
  show_progress_percentage: boolean;
  show_progress_amount: boolean;
  animate_progress_fill: boolean;
}

interface Config {
  goal_amount: number;
  initial_progress: number;
  thermometer: ThermometerConfig;
  countdown_date?: string;
}

// Try to read config file and log any errors
let config: Config;
try {
  const configPath = path.join(process.cwd(), 'data', 'config.json');
  console.log('Config path:', configPath);
  console.log('File exists:', fs.existsSync(configPath));
  const configContent = fs.readFileSync(configPath, 'utf8');
  console.log('Config content loaded');
  config = JSON.parse(configContent);
  console.log('Config parsed successfully');
} catch (error) {
  console.error('Error loading config:', error);
  // Create a fallback config to prevent crashes
  config = {
    goal_amount: 10000,
    initial_progress: 8600,
    thermometer: {
      layout: "1",
      fill_color: "rgba(231, 97, 81, 1)",
      goal_amount: 1000,
      show_goal_amount: true,
      show_progress_percentage: true,
      show_progress_amount: true,
      animate_progress_fill: true
    }
  };
}

// Pre-compute the data at build time for static export
export async function GET() {
  try {
    console.log('API route called');
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
    const responseData = {
      progress,
      totalProgress,
      progressPercent,
      percentRounded,
      progressCommas,
      goalAmount: config.goal_amount,
      thermometerConfig: config.thermometer
    };
    
    console.log('Returning data:', responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching thermometer data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thermometer data' },
      { status: 500 }
    );
  }
} 