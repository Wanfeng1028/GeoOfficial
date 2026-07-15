import { Hero } from '@/components/marketing/hero/Hero';
import { ProductObjects } from '@/components/marketing/product-objects/ProductObjects';
import { WorkflowNarrative } from '@/components/marketing/workflow-narrative/WorkflowNarrative';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
import { ContextShowcase } from '@/components/marketing/context-showcase/ContextShowcase';
import { EcosystemShowcase } from '@/components/marketing/ecosystem-showcase/EcosystemShowcase';
import { OpenDevelopment } from '@/components/marketing/open-development/OpenDevelopment';
import { ChangelogPreview } from '@/components/marketing/changelog-preview/ChangelogPreview';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductObjects />
      <WorkflowNarrative />
      <ModeShowcase />
      <UseCaseStory />
      <ContextShowcase />
      <EcosystemShowcase />
      <OpenDevelopment />
      <ChangelogPreview />
      <FinalCta />
    </>
  );
}

