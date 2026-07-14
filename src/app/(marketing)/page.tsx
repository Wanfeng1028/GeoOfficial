import { Hero } from '@/components/marketing/hero/Hero';
import { ProductPrinciples } from '@/components/marketing/product-principles/ProductPrinciples';
import { WorkflowStory } from '@/components/marketing/workflow-story/WorkflowStory';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
import { ProductDetails } from '@/components/marketing/product-details/ProductDetails';
import { ArchitectureDiagram } from '@/components/marketing/architecture-diagram/ArchitectureDiagram';
import { OpenDevelopment } from '@/components/marketing/open-development/OpenDevelopment';
import { DownloadPanel } from '@/components/marketing/download-panel/DownloadPanel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPrinciples />
      <WorkflowStory />
      <ModeShowcase />
      <UseCaseStory />
      <ProductDetails />
      <ArchitectureDiagram />
      <OpenDevelopment />
      <DownloadPanel />
    </>
  );
}
