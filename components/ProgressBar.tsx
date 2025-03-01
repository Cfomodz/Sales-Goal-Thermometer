'use client';

import React from 'react';

interface ProgressBarProps {
  progressPercent: number;
  percentRounded: number;
  progressCommas: string;
  goalAmount: number;
}

export default function ProgressBar({
  progressPercent,
  percentRounded,
  progressCommas,
  goalAmount
}: ProgressBarProps) {
  return (
    <div className="bg-[#142f4c] text-white font-['Nunito'] min-h-screen">
      <div id="countdown-wrap" className="w-full h-[300px] p-5 max-w-[650px] mx-auto my-[150px]">
        <div id="goal" className="text-5xl text-right">
          ${goalAmount.toLocaleString()}
        </div>
        <div id="glass" className="w-full h-5 bg-[#c7c7c7] rounded-[10px] float-left overflow-hidden">
          <div 
            id="progress" 
            className="float-left h-5 bg-[#ff5d50] z-10"
            style={{ width: `${Math.min(progressPercent * 100, 100)}%` }}
          ></div>
        </div>
        <div className="goal-stat w-1/4 p-[10px] float-left m-0">
          <span className="goal-number block font-bold">{percentRounded}%</span>
          <span className="goal-label block">Funded</span>
        </div>
        <div className="goal-stat w-1/4 p-[10px] float-left m-0">
          <span className="goal-number block font-bold">${progressCommas}</span>
          <span className="goal-label block">Raised</span>
        </div>
      </div>
    </div>
  );
} 