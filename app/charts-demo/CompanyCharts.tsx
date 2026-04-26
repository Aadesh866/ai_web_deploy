"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Mock data based on the scenario
const companyData = [
  { label: "Highly Satisfied", percentage: 60, colorHex: "#10b981", color: "from-green-400 to-emerald-600" },
  { label: "Satisfied", percentage: 25, colorHex: "#3b82f6", color: "from-blue-400 to-indigo-600" },
  { label: "Dissatisfied", percentage: 15, colorHex: "#e11d48", color: "from-red-400 to-rose-600" },
];

export function CompanyCharts() {
  return (
    <div className="space-y-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Scenario 2: Company-Wide Overview</h2>
        <p className="text-text-secondary">3 modern visualizations showing the overall distribution of satisfaction across the entire company.</p>
      </div>

      {/* Variation 1: Liquid Fill Gauges */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 1: Liquid Fill Gauges</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
          {companyData.map((data, i) => (
            <LiquidGauge key={data.label} data={data} delay={i * 0.2} />
          ))}
        </div>
      </div>

      {/* Variation 2: Interactive Donut with Wave Animation */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 2: Glowing Wave Donut</h3>
        <div className="relative h-[400px] w-full max-w-xl mx-auto flex items-center justify-center">
          <DonutChart data={companyData} />
        </div>
      </div>

      {/* Variation 3: Animated Floating Particles (Swarm) */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 3: Animated Particle Swarm</h3>
        <div className="relative h-[400px] w-full max-w-3xl mx-auto">
          <ParticleSwarmChart data={companyData} />
        </div>
      </div>
    </div>
  );
}

// Helper component for Liquid Gauge
function LiquidGauge({ data, delay }: { data: typeof companyData[0], delay: number }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-32 h-48 rounded-t-full rounded-b-3xl bg-black/40 border-2 border-white/10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* Liquid Fill */}
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: `${100 - data.percentage}%` }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.5, delay: delay + 0.5, type: "spring", stiffness: 20 }}
          className={`absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t ${data.color} opacity-80`}
          style={{ filter: `drop-shadow(0 -10px 20px ${data.colorHex})` }}
        >
          {/* Animated Wave */}
          <div className="absolute top-0 left-0 right-0 h-8 -mt-4 opacity-50 bg-white/20 blur-sm rounded-[100%] animate-pulse" />
        </motion.div>
        
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-3xl font-bold text-white drop-shadow-md">{data.percentage}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">{data.label}</p>
      </div>
    </div>
  );
}

// Helper component for Donut Chart
function DonutChart({ data }: { data: typeof companyData }) {
  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((d, i) => {
          const dashArray = (d.percentage / 100) * circumference;
          const dashOffset = currentOffset;
          currentOffset += dashArray; // Advance for the next segment

          return (
            <g key={i} className="group cursor-pointer">
              {/* Thick transparent stroke for easier hover */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="transparent"
                strokeWidth="40"
                strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                strokeDashoffset={-dashOffset}
              />
              
              <motion.circle
                initial={{ strokeDasharray: `0 ${circumference}` }}
                whileInView={{ strokeDasharray: `${dashArray} ${circumference - dashArray}` }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.5, delay: 0.5 + i * 0.4, ease: "easeOut" }}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={d.colorHex}
                strokeWidth="24"
                strokeDashoffset={-dashOffset}
                className="transition-all duration-300 group-hover:stroke-[30px]"
                style={{ filter: `drop-shadow(0 0 10px ${d.colorHex}60)` }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-text-secondary text-xs uppercase tracking-widest mb-1">Total</span>
        <span className="text-4xl font-bold text-white">100%</span>
      </div>

      {/* Legend */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-6">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.colorHex }} />
            <span className="text-xs text-text-secondary">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component for Particle Swarm Chart
function ParticleSwarmChart({ data }: { data: typeof companyData }) {
  // Generate 100 particles representing 100%
  const particles = data.flatMap((d) => 
    Array.from({ length: d.percentage }).map(() => ({
      colorHex: d.colorHex,
      label: d.label
    }))
  );

  return (
    <div className="flex h-full w-full items-end justify-between px-8 pb-12">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-4 w-1/3">
          <div className="relative w-full h-[250px]">
            {/* The "Swarm" container */}
            {Array.from({ length: d.percentage }).map((_, pIndex) => {
              // Random initial position (scattered) and final position (clustered)
              const randomX = (Math.random() - 0.5) * 100;
              const randomY = Math.random() * 200;
              
              // Clustered target positions (forming a pseudo bar)
              const cols = 6;
              const col = pIndex % cols;
              const row = Math.floor(pIndex / cols);
              const targetX = (col - cols/2) * 12 + "px";
              const targetY = -(row * 12) + "px";

              return (
                <motion.div
                  key={pIndex}
                  initial={{ 
                    x: randomX + "vw", 
                    y: -randomY - 200 + "px", 
                    opacity: 0,
                    scale: 0
                  }}
                  whileInView={{ 
                    x: targetX, 
                    y: targetY, 
                    opacity: 1,
                    scale: 1
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 2.5, 
                    delay: 1.0 + Math.random() * 1.5,
                    type: "spring",
                    damping: 10
                  }}
                  className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: d.colorHex,
                    boxShadow: `0 0 8px ${d.colorHex}`
                  }}
                />
              );
            })}
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-white mb-1">{d.percentage}%</span>
            <span className="text-xs text-text-secondary uppercase">{d.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
