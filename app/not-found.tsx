import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold leading-none gradient-text font-heading">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-heading">
            Page Not Found
          </h2>
          <p className="text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
            Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-brand text-white rounded-2xl font-semibold text-base hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            <Search className="w-5 h-5" />
            Contact Support
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-text-secondary mb-4">Quick Links:</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/platform" className="text-primary-brand hover:text-green-400 transition-colors">
              Platform
            </Link>
            <Link href="/solutions" className="text-primary-brand hover:text-green-400 transition-colors">
              Solutions
            </Link>
            <Link href="/resources" className="text-primary-brand hover:text-green-400 transition-colors">
              Resources
            </Link>
            <Link href="/insights" className="text-primary-brand hover:text-green-400 transition-colors">
              Insights
            </Link>
            <Link href="/brochure" className="text-primary-brand hover:text-green-400 transition-colors">
              Brochure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
