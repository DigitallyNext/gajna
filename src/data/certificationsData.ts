// Certifications and registrations data for the EthicalSourcing component

export interface Certification {
  name: string;
  logo: string;
  alt: string;
}

const certificationsData: Certification[] = [
  {
    name: "Coffee Board of India",
    logo: "/logos/1.webp",
    alt: "Coffee Board of India logo"
  },
  {
    name: "International Coffee Organization",
    logo: "/logos/2.webp",
    alt: "International Coffee Organization logo"
  },
  {
    name: "GI Certification",
    logo: "/logos/3.webp",
    alt: "GI Certification logo"
  },
  {
    name: "Government of India",
    logo: "/logos/4.webp",
    alt: "Government of India logo"
  },
  {
    name: "NITI Aayog",
    logo: "/logos/5.webp",
    alt: "NITI Aayog logo"
  }
];

export default certificationsData;