'use client';

import React, { useEffect, useState } from 'react';
import SvgThermometer from '../src/components/SvgThermometer';
import ProgressBar from '../src/components/ProgressBar';
import Link from 'next/link';

interface ThermometerData {
  progress: number;
  totalProgress: number;
  progressPercent: number;
  percentRounded: number;
  progressCommas: string;
  goalAmount: number;
}

export default function Home() {
  const [data, setData] = useState<ThermometerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/thermometer');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to load thermometer data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading visualizations...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error || 'Failed to load data'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-blue-900 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Sales Goal Thermometer</h1>
          <p className="text-lg mt-2">
            Track your sales progress with these visualizations
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">SVG Thermometer</h2>
            <div className="flex justify-center">
              <SvgThermometer progress={data.progress} />
            </div>
            <div className="mt-4 text-center">
              <Link 
                href="/svg-thermometer" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Full Page
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Progress Bar</h2>
            <ProgressBar 
              progressPercent={data.progressPercent}
              percentRounded={data.percentRounded}
              progressCommas={data.progressCommas}
              goalAmount={data.goalAmount}
            />
            <div className="mt-4 text-center">
              <Link 
                href="/progress-bar" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Full Page
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Sales Goal Thermometer © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
