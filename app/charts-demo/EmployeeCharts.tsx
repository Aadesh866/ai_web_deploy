"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mock data for 3D spheres (Organizational Competency)
const orgCompetencyData = [
  { category: "Execution", score: 95, color: "from-green-400 to-emerald-600", colorHex: "#10b981", label: "High Impact" },
  { category: "Client Satisfaction", score: 85, color: "from-teal-400 to-cyan-600", colorHex: "#0d9488", label: "Excellent" },
  { category: "Collaboration", score: 65, color: "from-blue-400 to-indigo-600", colorHex: "#3b82f6", label: "Steady Performer" },
  { category: "Coding & Dev", score: 50, color: "from-purple-400 to-fuchsia-600", colorHex: "#9333ea", label: "Developing" },
  { category: "Domain Acumen", score: 25, color: "from-red-400 to-rose-600", colorHex: "#e11d48", label: "Needs Improvement" },
];

// Mock data for Orbital Rings
const assignmentClosuresData = [
  { category: "Feature developments", score: 80, colorHex: "#10b981" },
  { category: "High Complex Ticket Resolution", score: 65, colorHex: "#3b82f6" },
  { category: "Learnings and Certifications", score: 45, colorHex: "#e11d48" },
];

export function EmployeeCharts() {
  return (
    <div className="space-y-24">
      {/* Variation 1: 3D Glowing Spheres on Grid */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden mt-8">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Organizational competency profile at a glance</h3>
        <div className="relative h-[500px] w-full max-w-5xl mx-auto flex items-end justify-center gap-4 sm:gap-12 pb-32 perspective-[1000px]">
          {/* Floor Grid */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [transform:rotateX(60deg)] origin-bottom opacity-50" />

          {orgCompetencyData.map((item, i) => (
            <div key={item.category} className="relative flex flex-col items-center group z-10 w-24">
              {/* Drop Shadow/Reflection on Grid */}
              <div className="absolute -bottom-4 w-20 h-6 bg-black/40 blur-md rounded-[100%] [transform:rotateX(60deg)] group-hover:bg-black/60 transition-all" />

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${item.score * 2.5}px` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 3.5, delay: 0.5 + i * 0.4, ease: "easeOut" }}
                className="w-1 bg-gradient-to-t from-transparent to-white/50 relative"
              >
                {/* 3D Sphere */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 40, damping: 15, delay: 1.0 + i * 0.4 }}
                  className={`absolute -top-16 -left-12 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer`}
                  style={{
                    boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.4), 0 0 ${item.score / 2}px ${item.colorHex}`,
                  }}
                  whileHover={{ scale: 1.1, y: -10 }}
                >
                  <span className="text-white font-bold text-lg drop-shadow-md">{item.score}%</span>
                </motion.div>
              </motion.div>

              {/* Labels */}
              <div className="absolute -bottom-24 text-center w-32 -ml-4 left-1/2 transform -translate-x-1/2">
                <p className="text-white font-semibold text-[13px] leading-tight mb-1">{item.category}</p>
                <p className="text-text-secondary text-[11px] leading-tight">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variation 2: Orbital Rings */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Assignment closures at the Org. Level</h3>
        <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center pt-8 pb-32">
          <OrbitalChart data={assignmentClosuresData} />
        </div>
      </div>

      {/* Variation 3: True 3D Isometric Scatter (Values Manifested style) */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Personalized reports for every member of the team: Value profile</h3>
        <div className="relative h-[500px] w-full max-w-2xl mx-auto flex items-center justify-center pt-8 pb-16">
           <ValuesManifested3DChart />
        </div>
      </div>

      {/* Variation 4: Radar / Web Chart */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-2 text-center">Personalized reports for every member of the team:</h3>
        <h4 className="text-lg font-semibold text-text-secondary mb-8 text-center">Your Competency Profile 2026</h4>
        <div className="relative h-[400px] w-full max-w-xl mx-auto flex items-center justify-center mt-8">
          <RadarChart />
        </div>
      </div>

      {/* Variation 5: Animated Speedometers (Velocity & Volume) */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Personalized reports for every member of the team:</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">
          <SpeedometerChart title="Assignment Velocity" type="velocity" />
          <SpeedometerChart title="Assignment Volume" type="volume" />
        </div>
      </div>
    </div>
  );
}

// Helper component for Radar Chart (Futuristic Radar Web)
function RadarChart() {
  const data = [
    { category: "Business Acumen", ideal: 90, actual: 75 },
    { category: "Collaboration", ideal: 85, actual: 85 },
    { category: "Communication", ideal: 95, actual: 70 },
    { category: "Technology", ideal: 80, actual: 90 },
    { category: "Execution", ideal: 100, actual: 85 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 40;
  const numPoints = data.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  // Polygon paths
  const idealPoints = data.map((d, i) => getCoordinates(d.ideal, i));
  const actualPoints = data.map((d, i) => getCoordinates(d.actual, i));
  
  const idealPath = idealPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
  const actualPath = actualPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Web Grid */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => {
          const points = data.map((_, index) => getCoordinates(scale * 100, index));
          const path = points.map((p, j) => `${j === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
          return (
            <path key={i} d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
          );
        })}

        {/* Axes */}
        {data.map((_, i) => {
          const endPoint = getCoordinates(100, i);
          return (
            <line key={i} x1={center} y1={center} x2={endPoint.x} y2={endPoint.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          );
        })}

        {/* Ideal Layer (Outer) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 3.0, ease: "easeInOut" }}
          d={idealPath}
          fill="rgba(59, 130, 246, 0.05)"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5 5"
          style={{ filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))" }}
        />

        {/* Actual Layer (Inner) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          d={actualPath}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))" }}
        />

        {/* Actual Data Points */}
        {actualPoints.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            whileInView={{ r: 5 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 2.0 + i * 0.4, type: "spring", stiffness: 40, damping: 12 }}
            cx={p.x}
            cy={p.y}
            fill="#10b981"
            className="cursor-pointer"
            style={{ filter: `drop-shadow(0 0 8px #10b981)` }}
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const labelPoint = getCoordinates(125, i);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="white"
              className="text-[11px] font-semibold"
            >
              {d.category}
            </text>
          );
        })}
      </svg>
      
      {/* Custom Legend */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0 border-t-2 border-dashed border-blue-500" />
          <span className="text-xs text-text-secondary">Ideal Requirement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500 rounded-full" />
          <span className="text-xs text-text-secondary">Actual Score</span>
        </div>
      </div>
    </div>
  );
}

// Helper component for Orbital Chart
function OrbitalChart({ data }: { data: typeof assignmentClosuresData }) {
  const size = 350;
  const center = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((d, i) => {
          const radius = 60 + i * 40;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (d.score / 100) * circumference;

          return (
            <g key={i}>
              {/* Background Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="16"
              />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 4.5, delay: 0.5 + i * 0.5, ease: "easeOut" }}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={d.colorHex}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ filter: `drop-shadow(0 0 10px ${d.colorHex}80)` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Legend inside or outside */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-surface border border-border shadow-xl flex items-center justify-center">
          <span className="text-xs font-bold text-white">Impact</span>
        </div>
      </div>

      {/* Legend list below */}
      <div className="absolute top-full mt-6 left-0 right-0 flex flex-col items-center justify-center gap-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.colorHex }} />
            <span className="text-[13px] font-medium text-text-secondary whitespace-nowrap">{d.category} ({d.score}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component for 3D Isometric Scatter Chart (Values Manifested)
function ValuesManifested3DChart() {
  const points = [
    { label: "Humility", x: 20, y: 80, z: 20, color: "#22c55e" },
    { label: "Respect", x: 40, y: 50, z: 40, color: "#22c55e" },
    { label: "Achievement", x: 70, y: 30, z: 60, color: "#22c55e" },
    { label: "Integrity", x: 80, y: 60, z: 30, color: "#22c55e" },
    { label: "Customer Orient.", x: 60, y: 90, z: 80, color: "#22c55e" },
  ];

  // Isometric projection math
  const project = (x: number, y: number, z: number) => {
    // x is left/right axis
    // z is depth axis
    // y is height axis
    const isoX = (x - z) * 0.866; // cos(30)
    const isoY = (x + z) * 0.5 - y; // sin(30) - height
    return { cx: isoX * 2.5 + 200, cy: isoY * 2.5 + 240 }; // Centered vertically
  };

  const projectFloor = (x: number, z: number) => {
    const isoX = (x - z) * 0.866;
    const isoY = (x + z) * 0.5;
    return { cx: isoX * 2.5 + 200, cy: isoY * 2.5 + 240 };
  };

  return (
    <div className="relative w-full h-full max-w-[400px]">
      <svg viewBox="0 0 400 450" className="w-full h-full overflow-visible">
        <defs>
           <filter id="glow3d">
             <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>
        </defs>

        {/* 3D Grid Box Outline */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
           {/* Floor grid */}
           {[0, 20, 40, 60, 80, 100].map(val => {
              const p1 = projectFloor(val, 0);
              const p2 = projectFloor(val, 100);
              const p3 = projectFloor(0, val);
              const p4 = projectFloor(100, val);
              return (
                <g key={val}>
                  <line x1={p1.cx} y1={p1.cy} x2={p2.cx} y2={p2.cy} />
                  <line x1={p3.cx} y1={p3.cy} x2={p4.cx} y2={p4.cy} />
                </g>
              );
           })}
           {/* Back walls */}
           <path d={`M ${projectFloor(0,0).cx} ${projectFloor(0,0).cy} L ${projectFloor(0,0).cx} ${projectFloor(0,0).cy - 250}`} strokeDasharray="4 4" />
           <path d={`M ${projectFloor(100,0).cx} ${projectFloor(100,0).cy} L ${projectFloor(100,0).cx} ${projectFloor(100,0).cy - 250}`} />
           <path d={`M ${projectFloor(0,100).cx} ${projectFloor(0,100).cy} L ${projectFloor(0,100).cx} ${projectFloor(0,100).cy - 250}`} />
        </g>

        {/* Y-axis labels */}
        {[0, 20, 40, 60, 80, 100].map(val => {
           const p = project(0, val, 100);
           return (
             <text key={val} x={p.cx - 15} y={p.cy + 4} fill="#94A3B8" fontSize="10" textAnchor="end">{val}</text>
           )
        })}

        {/* Data Points */}
        {points.map((pt, i) => {
          const pos = project(pt.x, pt.y, pt.z);
          const floorPos = projectFloor(pt.x, pt.z);
          return (
            <g key={i}>
              {/* Drop line to floor */}
              <motion.line 
                 initial={{ y2: floorPos.cy }}
                 whileInView={{ y2: pos.cy }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 2.5, delay: i * 0.3 }}
                 x1={floorPos.cx} y1={floorPos.cy} x2={pos.cx} stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" strokeDasharray="3 3" 
              />
              {/* Floor shadow */}
              <ellipse cx={floorPos.cx} cy={floorPos.cy} rx="8" ry="4" fill="rgba(0,0,0,0.5)" />
              {/* Floating Point */}
              <motion.circle 
                 initial={{ cy: floorPos.cy, r: 0 }}
                 whileInView={{ cy: pos.cy, r: 8 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 2.5, delay: i * 0.3, type: "spring" }}
                 cx={pos.cx} fill={pt.color} filter="url(#glow3d)" 
              />
              <motion.circle 
                 initial={{ cy: floorPos.cy, opacity: 0 }}
                 whileInView={{ cy: pos.cy, opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 2.5, delay: i * 0.3 + 0.5 }}
                 cx={pos.cx} r="3" fill="#fff" 
              />
              {/* Label */}
              <motion.text 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, delay: i * 0.3 + 1.5 }}
                 x={pos.cx} y={pos.cy - 12} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold"
              >
                {pt.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Helper component for Live Speedometers
function SpeedometerChart({ title, type }: { title: string, type: "velocity" | "volume" }) {
  const size = 300;
  const extendedHeight = 350; 
  const center = size / 2;
  const radius = size / 2 - 20; 
  
  const angleRange = 240; 
  const startAngle = -120;

  const maxVal = type === "velocity" ? 60 : 200;
  const ticks = type === "velocity" 
    ? [0, 10, 20, 30, 40, 50, 60]
    : [0, 40, 80, 120, 160, 200];
  
  const targets = type === "velocity" 
    ? { avg: 22, best: 48, emp: 30 }
    : { avg: 95, best: 170, emp: 125 };

  const valToAngle = (val: number) => {
    const percentage = val / maxVal;
    return startAngle + (percentage * angleRange);
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-white font-bold mb-8 text-lg">{title}</h4>
      
      <div className="relative" style={{ width: size, height: extendedHeight }}>
        {/* Cartoonish Gauge Face (Flat vector style) */}
        <div className="absolute top-0 left-0 w-full" style={{ height: size }}>
           <div className="absolute inset-2 rounded-full bg-surface-light border-[4px] border-border/80" />
           <div className="absolute inset-6 rounded-full bg-surface border-2 border-border/40" />
        </div>

        <svg width={size} height={extendedHeight} className="absolute top-0 left-0 z-10 overflow-visible">
          {/* Flat Color Bands */}
          <path 
             d={`M ${center + Math.cos((valToAngle(0)-90)*Math.PI/180)*(radius-5)} ${center + Math.sin((valToAngle(0)-90)*Math.PI/180)*(radius-5)} A ${radius-5} ${radius-5} 0 0 1 ${center + Math.cos((valToAngle(targets.avg)-90)*Math.PI/180)*(radius-5)} ${center + Math.sin((valToAngle(targets.avg)-90)*Math.PI/180)*(radius-5)}`}
             fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"
          />
          <path 
             d={`M ${center + Math.cos((valToAngle(targets.avg)-90)*Math.PI/180)*(radius-5)} ${center + Math.sin((valToAngle(targets.avg)-90)*Math.PI/180)*(radius-5)} A ${radius-5} ${radius-5} 0 0 1 ${center + Math.cos((valToAngle(targets.best)-90)*Math.PI/180)*(radius-5)} ${center + Math.sin((valToAngle(targets.best)-90)*Math.PI/180)*(radius-5)}`}
             fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round"
          />

          {/* Simple Vector Ticks */}
          {ticks.map((tick) => {
             const angle = valToAngle(tick);
             const rad = (angle - 90) * (Math.PI / 180);
             const x1 = center + Math.cos(rad) * (radius - 12);
             const y1 = center + Math.sin(rad) * (radius - 12);
             const x2 = center + Math.cos(rad) * (radius - 24);
             const y2 = center + Math.sin(rad) * (radius - 24);
             const tx = center + Math.cos(rad) * (radius - 42);
             const ty = center + Math.sin(rad) * (radius - 42);

             return (
               <g key={tick}>
                 <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                 <text x={tx} y={ty} fill="#E2E8F0" fontSize="16" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">{tick}</text>
               </g>
             );
          })}

          {/* Needles (Animated inside the SVG) */}
          <g transform={`translate(${center}, ${center})`}>
            <motion.g
              initial={{ rotate: startAngle }}
              whileInView={{ rotate: valToAngle(targets.avg) }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 4.0, delay: 0.5, type: "spring", stiffness: 30 }}
            >
              <circle cx="0" cy="0" r="150" fill="transparent" />
              <path d={`M -5 0 L 5 0 L 0 ${-radius + 35} Z`} fill="#22C55E" />
            </motion.g>
          </g>

          <g transform={`translate(${center}, ${center})`}>
            <motion.g
              initial={{ rotate: startAngle }}
              whileInView={{ rotate: valToAngle(targets.best) }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 4.5, delay: 0.7, type: "spring", stiffness: 30 }}
            >
              <circle cx="0" cy="0" r="150" fill="transparent" />
              <path d={`M -5 0 L 5 0 L 0 ${-radius + 35} Z`} fill="#3B82F6" />
            </motion.g>
          </g>

          {/* Employee Needle */}
          <g transform={`translate(${center}, ${center})`}>
            <motion.g
              initial={{ rotate: startAngle }}
              whileInView={{ rotate: valToAngle(targets.emp) }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 5.0, delay: 1.0, type: "spring", stiffness: 20, damping: 10 }}
            >
              <circle cx="0" cy="0" r="150" fill="transparent" />
              <path d={`M -6 15 L 6 15 L 2 ${-radius + 15} L -2 ${-radius + 15} Z`} fill="#F8FAFC" />
              <path d={`M -2 ${-radius + 15} L 2 ${-radius + 15} L 0 ${-radius + 5} Z`} fill="#EF4444" />
              <circle cx="0" cy="0" r="12" fill="#F8FAFC" />
              <circle cx="0" cy="0" r="4" fill="#0F172A" />
            </motion.g>
          </g>
        </svg>

        {/* Legend below gauge — avoids all overlap issues */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 pb-2">
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-sm bg-green-500" />
             <span className="text-[11px] font-semibold text-green-400">Org. Average</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-sm bg-blue-500" />
             <span className="text-[11px] font-semibold text-blue-400">Org. Best</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-sm bg-slate-100" />
             <span className="text-[11px] font-semibold text-slate-300">{type === "velocity" ? "Ananya" : "Ananya"}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
