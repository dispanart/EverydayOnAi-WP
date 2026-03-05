'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Mail, Twitter, Linkedin, Youtube } from 'lucide-react';
import { SITE, FOOTER_LINKS } from '@/config/site';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      // TODO: Connect to Mailchimp / ConvertKit / Buttondown API
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="EverydayOnAI">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                EverydayOn<span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              {SITE.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Twitter,  label: 'Twitter',  href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Youtube,  label: 'YouTube',  href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg
                             flex items-center justify-center transition-colors"
                >
                  <Icon size={14} className="text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Topics</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.topics.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Get AI insights delivered weekly. No spam.
            </p>
            {submitted ? (
              <p className="text-green-400 text-sm font-semibold">✓ You&apos;re subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="bg-slate-800 text-white text-sm px-4 py-2.5 rounded-lg
                             border border-slate-700 focus:outline-none focus:border-blue-500
                             placeholder:text-slate-600 transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                             text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <Mail size={14} />
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row
                       justify-between items-center gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Built with Next.js + Headless WordPress</span>
        </div>
      </div>
    </footer>
  );
}
