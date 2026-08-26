import { Catalog } from '@/components/catalog/Catalog';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MobileQuoteBar } from '@/components/MobileQuoteBar';
import { ProductPreviewModal } from '@/components/ProductPreviewModal';
import { PurchaseModes } from '@/components/PurchaseModes';
import { QuoteBuilder } from '@/components/QuoteBuilder';
import { Services } from '@/components/Services';
import { UniverseGateway } from '@/components/UniverseGateway';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <UniverseGateway />
        <Catalog />
        <PurchaseModes />
        <Services />
        <QuoteBuilder />
        <FAQ />
      </main>
      <Footer />
      <MobileQuoteBar />
      <ProductPreviewModal />
    </>
  );
}
