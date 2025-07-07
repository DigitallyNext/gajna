// Benefits data for the WhyChooseUs component

export interface BenefitCard {
  title: string;
  description: string;
  image: string;
}

const benefitsData: BenefitCard[] = [
  {
    title: "On-the-Ground Sourcing Access",
    description: "Connected to the roots of Indian coffee. We work directly with farmers, FPOs, and coffee curators across growing regions - giving us traceable access to high-quality lots and giving you better control at origin.",
    image: "/cards/1.webp"
  },
  {
    title: "Founder-Led, Detail-Driven",
    description: "Connected to the roots of Indian coffee. We work directly with farmers, FPOs, and coffee curators across growing regions - giving us traceable access to high-quality lots and giving you better control at origin.",
    image: "/cards/2.webp"
  },
  {
    title: "Packaging That Protects the Bean",
    description: "Export-ready, Roaster-approved. We use moisture-safe liners, gas options, and roaster-friendly packaging that preserves freshness - so your green coffee lands exactly how it left us.",
    image: "/cards/3.webp"
  }
];

export default benefitsData;