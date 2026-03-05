'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Zap, CheckCircle } from 'lucide-react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: Connect to your email provider (Mailchimp, ConvertKit, etc.)
    await new Promise((r) => setTimeout(r, 800)); // simulate API call
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 max-w-md w-full p-10 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap size={24} className="text-white fill-white" />
          </div>

          {submitted ? (
            <>
              <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">You're subscribed! 🎉</h1>
              <p className="text-slate-500 text-sm">
                Welcome to EverydayOnAI. You'll get our best AI insights straight to your inbox.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Stay ahead of AI</h1>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Get the best AI insights for business, tools, and everyday life — delivered weekly. No spam, ever.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 bg-slate-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all"
                >
                  <Mail size={15} />
                  {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
              <p className="text-xs text-slate-400 mt-4">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
