import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Zap, Mail, Globe, Shield } from 'lucide-react';

export const metadata = {
  title: 'About Us — EverydayOnAI',
  description: 'Learn about EverydayOnAI — your daily source for practical AI insights.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap size={22} className="text-white fill-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              EverydayOn<span className="text-blue-600">AI</span>
            </h1>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              EverydayOnAI is your daily source for practical, accessible AI insights — covering business applications, tool reviews, creative ideas, and how AI shapes everyday life.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe AI shouldn't be intimidating. Our mission is to break down complex AI concepts into actionable, real-world insights that anyone can understand and use — whether you're a business owner, a creative professional, or simply curious about the future.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li><strong>AI for Business</strong> — Practical strategies, use cases, and ROI of AI tools for companies of all sizes.</li>
              <li><strong>AI Tools Review</strong> — Honest, in-depth reviews and comparisons of the latest AI software.</li>
              <li><strong>Ideas & Creativity</strong> — How AI is transforming art, writing, music, and creative work.</li>
              <li><strong>Everyday AI & Lifestyle</strong> — AI in daily life, productivity, health, education, and more.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              Have a story tip, partnership inquiry, or just want to say hello?{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">Reach out here</Link>.
            </p>
          </div>

          {/* Quick links */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: Mail, label: 'Contact', href: '/contact' },
              { icon: Globe, label: 'Subscribe', href: '/subscribe' },
              { icon: Shield, label: 'Privacy Policy', href: '/privacy-policy' },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={href} href={href} className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
