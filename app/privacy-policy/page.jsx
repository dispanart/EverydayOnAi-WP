import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy — EverydayOnAI',
  description: 'Privacy Policy for EverydayOnAI',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="prose prose-slate max-w-none">
            <p>EverydayOnAI ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website.</p>
            <h2>Information We Collect</h2>
            <p>We may collect information you provide directly to us (such as your email address when you subscribe), as well as information collected automatically (such as cookies, IP addresses, and browsing data via Google Analytics and Google AdSense).</p>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to send newsletters, improve our content, display relevant advertisements, and comply with legal obligations.</p>
            <h2>Third-Party Advertising</h2>
            <p>We use Google AdSense to display ads. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out at <a href="https://www.google.com/settings/ads" className="text-blue-600">google.com/settings/ads</a>.</p>
            <h2>Cookies</h2>
            <p>We use cookies to enhance your experience. You can disable cookies in your browser settings, though this may affect functionality.</p>
            <h2>Contact</h2>
            <p>If you have questions about this Privacy Policy, email us at <a href="mailto:hello@everydayonai.com" className="text-blue-600">hello@everydayonai.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
