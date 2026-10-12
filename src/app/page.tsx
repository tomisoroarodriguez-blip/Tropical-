import { Hero } from "@/components/sections/Hero";
import { Insurances } from "@/components/sections/Insurances";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Claims } from "@/components/sections/Claims";
import { FAQ } from "@/components/sections/FAQ";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { faqLd, jsonLdString } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <Hero />
      <Insurances />
      <QuoteSection />
      <WhyUs />
      <HowItWorks />
      <Claims />
      <FAQ />
      <About />
      <Contact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqLd) }} />
    </>
  );
}
