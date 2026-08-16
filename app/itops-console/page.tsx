'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ConsoleOutput {
  id: string;
  type: 'command' | 'output' | 'status' | 'error' | 'success';
  text: string;
  timestamp: string;
}

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  resolved: boolean;
}

export default function ITOpsConsole() {
  const [isRunning, setIsRunning] = useState(false);
  const [outputs, setOutputs] = useState<ConsoleOutput[]>([
    {
      id: '0',
      type: 'status',
      text: 'IT Ops Troubleshooting Console — Ready',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-1',
      severity: 'critical',
      message: 'Network latency spike detected on primary WAN link',
      resolved: false,
    },
    {
      id: 'alert-2',
      severity: 'warning',
      message: 'Meraki dashboard API response time > 2s',
      resolved: false,
    },
    {
      id: 'alert-3',
      severity: 'info',
      message: 'SolarWinds backup job completed successfully',
      resolved: true,
    },
  ]);

  const addOutput = (text: string, type: ConsoleOutput['type'] = 'output') => {
    setOutputs((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        type,
        text,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    addOutput('$ diagnose --network --api --services', 'command');

    // Simulate diagnostic steps
    const steps = [
      {
        delay: 500,
        text: '[INFO] Checking network connectivity...',
        type: 'status' as const,
      },
      {
        delay: 1200,
        text: 'Ping latency to primary gateway: 45ms (normal)',
        type: 'output' as const,
      },
      {
        delay: 1800,
        text: 'Secondary WAN link: 380ms (⚠️ degraded)',
        type: 'warning' as const,
      },
      {
        delay: 2400,
        text: '[INFO] Querying Meraki dashboard API...',
        type: 'status' as const,
      },
      {
        delay: 3200,
        text: 'API endpoint response: 1850ms (acceptable)',
        type: 'output' as const,
      },
      {
        delay: 3800,
        text: '[INFO] Checking SolarWinds Orion platform...',
        type: 'status' as const,
      },
      {
        delay: 4600,
        text: 'Node count: 127 | Alerts: 3 | Health: 94%',
        type: 'output' as const,
      },
      {
        delay: 5200,
        text: '[INFO] Running ServiceNow CMDB sync...',
        type: 'status' as const,
      },
      {
        delay: 6200,
        text: 'Assets synced: 342 | Last update: 18 minutes ago',
        type: 'output' as const,
      },
      {
        delay: 6800,
        text: '✓ All diagnostics completed',
        type: 'success' as const,
      },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      addOutput(step.text, step.type);
    }

    // Resolve the critical alert after diagnostics
    await new Promise((resolve) => setTimeout(resolve, 1000));
    resolveAlert('alert-1');
    addOutput(
      'Secondary WAN link issue identified and escalated to carrier',
      'output'
    );

    setIsRunning(false);
  };

  const executeOptimization = async () => {
    setIsRunning(true);
    addOutput('$ optimize --meraki --solarwinds --servicenow', 'command');

    const steps = [
      {
        delay: 500,
        text: '[INFO] Optimizing Meraki network configuration...',
        type: 'status' as const,
      },
      {
        delay: 1500,
        text: 'Updated QoS policies on 8 switches',
        type: 'output' as const,
      },
      {
        delay: 2200,
        text: 'Enabled adaptive bandwidth throttling',
        type: 'output' as const,
      },
      {
        delay: 3000,
        text: '[INFO] Synchronizing SolarWinds monitoring...',
        type: 'status' as const,
      },
      {
        delay: 4000,
        text: 'Added 12 new custom monitoring templates',
        type: 'output' as const,
      },
      {
        delay: 4700,
        text: 'Created 5 automated remediation workflows',
        type: 'output' as const,
      },
      {
        delay: 5400,
        text: '[INFO] Updating ServiceNow Change Calendar...',
        type: 'status' as const,
      },
      {
        delay: 6400,
        text: 'Scheduled maintenance windows for next 30 days',
        type: 'output' as const,
      },
      {
        delay: 7100,
        text: '✓ Optimization complete — Network efficiency +23%',
        type: 'success' as const,
      },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      addOutput(step.text, step.type);
    }

    setIsRunning(false);
  };

  useEffect(() => {
    const consoleEl = document.getElementById('console-output');
    if (consoleEl) {
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }
  }, [outputs]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Winters Operations"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold tracking-tight text-lg">
              IT Ops Console
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
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Network Troubleshooting Console
          </h1>
          <p className="text-slate-400">
            Live demonstration of Winters Operations operational diagnostics and
            optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Left: Console Output */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 bg-navy-900/60 border border-cyan-500/20 rounded-xl overflow-hidden flex flex-col">
              {/* Console Header */}
              <div className="bg-navy-800/80 border-b border-cyan-500/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Live Console
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {outputs.length} lines
                </span>
              </div>

              {/* Console Content */}
              <div
                id="console-output"
                className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm"
              >
                {outputs.map((output) => (
                  <div key={output.id} className="flex gap-2">
                    <span className="text-slate-600 flex-shrink-0 w-12">
                      {output.timestamp}
                    </span>
                    <span
                      className={`flex-1 ${
                        output.type === 'command'
                          ? 'text-cyan-400'
                          : output.type === 'error'
                            ? 'text-red-400'
                            : output.type === 'success'
                              ? 'text-green-400'
                              : output.type === 'warning'
                                ? 'text-yellow-400'
                                : output.type === 'status'
                                  ? 'text-cyan-300'
                                  : 'text-slate-300'
                      }`}
                    >
                      {output.type === 'command' ? '$ ' : '> '}
                      {output.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={runDiagnostics}
                disabled={isRunning}
                className="flex-1 px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-400/60 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                {isRunning ? 'Running Diagnostics...' : 'Run Diagnostics'}
              </button>
              <button
                onClick={executeOptimization}
                disabled={isRunning}
                className="flex-1 px-4 py-3 rounded-lg bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500/30 hover:border-green-400/60 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                {isRunning ? 'Optimizing...' : 'Execute Optimization'}
              </button>
            </div>
          </div>

          {/* Right: Alert Panel */}
          <div className="flex flex-col gap-4">
            {/* Active Alerts Section */}
            <div className="bg-navy-900/60 border border-red-500/20 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                <h3 className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                  ⚠ Active Alerts
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {alerts
                  .filter((a) => !a.resolved)
                  .map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg text-xs space-y-2 ${
                        alert.severity === 'critical'
                          ? 'bg-red-500/10 border border-red-500/30'
                          : alert.severity === 'warning'
                            ? 'bg-yellow-500/10 border border-yellow-500/30'
                            : 'bg-blue-500/10 border border-blue-500/30'
                      }`}
                    >
                      <p
                        className={
                          alert.severity === 'critical'
                            ? 'text-red-300'
                            : alert.severity === 'warning'
                              ? 'text-yellow-300'
                              : 'text-blue-300'
                        }
                      >
                        {alert.message}
                      </p>
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="text-xs px-2 py-1 rounded bg-slate-600/50 hover:bg-slate-600 text-slate-200 transition"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  ))}
                {alerts.filter((a) => !a.resolved).length === 0 && (
                  <p className="text-slate-500 text-center py-4">
                    All alerts resolved
                  </p>
                )}
              </div>
            </div>

            {/* Resolved Section */}
            <div className="bg-navy-900/60 border border-green-500/20 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-3">
                <h3 className="text-sm font-semibold text-green-300 uppercase tracking-wider">
                  ✓ Resolved ({alerts.filter((a) => a.resolved).length})
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {alerts
                  .filter((a) => a.resolved)
                  .map((alert) => (
                    <div
                      key={alert.id}
                      className="p-2 rounded text-xs bg-green-500/5 border border-green-500/20 text-green-400 line-through"
                    >
                      {alert.message}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            What You're Seeing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">📊 Diagnostics</p>
              <p>
                Real-time network performance checks across Meraki, SolarWinds,
                and ServiceNow platforms.
              </p>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-2">🔧 Optimization</p>
              <p>
                Automated configuration updates and workflow automation to
                improve network efficiency.
              </p>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-2">🎯 Integration</p>
              <p>
                Multi-platform alerting and remediation across your entire
                operations stack.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Ready to streamline your operations?
          </h3>
          <p className="text-slate-300 mb-4">
            Winters Operations builds custom solutions for your infrastructure,
            reducing toil and improving visibility.
          </p>
          <a
            href="mailto:solutions@wintersoperations.com"
            className="inline-flex px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
          >
            Get in Touch
          </a>
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
