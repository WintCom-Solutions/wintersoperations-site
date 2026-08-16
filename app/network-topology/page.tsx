'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SiteNode {
  id: string;
  name: string;
  type: 'hq' | 'regional' | 'branch' | 'cloud';
  x: number;
  y: number;
  status: 'healthy' | 'degraded' | 'warning';
  bandwidth: number;
  latency: number;
  deviceCount: number;
  location: string;
}

interface LinkData {
  from: string;
  to: string;
  latency: number;
  bandwidth: number;
  utilization: number;
  status: 'healthy' | 'degraded' | 'warning';
}

const sites: SiteNode[] = [
  {
    id: 'hq',
    name: 'HQ Datacenter',
    type: 'hq',
    x: 50,
    y: 50,
    status: 'healthy',
    bandwidth: 1000,
    latency: 0,
    deviceCount: 24,
    location: 'Chicago, IL',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    type: 'cloud',
    x: 80,
    y: 30,
    status: 'healthy',
    bandwidth: 500,
    latency: 15,
    deviceCount: 8,
    location: 'us-east-1',
  },
  {
    id: 'west',
    name: 'West Regional',
    type: 'regional',
    x: 20,
    y: 50,
    status: 'healthy',
    bandwidth: 300,
    latency: 45,
    deviceCount: 16,
    location: 'San Francisco, CA',
  },
  {
    id: 'east',
    name: 'East Regional',
    type: 'regional',
    x: 70,
    y: 60,
    status: 'healthy',
    bandwidth: 350,
    latency: 35,
    deviceCount: 14,
    location: 'New York, NY',
  },
  {
    id: 'branch1',
    name: 'LA Branch',
    type: 'branch',
    x: 15,
    y: 75,
    status: 'degraded',
    bandwidth: 150,
    latency: 52,
    deviceCount: 6,
    location: 'Los Angeles, CA',
  },
  {
    id: 'branch2',
    name: 'Miami Branch',
    type: 'branch',
    x: 75,
    y: 80,
    status: 'healthy',
    bandwidth: 180,
    latency: 42,
    deviceCount: 5,
    location: 'Miami, FL',
  },
  {
    id: 'branch3',
    name: 'Seattle Branch',
    type: 'branch',
    x: 10,
    y: 25,
    status: 'healthy',
    bandwidth: 120,
    latency: 58,
    deviceCount: 4,
    location: 'Seattle, WA',
  },
];

const links: LinkData[] = [
  { from: 'hq', to: 'aws', latency: 15, bandwidth: 500, utilization: 42, status: 'healthy' },
  { from: 'hq', to: 'west', latency: 45, bandwidth: 300, utilization: 38, status: 'healthy' },
  { from: 'hq', to: 'east', latency: 35, bandwidth: 350, utilization: 51, status: 'healthy' },
  { from: 'hq', to: 'branch1', latency: 52, bandwidth: 150, utilization: 68, status: 'degraded' },
  { from: 'hq', to: 'branch2', latency: 42, bandwidth: 180, utilization: 45, status: 'healthy' },
  { from: 'hq', to: 'branch3', latency: 58, bandwidth: 120, utilization: 35, status: 'healthy' },
  { from: 'west', to: 'branch1', latency: 12, bandwidth: 100, utilization: 55, status: 'healthy' },
];

export default function NetworkTopology() {
  const [selectedSite, setSelectedSite] = useState<string | null>('hq');

  const siteData = sites.find((s) => s.id === selectedSite);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#10b981';
      case 'degraded':
        return '#f59e0b';
      case 'warning':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✓ Healthy';
      case 'degraded':
        return '⚠ Degraded';
      case 'warning':
        return '✗ Warning';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3.5">
            <Image
              src="/logo.png"
              alt="Winters Operations"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="font-semibold tracking-tight text-2xl">
              Network Topology
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
            <a href="/" className="hover:text-cyan-400 transition">
              Home
            </a>
            <a href="/services" className="hover:text-cyan-400 transition">
              Services
            </a>
            <a href="/demo" className="hover:text-cyan-400 transition">
              Demos
            </a>
            <a href="/about" className="hover:text-cyan-400 transition">
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Multi-Site SD-WAN Topology
          </h1>
          <p className="text-slate-400">
            Real-time view of a distributed network with Meraki SD-WAN connectivity
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Topology Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-navy-900/60 border border-cyan-500/20 rounded-xl overflow-hidden p-6">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-auto"
                style={{ minHeight: '400px' }}
              >
                {/* Grid background */}
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <linearGradient
                    id="nodeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <rect width="800" height="600" fill="url(#grid)" />

                {/* Links/Connections */}
                {links.map((link) => {
                  const fromSite = sites.find((s) => s.id === link.from);
                  const toSite = sites.find((s) => s.id === link.to);
                  if (!fromSite || !toSite) return null;

                  const x1 = (fromSite.x / 100) * 800;
                  const y1 = (fromSite.y / 100) * 600;
                  const x2 = (toSite.x / 100) * 800;
                  const y2 = (toSite.y / 100) * 600;

                  return (
                    <g key={`link-${link.from}-${link.to}`}>
                      {/* Connection line */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={getStatusColor(link.status)}
                        strokeWidth="2"
                        opacity="0.6"
                      />
                      {/* Animated flow indicator */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={getStatusColor(link.status)}
                        strokeWidth="1"
                        opacity="0.3"
                        style={{
                          animation: `dash 8s linear infinite`,
                        }}
                        strokeDasharray="5,5"
                      />
                      {/* Latency label */}
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2 - 8}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="12"
                      >
                        {link.latency}ms
                      </text>
                      {/* Bandwidth label */}
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2 + 10}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="12"
                      >
                        {link.utilization}% util
                      </text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {sites.map((site) => {
                  const x = (site.x / 100) * 800;
                  const y = (site.y / 100) * 600;
                  const isSelected = selectedSite === site.id;
                  const radius = site.type === 'hq' ? 28 : site.type === 'cloud' ? 24 : 20;

                  return (
                    <g key={site.id} onClick={() => setSelectedSite(site.id)}>
                      {/* Glow effect for selected */}
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r={radius + 12}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          opacity="0.3"
                        />
                      )}
                      {/* Node circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={getStatusColor(site.status)}
                        opacity={isSelected ? 1 : 0.7}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      />
                      {/* Status indicator ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill="none"
                        stroke={isSelected ? '#06b6d4' : 'none'}
                        strokeWidth="2"
                        opacity="0.5"
                      />
                      {/* Node label */}
                      <text
                        x={x}
                        y={y + 40}
                        textAnchor="middle"
                        fill={isSelected ? '#06b6d4' : '#cbd5e1'}
                        fontSize="13"
                        fontWeight={isSelected ? '600' : '400'}
                        style={{ cursor: 'pointer' }}
                      >
                        {site.name}
                      </text>
                    </g>
                  );
                })}

                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -10;
                    }
                  }
                `}</style>
              </svg>
            </div>
          </div>

          {/* Site Details Panel */}
          <div className="lg:col-span-1">
            {siteData && (
              <div className="bg-navy-900/60 border border-cyan-500/20 rounded-xl p-6 sticky top-32">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getStatusColor(siteData.status) }}
                    ></div>
                    <span className="text-sm font-semibold text-slate-300">
                      {getStatusLabel(siteData.status)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {siteData.name}
                  </h3>
                  <p className="text-sm text-slate-400">{siteData.location}</p>
                </div>

                <div className="space-y-4 border-t border-cyan-500/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Bandwidth
                    </p>
                    <p className="text-lg font-semibold text-cyan-400">
                      {siteData.bandwidth} Mbps
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Latency to HQ
                    </p>
                    <p className="text-lg font-semibold text-cyan-400">
                      {siteData.latency}ms
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Connected Devices
                    </p>
                    <p className="text-lg font-semibold text-cyan-400">
                      {siteData.deviceCount} devices
                    </p>
                  </div>
                </div>

                {/* Site list */}
                <div className="mt-6 border-t border-cyan-500/10 pt-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                    All Sites
                  </p>
                  <div className="space-y-2">
                    {sites.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => setSelectedSite(site.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded transition ${
                          selectedSite === site.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getStatusColor(site.status) }}
                          ></div>
                          {site.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend & Info */}
        <div className="bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Network Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-semibold text-cyan-400 mb-2">🏢 Topology Type</p>
              <p className="text-slate-400 text-sm">
                Full mesh SD-WAN with hub-and-spoke backup connectivity
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-400 mb-2">🌍 Coverage</p>
              <p className="text-slate-400 text-sm">
                7 sites across North America with AWS cloud failover
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-400 mb-2">📊 Aggregate Bandwidth</p>
              <p className="text-slate-400 text-sm">
                2.6 Gbps total capacity across all links
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-400 mb-2">🔒 Security</p>
              <p className="text-slate-400 text-sm">
                Encrypted tunnels, threat protection, DLP enabled
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-navy-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Winters Operations</div>
          <div className="text-slate-600">Ops, web & automation consulting</div>
        </div>
      </footer>
    </div>
  );
}
