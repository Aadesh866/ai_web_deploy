import { EmployeeCharts } from "./EmployeeCharts";
import { CompanyCharts } from "./CompanyCharts";

export const metadata = {
  title: "Modern Charts Demo | Purplehub",
  description: "Next-level live animated graphical charts for performance tracking.",
};

export default function ChartsDemoPage() {
  return (
    <div className="min-h-screen bg-primary-dark pt-32 pb-24 selection:bg-primary-brand/30">
      {/* Background styling to match the site's dark aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-green-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Visualizations
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Data <span className="bg-gradient-to-r from-primary-brand to-secondary bg-clip-text text-transparent">Representations</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Interactive, data-driven charts for performance intelligence and organizational clarity.
          </p>
        </div>

        <div className="space-y-32">
          {/* Individual Scenario */}
          <EmployeeCharts />
          
          <hr className="border-border/50" />

          {/* Company-Wide Scenario */}
          <CompanyCharts />
        </div>
      </div>
    </div>
  );
}
