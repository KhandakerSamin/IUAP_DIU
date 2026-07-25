import HeroSection from "@/components/homepage/heroSection";
import AboutIaupSection from "@/components/homepage/aboutIaupSection";
import IaupLeadersSection from "@/components/homepage/iaupLeadersSection";
import AboutDiuSection from "@/components/homepage/aboutDiuSection";
import Iaup2026Section from "@/components/homepage/iaup2026Section";
import TentativeProgramSection from "@/components/homepage/tentativeProgramSection";
import AboutDhakaSection from "@/components/homepage/aboutDhakaSection";
import ImportantDatesSection from "@/components/homepage/importantDatesSection";
import EventSpeakers from "@/components/homepage/EventSpeakers";
import PostEventSection from "@/components/homepage/postEventSection";
import RegistrationSection from "@/components/homepage/registrationSection";
import VenuesSection from "@/components/homepage/venuesSection";
import AccommodationSection from "@/components/homepage/accommodationSection";
import VisaGuidelineSection from "@/components/homepage/visaGuidelineSection";
import PartnerSection from "@/components/homepage/partnerSection";
import ContactSection from "@/components/homepage/contactSection";
import CtaSection from "@/components/homepage/ctaSection";

const homeSections = [
  { id: "hero", Component: HeroSection },
  { id: "about-iaup", Component: AboutIaupSection },
  { id: "iaup-leaders", Component: IaupLeadersSection },
  { id: "about-diu", Component: AboutDiuSection },
  { id: "iaup-2026", Component: Iaup2026Section },
  { id: "about-dhaka", Component: AboutDhakaSection },
  { id: "event-speakers", Component: EventSpeakers },
  { id: "tentative-program", Component: TentativeProgramSection },
  { id: "post-event", Component: PostEventSection },
  { id: "important-dates", Component: ImportantDatesSection },
  { id: "registration", Component: RegistrationSection },
  { id: "venues", Component: VenuesSection },
  { id: "accommodation", Component: AccommodationSection },
  { id: "visa-guideline", Component: VisaGuidelineSection },
  { id: "partner", Component: PartnerSection },
  { id: "contact", Component: ContactSection },
  { id: "cta", Component: CtaSection },
];

export default homeSections;