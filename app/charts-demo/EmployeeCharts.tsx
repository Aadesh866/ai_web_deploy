"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mock data based on the product context (Competencies)
const employeeData = [
  { category: "Execution", score: 95, color: "from-green-400 to-emerald-600", colorHex: "#10b981", label: "High Impact" },
  { category: "Collaboration", score: 65, color: "from-blue-400 to-indigo-600", colorHex: "#3b82f6", label: "Steady Performer" },
  { category: "Domain Acumen", score: 25, color: "from-red-400 to-rose-600", colorHex: "#e11d48", label: "Needs Improvement" },
];

export function EmployeeCharts() {
  return (
    <div className="space-y-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Scenario 1: Employee Contribution Levels</h2>
        <p className="text-text-secondary">Visualizing an individual's engagement across different competencies.</p>
      </div>

      {/* Variation 1: 3D Glowing Spheres on Grid */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 1: 3D Glowing Spheres</h3>
        <div className="relative h-[400px] w-full max-w-4xl mx-auto flex items-end justify-center gap-16 sm:gap-32 pb-12 perspective-[1000px]">
          {/* Floor Grid */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [transform:rotateX(60deg)] origin-bottom opacity-50" />

          {employeeData.map((item, i) => (
            <div key={item.category} className="relative flex flex-col items-center group z-10">
              {/* Drop Shadow/Reflection on Grid */}
              <div className="absolute -bottom-4 w-24 h-8 bg-black/40 blur-md rounded-[100%] [transform:rotateX(60deg)] group-hover:bg-black/60 transition-all" />

              {/* Glowing Line connecting sphere to floor */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${item.score * 2.5}px` }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.5, delay: 0.5 + i * 0.4, ease: "easeOut" }}
                className="w-1 bg-gradient-to-t from-transparent to-white/50 relative"
              >
                {/* 3D Sphere */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 60, damping: 15, delay: 1.0 + i * 0.4 }}
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
              <div className="absolute -bottom-24 text-center w-40 -ml-2">
                <p className="text-white font-semibold text-sm whitespace-nowrap">{item.category}</p>
                <p className="text-text-secondary text-xs">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variation 1.5: True 3D Isometric Scatter (Values Manifested style) */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 1.5: 3D Isometric Scatter</h3>
        <div className="relative h-[550px] w-full max-w-2xl mx-auto flex items-center justify-center pt-8">
           <ValuesManifested3DChart />
        </div>
      </div>

      {/* Variation 2: Radar / Web Chart */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 2: Futuristic Radar Web</h3>
        <div className="relative h-[400px] w-full max-w-xl mx-auto flex items-center justify-center">
          <RadarChart data={employeeData} />
        </div>
      </div>

      {/* Variation 3: Orbital Rings */}
      <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8 text-center">Variation 3: Orbital Contribution Rings</h3>
        <div className="relative h-[400px] w-full max-w-2xl mx-auto flex items-center justify-center">
          <OrbitalChart data={employeeData} />
        </div>
      </div>
    </div>
  );
}

// Helper component for Radar Chart
function RadarChart({ data }: { data: typeof employeeData }) {
  const size = 300;
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

  // Polygon path for the data
  const dataPoints = data.map((d, i) => getCoordinates(d.score, i));
  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Web Grid */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => {
          const points = data.map((_, index) => getCoordinates(scale * 100, index));
          const path = points.map((p, j) => `${j === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
          return (
            <path key={i} d={path} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          );
        })}

        {/* Axes */}
        {data.map((_, i) => {
          const endPoint = getCoordinates(100, i);
          return (
            <line key={i} x1={center} y1={center} x2={endPoint.x} y2={endPoint.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          );
        })}

        {/* Data Polygon */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          d={polygonPath}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))" }}
        />

        {/* Data Points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0 }}
            whileInView={{ r: 6 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 2.0 + i * 0.4, type: "spring", stiffness: 60, damping: 12 }}
            cx={p.x}
            cy={p.y}
            fill={data[i].colorHex}
            className="cursor-pointer"
            style={{ filter: `drop-shadow(0 0 8px ${data[i].colorHex})` }}
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
              className="text-xs font-semibold"
            >
              {d.category}
              <tspan x={labelPoint.x} dy="16" fill="rgba(255,255,255,0.5)" className="text-[10px]">
                {d.score}%
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// Helper component for Orbital Chart
function OrbitalChart({ data }: { data: typeof employeeData }) {
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
              {/* Animated Progress Ring */}
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 3, delay: 0.5 + i * 0.5, ease: "easeOut" }}
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
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-6">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.colorHex }} />
            <span className="text-xs text-text-secondary">{d.category} ({d.score}%)</span>
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
    return { cx: isoX * 2.5 + 200, cy: isoY * 2.5 + 400 }; // Scale and center lower down
  };

  const projectFloor = (x: number, z: number) => {
    const isoX = (x - z) * 0.866;
    const isoY = (x + z) * 0.5;
    return { cx: isoX * 2.5 + 200, cy: isoY * 2.5 + 400 };
  };

  return (
    <div className="relative w-full h-full max-w-[400px]">
      <svg viewBox="0 0 400 550" className="w-full h-full overflow-visible">
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
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, delay: i * 0.3 }}
                 x1={floorPos.cx} y1={floorPos.cy} x2={pos.cx} stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" strokeDasharray="3 3" 
              />
              {/* Floor shadow */}
              <ellipse cx={floorPos.cx} cy={floorPos.cy} rx="8" ry="4" fill="rgba(0,0,0,0.5)" />
              {/* Floating Point */}
              <motion.circle 
                 initial={{ cy: floorPos.cy, r: 0 }}
                 whileInView={{ cy: pos.cy, r: 8 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, delay: i * 0.3, type: "spring" }}
                 cx={pos.cx} fill={pt.color} filter="url(#glow3d)" 
              />
              <motion.circle 
                 initial={{ cy: floorPos.cy, opacity: 0 }}
                 whileInView={{ cy: pos.cy, opacity: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, delay: i * 0.3 + 0.5 }}
                 cx={pos.cx} r="3" fill="#fff" 
              />
              {/* Label */}
              <motion.text 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.5, delay: i * 0.3 + 1.5 }}
                 x={pos.cx + 15} y={pos.cy + 4} fill="white" fontSize="12" fontWeight="bold"
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
