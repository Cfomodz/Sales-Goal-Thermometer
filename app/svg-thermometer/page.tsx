'use client';

import React, { useEffect, useState } from 'react';
import SvgThermometer from '../../src/components/SvgThermometer';
import Link from 'next/link';

export default function SvgThermometerPage() {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/thermometer');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProgress(data.progress);
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
        <div className="text-2xl">Loading visualization...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">SVG Thermometer</h1>
          <Link href="/" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 flex justify-center">
        <div className="max-w-lg">
          <SvgThermometer progress={progress} />
        </div>
      </main>
    </div>
  );
} 