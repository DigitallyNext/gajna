import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CoffeeProducts from '@/components/CoffeeProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import EthicalSourcing from '@/components/EthicalSourcing';
import KnowledgeHub from '@/components/KnowledgeHub';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Header />
      <Hero />
      <CoffeeProducts />
      <WhyChooseUs />
      <EthicalSourcing />
      <KnowledgeHub />
      <Newsletter />
      <Footer />
    </main>
  );
}
