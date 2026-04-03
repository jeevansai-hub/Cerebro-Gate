import { Hero } from "@/components/sections/Hero";
import { LLMTicker } from "@/components/sections/LLMTicker";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { Features } from "@/components/sections/Features";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { BillingNightmare } from "@/components/sections/BillingNightmare";
import { Pipeline } from "@/components/sections/Pipeline";
import { Dashboard } from "@/components/sections/Dashboard";
import { Capabilities } from "@/components/sections/Capabilities";
import { NewFeatures } from "@/components/sections/NewFeatures";
import { RoutingVisualizer } from "@/components/sections/RoutingVisualizer";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      <LLMTicker />
      <MetricsStrip />
      <Features />
      <Problem />
      <Solution />
      <PlatformOverview />
      <BillingNightmare />
      <Pipeline />
      <Dashboard />
      <Capabilities />
      <NewFeatures />
      <RoutingVisualizer />
      <Pricing />
      <Testimonials />
      <CTA />
    </div>
  );
}
