"use client";

import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      companySize: formData.get("companySize") as string,
      challenge: formData.get("challenge") as string,
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Thank you! We'll be in touch within 48 hours.");
        e.currentTarget.reset();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to submit form"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Noema</div>
          <a
            href="#early-access"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Get Early Access
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/demo.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">
                Used by Meta&apos;s engineering team →
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stop Privacy Violations
              <br />
              Before They Ship
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Automatic runtime enforcement of GDPR, CCPA, and privacy policies.
              Catch violations in development, not production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#early-access"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition text-center"
              >
                Request Demo
              </a>
              <a
                href="#how-it-works"
                className="bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-800 transition text-center"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Problem With Current Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Manual audits don&apos;t scale. Static analysis misses runtime
              violations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2">
                Manual Audits Are Expensive
              </h3>
              <p className="text-gray-600">
                Legal teams spend weeks reviewing code changes. Engineers spend
                days on compliance reviews.
              </p>
              <p className="text-red-600 font-semibold mt-4">
                Cost: $50K+ per quarter
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">🐛</div>
              <h3 className="text-xl font-bold mb-2">
                Violations Slip Through
              </h3>
              <p className="text-gray-600">
                Point-in-time checks miss new code. Violations discovered in
                production after users are affected.
              </p>
              <p className="text-red-600 font-semibold mt-4">
                Risk: 4% of global revenue
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="text-xl font-bold mb-2">Developer Friction</h3>
              <p className="text-gray-600">
                Engineers don&apos;t know what&apos;s allowed. Privacy reviews
                block deployments for days.
              </p>
              <p className="text-red-600 font-semibold mt-4">
                Impact: Slower shipping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof: Meta */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl">🏢</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">
                  Meta Built This Internally. Now You Can Use It.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Meta&apos;s engineering team spent years building{" "}
                  <strong>Policy Zones</strong> — a runtime system that
                  automatically enforces privacy policies across their entire
                  codebase. They process millions of data assets with automatic
                  violation detection.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  We&apos;re bringing this technology to every company, without
                  requiring you to rebuild your infrastructure.
                </p>
                <a
                  href="https://engineering.fb.com/2024/08/27/security/privacy-aware-infrastructure-purpose-limitation-meta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
                >
                  Read Meta&apos;s technical blog post →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Noema Works
            </h2>
            <p className="text-xl text-gray-600">
              Three steps to automatic compliance
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Define Your Privacy Policies
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Tell us what data you collect and what purposes it can be used
                  for. Simple, declarative syntax.
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  email:
                  <br />
                  &nbsp;&nbsp;allowed_purposes: [login, support]
                  <br />
                  &nbsp;&nbsp;forbidden: [marketing, analytics]
                  <br />
                  &nbsp;&nbsp;retention: 2 years
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-xl">
                <div className="text-6xl text-center">📋</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Automatic Detection</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Noema scans your codebase and identifies every place where
                  personal data is used. No manual annotation needed.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Finds PII in variables, databases, APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Tracks data flows across functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Maps to analytics, logging, third-parties</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-xl">
                <div className="text-6xl text-center">🔍</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Runtime Enforcement</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Violations are caught automatically during development and
                  blocked in CI/CD. No more surprises in production.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="font-mono text-sm text-red-800">
                    ❌ <strong>Policy Violation Detected</strong>
                    <br />
                    File: analytics.py:42
                    <br />
                    Issue: user_email used for analytics
                    <br />
                    Policy: Email only for [login, support]
                    <br />
                    <span className="text-blue-600">
                      → Suggested fix: Use hashed email
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-xl">
                <div className="text-6xl text-center">🛡️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Teams Choose Noema
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Ship Faster</h3>
              <p className="text-gray-600">
                No more waiting for manual privacy reviews. Violations caught
                instantly in your IDE and CI/CD.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">
                Reduce Compliance Costs
              </h3>
              <p className="text-gray-600">
                Replace expensive manual audits with automatic enforcement. Save
                $100K+ annually.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Prevent Fines</h3>
              <p className="text-gray-600">
                Catch violations before they reach production. GDPR fines up to
                4% of revenue — one prevented fine pays for years.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">👨‍💻</div>
              <h3 className="text-xl font-bold mb-2">Developer-Friendly</h3>
              <p className="text-gray-600">
                Clear error messages with fix suggestions. Integrates with Git,
                VS Code, and your existing workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="py-20 hero-gradient text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Get Early Access</h2>
          <p className="text-xl mb-8 text-purple-100">
            We&apos;re onboarding the first 50 companies. Join the waitlist to
            get priority access and founding customer pricing.
          </p>

          <form
            className="bg-white rounded-xl p-8 text-left"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  placeholder="Acme Inc"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company Size *
                </label>
                <select
                  name="companySize"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select size...</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1,000 employees</option>
                  <option value="1000+">1,000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Biggest Privacy Challenge
                </label>
                <textarea
                  name="challenge"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  placeholder="Tell us about your biggest compliance pain point..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Request Early Access"}
              </button>

              <p className="text-sm text-gray-600 text-center">
                We&apos;ll reach out within 48 hours to schedule a demo
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-bold text-lg cursor-pointer">
                What languages do you support?
              </summary>
              <p className="mt-4 text-gray-600">
                We support most of the popular programming languages including
                Python, JavaScript/TypeScript, Java, Go, C#, Ruby, and more.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-bold text-lg cursor-pointer">
                How is this different from static analysis tools?
              </summary>
              <p className="mt-4 text-gray-600">
                Static analysis can only check code at rest. Noema tracks data
                flows at runtime and enforces policies dynamically, catching
                violations that static analysis misses.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-bold text-lg cursor-pointer">
                Does this slow down my application?
              </summary>
              <p className="mt-4 text-gray-600">
                In development: minimal overhead. In production: we use
                lightweight instrumentation with &lt;1% performance impact. You
                can also run in &quot;monitoring only&quot; mode.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-bold text-lg cursor-pointer">
                What about existing code?
              </summary>
              <p className="mt-4 text-gray-600">
                We start in &quot;audit mode&quot; — detecting violations
                without blocking. Once you&apos;ve remediated issues, you can
                enable enforcement to prevent new violations.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-bold text-lg cursor-pointer">
                How much does it cost?
              </summary>
              <p className="mt-4 text-gray-600">
                Pricing starts at $500/month for small teams. Enterprise pricing
                based on codebase size and team size. Early access customers get
                50% off for the first year.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold gradient-text mb-4">Noema</div>
          <p className="mb-6">
            Automatic privacy compliance for modern engineering teams
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Noema. Built on technology pioneered by Meta.
          </p>
        </div>
      </footer>
    </div>
  );
}
