import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = { title: 'Disclaimer — EverydayOnAI' };

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Disclaimer</h1>
          <div className="prose prose-slate max-w-none mt-8">
            <p>The information provided on EverydayOnAI is for general informational and educational purposes only. While we strive to provide accurate and up-to-date information about AI tools and trends, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the content.</p>
            <h2>Affiliate Disclosure</h2>
            <p>Some links on this site may be affiliate links. If you click on a link and make a purchase, we may receive a small commission at no extra cost to you. This helps us continue producing quality content.</p>
            <h2>Advertising</h2>
            <p>This site participates in the Google AdSense program. Ads are served by Google and may be based on your browsing history. We do not control the specific ads shown.</p>
            <h2>No Professional Advice</h2>
            <p>Nothing on EverydayOnAI constitutes professional business, legal, or financial advice. Always consult a qualified professional before making business decisions based on AI tools or strategies.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
