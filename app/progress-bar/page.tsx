'use client';

import React, { useEffect, useState } from 'react';
import ProgressBar from '../../src/components/ProgressBar';
import Link from 'next/link';

interface ProgressData {
  progressPercent: number;
  percentRounded: number;
  progressCommas: string;
  goalAmount: number;
}

export default function ProgressBarPage() {
  const [data, setData] = useState<ProgressData | null>(null);
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
        setData({
          progressPercent: result.progressPercent,
          percentRounded: result.percentRounded,
          progressCommas: result.progressCommas,
          goalAmount: result.goalAmount
        });
      } catch (err) {
        setError('Failed to load progress data');
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
        <div className="text-2xl">Loading visualization...</div>
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
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Progress Bar</h1>
          <Link href="/" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main>
        <ProgressBar 
          progressPercent={data.progressPercent}
          percentRounded={data.percentRounded}
          progressCommas={data.progressCommas}
          goalAmount={data.goalAmount}
        />
      </main>
    </div>
  );
} 