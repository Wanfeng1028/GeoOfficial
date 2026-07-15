import { Hero } from '@/components/marketing/hero/Hero';
import { ProductObjects } from '@/components/marketing/product-objects/ProductObjects';
import { WorkflowNarrative } from '@/components/marketing/workflow-narrative/WorkflowNarrative';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
import { ArchitectureDiagram } from '@/components/marketing/architecture-diagram/ArchitectureDiagram';
import { OpenDevelopment } from '@/components/marketing/open-development/OpenDevelopment';
import { DownloadPanel } from '@/components/marketing/download-panel/DownloadPanel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductObjects />
      <WorkflowNarrative />
      <ModeShowcase />
      <UseCaseStory />
      <ArchitectureDiagram />
      <OpenDevelopment />
      <DownloadPanel />
    </>
  );
}
