'use client';

import React, { useEffect, useRef } from 'react';

interface SvgThermometerProps {
  progress: number;
}

export default function SvgThermometer({ progress }: SvgThermometerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !svgRef.current) return;
    
    // Create and configure the SVG elements
    const svg = svgRef.current;
    
    // Clear any existing content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // SVG Namespace
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create thermometer elements
    const bulbRadius = 50;
    const stemWidth = 30;
    const stemHeight = 250;
    const totalHeight = stemHeight + bulbRadius;
    
    // Create bulb
    const bulb = document.createElementNS(svgNS, "circle");
    bulb.setAttribute("cx", "100");
    bulb.setAttribute("cy", `${totalHeight}`);
    bulb.setAttribute("r", `${bulbRadius}`);
    bulb.setAttribute("fill", "rgba(231, 97, 81, 1)");
    bulb.setAttribute("stroke", "#304a63");
    bulb.setAttribute("stroke-width", "3");
    svg.appendChild(bulb);
    
    // Create stem background
    const stem = document.createElementNS(svgNS, "rect");
    stem.setAttribute("x", `${100 - stemWidth/2}`);
    stem.setAttribute("y", `${totalHeight - stemHeight - bulbRadius}`);
    stem.setAttribute("width", `${stemWidth}`);
    stem.setAttribute("height", `${stemHeight}`);
    stem.setAttribute("fill", "#ecf0f1");
    stem.setAttribute("stroke", "#304a63");
    stem.setAttribute("stroke-width", "3");
    stem.setAttribute("rx", "15");
    svg.appendChild(stem);
    
    // Calculate fill height based on progress (0-100%)
    const progressPercent = Math.min(1, Math.max(0, progress / 1000));
    const fillHeight = stemHeight * progressPercent;
    
    // Create the temperature fill
    const fill = document.createElementNS(svgNS, "rect");
    fill.setAttribute("x", `${100 - stemWidth/2 + 3}`);
    fill.setAttribute("y", `${totalHeight - fillHeight - bulbRadius + 3}`);
    fill.setAttribute("width", `${stemWidth - 6}`);
    fill.setAttribute("height", `${fillHeight}`);
    fill.setAttribute("fill", "rgba(231, 97, 81, 1)");
    fill.setAttribute("rx", "12");
    svg.appendChild(fill);
    
    // Add percentage text
    const percentText = document.createElementNS(svgNS, "text");
    percentText.setAttribute("x", "170");
    percentText.setAttribute("y", `${totalHeight - fillHeight - bulbRadius + 20}`);
    percentText.setAttribute("font-family", "Arial");
    percentText.setAttribute("font-size", "24");
    percentText.setAttribute("font-weight", "bold");
    percentText.setAttribute("fill", "#304a63");
    percentText.textContent = `${Math.round(progressPercent * 100)}%`;
    svg.appendChild(percentText);
    
    // Add goal line
    const goalLine = document.createElementNS(svgNS, "line");
    goalLine.setAttribute("x1", `${100 - stemWidth/2 - 10}`);
    goalLine.setAttribute("x2", `${100 + stemWidth/2 + 10}`);
    goalLine.setAttribute("y1", `${totalHeight - stemHeight - bulbRadius + 10}`);
    goalLine.setAttribute("y2", `${totalHeight - stemHeight - bulbRadius + 10}`);
    goalLine.setAttribute("stroke", "#304a63");
    goalLine.setAttribute("stroke-width", "2");
    svg.appendChild(goalLine);
    
    // Add goal text
    const goalText = document.createElementNS(svgNS, "text");
    goalText.setAttribute("x", "170");
    goalText.setAttribute("y", `${totalHeight - stemHeight - bulbRadius + 15}`);
    goalText.setAttribute("font-family", "Arial");
    goalText.setAttribute("font-size", "18");
    goalText.setAttribute("font-weight", "bold");
    goalText.setAttribute("fill", "#304a63");
    goalText.textContent = "Goal: $1,000";
    svg.appendChild(goalText);
    
  }, [progress]);
  
  return (
    <svg 
      ref={svgRef}
      width="300" 
      height="400" 
      viewBox="0 0 200 350"
    ></svg>
  );
}
