import { motion } from "framer-motion";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaBug,
  FaNpm,
  FaTag,
} from "react-icons/fa6";

import { SectionWrapper } from "../../../layout/SectionWrapper";
// import { useInViewReveal } from "../../../shared/hooks/useInViewReveal";
import { revealItem } from "../../../shared/motion/variants";
import { buildContributionGuidePath } from "../../../app/navigation";
import {
  sculptorNpmOrgUrl,
  sculptorProductSpec,
  sculptorReleasesUrl,
  sculptorRepoUrl,
} from "../data";
import { SculptorPackageDownloadsPill } from "./SculptorPackageDownloadsPill";

type SculptorProductPageProps = {
  onBack: () => void;
  onOpenContributions: () => void;
  onOpenGuide: () => void;
};

type CodeEditorBlockProps = {
  filename: string;
  lines: string[];
  language?: string;
};

function CodeEditorBlock({
  filename,
  lines,
  language = "json",
}: CodeEditorBlockProps) {
  return (
    <div
      className="sculptor-editor"
      role="region"
      aria-label={`${filename} code preview`}
    >
      <div className="sculptor-editor__chrome">
        <div className="sculptor-editor__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="sculptor-editor__filename">{filename}</p>

        <span className="sculptor-editor__lang">{language}</span>
      </div>

      <div className="sculptor-editor__body">
        {lines.map((line, index) => (
          <div key={`${filename}-${index}`} className="sculptor-editor__line">
            <span className="sculptor-editor__line-no">{index + 1}</span>

            <code className="sculptor-editor__line-code">{line}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SculptorProductPage({
  onBack,
  onOpenContributions,
  onOpenGuide,
}: SculptorProductPageProps) {

  const spec = sculptorProductSpec;

  return (
    <SectionWrapper
        id="sculptor-product"
        eyebrow="Framework Product"
        title={spec.brand}
        description={`${spec.namespace} • CLI: ${spec.cli}`}
        className="sculptor-product"
        bodyClassName="sculptor-product__body"
        titleAs="h1"
      >
        <motion.div
          className="sculptor-product__stack"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
        >
        <motion.article
          variants={revealItem}
          className="sculptor-product__overview"
        >
          <div className="sculptor-product__overview-frame">
            <img
              src="/sculptor-full-bg.png"
              alt="Sculptor TS Logo"
              className="sculptor-product__logo--full"
            />
          </div>
        </motion.article>

        <motion.article
          variants={revealItem}
          className="sculptor-product__hero"
        >
          <div className="sculptor-product__hero-copy">
            <p className="sculptor-product__status sculptor-product__status--beta">
              {spec.version}
            </p>

            <h2 className="sculptor-product__hero-title">{spec.positioning}</h2>

            <p className="sculptor-product__hero-text">{spec.overview}</p>

            <p className="sculptor-product__hero-note">
              {spec.cli} keeps the workflow small enough to memorize and strict
              enough to trust.
            </p>
          </div>

          <div className="sculptor-product__hero-actions">
            <button type="button" className="link-btn" onClick={onOpenGuide}>
              <FaArrowRightLong aria-hidden="true" /> Open Guide
            </button>

            <button
              type="button"
              className="link-btn"
              onClick={onOpenContributions}
            >
              <FaArrowRightLong aria-hidden="true" /> All Contributions
            </button>

            <a
              href={sculptorNpmOrgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn--ghost"
            >
              <FaNpm aria-hidden="true" /> Sculptor NPM
            </a>

            <a
              href={sculptorReleasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn--ghost"
            >
              <FaTag aria-hidden="true" /> Releases
            </a>

            <button
              type="button"
              className="link-btn link-btn--ghost"
              onClick={onBack}
            >
              <FaArrowLeftLong aria-hidden="true" /> Back
            </button>

            <a
              href={`${sculptorRepoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn--warning"
            >
              <FaBug aria-hidden="true" /> Report Bug
            </a>
          </div>
        </motion.article>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Package Architecture</h3>

          <div className="sculptor-product__modules">
            {spec.packageSections.map((section) => (
              <article
                key={section.name}
                className="sculptor-product__module-card"
              >
                <div className="sculptor-product__module-card-top">
                  <div className="sculptor-product__module-card-copy">
                    <h4>{section.name}</h4>

                    <p className="sculptor-product__module-summary">
                      {section.summary}
                    </p>
                  </div>

                  <SculptorPackageDownloadsPill packageName={section.npmPackage} />
                </div>

                <div className="sculptor-product__pill-list">
                  {section.responsibilities.map((responsibility) => (
                    <span key={responsibility} className="certification-skill-pill">
                      {responsibility}
                    </span>
                  ))}
                </div>

                <div className="sculptor-product__module-card-actions">
                  <a
                    href={`${buildContributionGuidePath("sculptor-ts")}#${section.guideAnchor}`}
                    className="link-btn link-btn--ghost"
                    title={section.readmePath}
                  >
                    Read Guide
                  </a>
            <a
              href={section.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn--ghost"
            >
                    Go to npm
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Runtime Flow</h3>

          <ol className="sculptor-product__flow-list">
            {spec.runtimeFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Routing Options</h3>

          <div className="sculptor-product__routing-grid">
            {spec.routingModes.map((mode) => (
              <article
                key={mode.name}
                className="sculptor-product__routing-card"
              >
                <h4>{mode.name}</h4>

                <p>{mode.summary}</p>

                <CodeEditorBlock
                  filename={mode.filename}
                  lines={mode.example}
                  language="ts"
                />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Configuration Model</h3>

          <div className="sculptor-product__config-grid">
            {spec.configuration.map((config) => (
              <article
                key={config.file}
                className="sculptor-product__config-card"
              >
                <h4>{config.file}</h4>

                <p>{config.purpose}</p>

                <ul>
                  {config.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <CodeEditorBlock
                  filename={config.file}
                  lines={config.snippet}
                />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Command Sheet</h3>

          <div className="sculptor-product__command-grid">
            {spec.commandSheet.map((command) => (
              <article
                key={command.command}
                className="sculptor-product__command-card"
              >
                <code>{command.command}</code>
                <p>{command.summary}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Platform Capabilities</h3>

          <div className="sculptor-product__pill-list">
            {spec.platformCapabilities.map((capability) => (
              <span key={capability} className="certification-skill-pill">
                {capability}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>What Success Looks Like</h3>

          <ul className="sculptor-product__success-list">
            {spec.successCriteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          variants={revealItem}
          className="sculptor-product__section"
        >
          <h3>Release Notes</h3>

          <ul className="sculptor-product__success-list">
            {spec.releaseNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </motion.section>
        </motion.div>
    </SectionWrapper>
  );
}
