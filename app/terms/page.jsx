import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = { title: 'Terms of Service — EverydayOnAI' };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-400 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="prose prose-slate max-w-none">
            <p>By accessing EverydayOnAI, you agree to these Terms of Service. If you do not agree, please do not use our website.</p>
            <h2>Content</h2>
            <p>All content on EverydayOnAI is for informational purposes only. We strive for accuracy but make no warranties about the completeness, reliability, or suitability of the information.</p>
            <h2>Intellectual Property</h2>
            <p>All content, logos, and trademarks on this site are the property of EverydayOnAI unless otherwise stated. You may not reproduce content without prior written permission.</p>
            <h2>External Links</h2>
            <p>Our site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>
            <h2>Changes</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
