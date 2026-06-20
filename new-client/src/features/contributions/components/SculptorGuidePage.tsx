import { useEffect, useMemo, useState } from "react";
import type { ElementType, ReactNode } from "react";

import { motion } from "framer-motion";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaBug,
  FaGithub,
  FaNpm,
  FaXmark,
} from "react-icons/fa6";

import { SectionWrapper } from "../../../layout/SectionWrapper";
import { useInViewReveal } from "../../../shared/hooks/useInViewReveal";
import { revealContainer, revealItem } from "../../../shared/motion/variants";
import { sculptorGuideDocs, sculptorNpmOrgUrl, sculptorProductSpec, sculptorRepoUrl } from "../data";
import type { ContributionItem } from "../types";

const GUIDE_MAP_OPEN_EVENT = "portfolio:guide-map:open";
const GUIDE_MAP_CLOSE_EVENT = "portfolio:guide-map:close";
const GUIDE_MAP_STATE_EVENT = "portfolio:guide-map:state";

type SculptorGuidePageProps = {
  contribution: ContributionItem;
  onBackProduct: () => void;
  onOpenContributions: () => void;
};

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; lines: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "image"; alt: string; src: string; title?: string }
  | { type: "html"; html: string }
  | { type: "hr" };

function joinBase(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}

function resolveMarkdownLink(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  if (href.startsWith("#")) {
    return href;
  }

  const repoPath = href.replace(/^\.\/+/, "").replace(/^\/+/, "");
  return `https://github.com/imprakhartripathi/Sculptor/blob/main/${repoPath}`;
}

function fetchMarkdownPath(path: string) {
  return joinBase(path);
}

function createDocAnchorId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  const cells = splitTableRow(line);

  if (cells.length < 2) {
    return false;
  }

  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s+/g, "")));
}

function isListItem(line: string) {
  return /^\s*(?:[-*]|\d+\.)\s+/.test(line);
}

function isImageLine(line: string) {
  return /^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim());
}

function isHorizontalRule(line: string) {
  return /^(-{3,}|_{3,}|\*{3,})\s*$/.test(line.trim());
}

function isHtmlCommentStart(line: string) {
  return line.includes("<!--");
}

function isHtmlBlockLine(line: string) {
  return /^<\/?\w+[\s>]/.test(line.trim());
}

function isBlockStart(line: string) {
  return (
    /^#{1,6}\s+/.test(line) ||
    line.startsWith("```") ||
    line.startsWith("> ") ||
    isListItem(line) ||
    line.includes("|") ||
    isImageLine(line) ||
    isHorizontalRule(line) ||
    isHtmlBlockLine(line)
  );
}

function countWords(markdown: string) {
  const stripped = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*`|_-]/g, " ");

  const words = stripped.match(/\b[\p{L}\p{N}']+\b/gu);
  return words?.length ?? 0;
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;
  let inComment = false;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (inComment) {
      if (line.includes("-->")) {
        inComment = false;
      }
      index += 1;
      continue;
    }

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (isHtmlCommentStart(line)) {
      if (!line.includes("-->")) {
        inComment = true;
      }
      index += 1;
      continue;
    }

    if (isHorizontalRule(line)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (isHtmlBlockLine(line)) {
      const htmlLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("<")) {
        htmlLines.push(lines[index].trimEnd());
        index += 1;
      }

      blocks.push({ type: "html", html: htmlLines.join(" ") });
      continue;
    }

    if (isImageLine(line)) {
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        blocks.push({
          type: "image",
          alt: imageMatch[1],
          src: imageMatch[2],
        });
        index += 1;
        continue;
      }
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length && lines[index].startsWith("```")) {
        index += 1;
      }

      blocks.push({
        type: "code",
        language: language || "text",
        code: codeLines.join("\n"),
      });
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      const header = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push({
        type: "table",
        header,
        rows: rows.filter((row) => row.length > 0),
      });
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, "").trimEnd());
        index += 1;
      }
      blocks.push({ type: "blockquote", lines: quoteLines });
      continue;
    }

    if (isListItem(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];

      while (index < lines.length && isListItem(lines[index])) {
        items.push(lines[index].replace(/^\s*(?:[-*]|\d+\.)\s+/, "").trim());
        index += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !isBlockStart(lines[index].trimStart()) &&
      !(
        lines[index].trimStart().startsWith("|") &&
        index + 1 < lines.length &&
        isTableSeparator(lines[index + 1])
      )
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(`[^`]+`|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const full = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    if (full.startsWith("`")) {
      parts.push(
        <code key={`${start}-code`} className="sculptor-markdown__inline-code">
          {full.slice(1, -1)}
        </code>,
      );
    } else if (full.startsWith("![")) {
      const imageMatch = full.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        parts.push(
          <span key={`${start}-image`} className="sculptor-markdown__image-shell">
            <img
              alt={imageMatch[1]}
              src={imageMatch[2]}
              className="sculptor-markdown__image"
              loading="lazy"
            />
          </span>,
        );
      } else {
        parts.push(full);
      }
    } else if (full.startsWith("[")) {
      const linkMatch = full.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const resolvedHref = resolveMarkdownLink(linkMatch[2]);
        parts.push(
          <a
            key={`${start}-link`}
            href={resolvedHref}
            target={resolvedHref.startsWith("http") ? "_blank" : undefined}
            rel={resolvedHref.startsWith("http") ? "noreferrer" : undefined}
            className="sculptor-markdown__link"
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        parts.push(full);
      }
    } else if (full.startsWith("**")) {
      parts.push(
        <strong key={`${start}-strong`} className="sculptor-markdown__strong">
          {full.slice(2, -2)}
        </strong>,
      );
    } else if (full.startsWith("*")) {
      parts.push(
        <em key={`${start}-em`} className="sculptor-markdown__em">
          {full.slice(1, -1)}
        </em>,
      );
    }

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}

function extractHtmlImages(html: string) {
  const images: Array<{ alt: string; src: string; title?: string }> = [];
  const imgPattern = /<img\b[^>]*>/gi;

  for (const match of html.matchAll(imgPattern)) {
    const tag = match[0];
    const src = tag.match(/\bsrc="([^"]+)"/i)?.[1] ?? tag.match(/\bsrc='([^']+)'/i)?.[1];
    if (!src) {
      continue;
    }

    images.push({
      src,
      alt:
        tag.match(/\balt="([^"]*)"/i)?.[1] ??
        tag.match(/\balt='([^']*)'/i)?.[1] ??
        "",
      title:
        tag.match(/\btitle="([^"]*)"/i)?.[1] ??
        tag.match(/\btitle='([^']*)'/i)?.[1] ??
        undefined,
    });
  }

  return images;
}

function MarkdownBlocks({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <div className="sculptor-markdown">
      {blocks.map((block, blockIndex) => {
        const key = `block-${blockIndex}`;

        if (block.type === "heading") {
          const HeadingTag = `h${Math.min(block.level, 6)}` as ElementType;
          return (
            <HeadingTag
              key={key}
              className={`sculptor-markdown__heading sculptor-markdown__heading--${block.level}`}
            >
              {renderInline(block.text)}
            </HeadingTag>
          );
        }

        if (block.type === "paragraph") {
          return <p key={key}>{renderInline(block.text)}</p>;
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={key} className="sculptor-markdown__list">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={key} className="sculptor-markdown__quote">
              {block.lines.map((line) => (
                <p key={`${key}-${line}`}>{renderInline(line)}</p>
              ))}
            </blockquote>
          );
        }

        if (block.type === "code") {
          const codeLines = block.code.split("\n");
          return (
            <div key={key} className="sculptor-markdown__code-shell">
              <div className="sculptor-markdown__code-head">
                <span>{block.language}</span>
                <span>{codeLines.length} lines</span>
              </div>
              <pre className="sculptor-markdown__code">
                {codeLines.map((codeLine, codeIndex) => (
                  <div
                    key={`${key}-code-${codeIndex}`}
                    className="sculptor-markdown__code-line"
                  >
                    <span className="sculptor-markdown__code-no">
                      {codeIndex + 1}
                    </span>
                    <code>{codeLine || " "}</code>
                  </div>
                ))}
              </pre>
            </div>
          );
        }

        if (block.type === "table") {
          return (
            <div key={key} className="sculptor-markdown__table-shell">
              <table className="sculptor-markdown__table">
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th key={`${key}-head-${cellIndex}`}>
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${key}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${key}-row-${rowIndex}-cell-${cellIndex}`}>
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={key} className="sculptor-markdown__figure">
              <img
                src={block.src}
                alt={block.alt}
                className="sculptor-markdown__image"
                loading="lazy"
              />
            </figure>
          );
        }

        if (block.type === "html") {
          const htmlImages = extractHtmlImages(block.html);

          if (htmlImages.length > 0) {
            return (
              <div key={key} className="sculptor-markdown__html-block sculptor-markdown__html-block--center">
                <div className="sculptor-markdown__html-row">
                  {htmlImages.map((image, imageIndex) => (
                    <span key={`${key}-html-img-${imageIndex}`} className="sculptor-markdown__html-badge">
                      <img src={image.src} alt={image.alt} title={image.title} loading="lazy" />
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div
              key={key}
              className="sculptor-markdown__html-block"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        if (block.type === "hr") {
          return <hr key={key} className="sculptor-markdown__divider" />;
        }

        return null;
      })}
    </div>
  );
}

type MarkdownDocCardProps = {
  title: string;
  summary: string;
  path: string;
  onStatsChange: (stats: {
    title: string;
    words: number;
    readTime: number;
  }) => void;
  isActive: boolean;
};

function MarkdownDocCard({
  title,
  summary,
  path,
  onStatsChange,
  isActive,
}: MarkdownDocCardProps) {
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const anchorId = createDocAnchorId(title);

  useEffect(() => {
    let cancelled = false;

    async function loadMarkdown() {
      setStatus("loading");

      try {
        const response = await fetch(fetchMarkdownPath(path));
        if (!response.ok) {
          throw new Error(`Failed to load ${path}`);
        }

        const text = await response.text();
        if (!cancelled) {
          setMarkdown(text);
          setStatus("ready");
          const words = countWords(text);
          onStatsChange({
            title,
            words,
            readTime: Math.max(1, Math.ceil(words / 200)),
          });
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          onStatsChange({
            title,
            words: 0,
            readTime: 0,
          });
        }
      }
    }

    void loadMarkdown();

    return () => {
      cancelled = true;
    };
  }, [path]);

  return (
    <article
      className={`sculptor-guide-doc ${isActive ? "sculptor-guide-doc--active" : ""}`}
      id={anchorId}
      data-doc-title={title}
    >
      <header className="sculptor-guide-doc__header">
        <div>
          <p className="sculptor-guide-doc__eyebrow">
            Loaded from `public/Sculptor`
          </p>
          <h3 className="sculptor-guide-doc__title">{title}</h3>
          <p className="sculptor-guide-doc__summary">{summary}</p>
        </div>
        <code className="sculptor-guide-doc__path">{path}</code>
      </header>

      <div className="sculptor-guide-doc__body">
        {status === "loading" ? (
          <p className="sculptor-guide-doc__state">Loading markdown...</p>
        ) : null}
        {status === "error" ? (
          <p className="sculptor-guide-doc__state sculptor-guide-doc__state--error">
            Could not load this markdown file.
          </p>
        ) : null}
        {status === "ready" ? <MarkdownBlocks markdown={markdown} /> : null}
      </div>
    </article>
  );
}

export function SculptorGuidePage({
  contribution,
  onBackProduct,
  onOpenContributions,
}: SculptorGuidePageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true });
  const [docStats, setDocStats] = useState<
    Array<{ title: string; words: number; readTime: number }>
  >([]);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);
  const [activeDocTitle, setActiveDocTitle] = useState(
    sculptorGuideDocs[0]?.title ?? "",
  );
  const totalReadTime = useMemo(
    () => docStats.reduce((sum, item) => sum + item.readTime, 0),
    [docStats],
  );
  const totalWords = useMemo(
    () => docStats.reduce((sum, item) => sum + item.words, 0),
    [docStats],
  );
  const activeDocId = createDocAnchorId(activeDocTitle);

  function jumpToDoc(title: string) {
    const targetId = createDocAnchorId(title);
    const target = document.getElementById(targetId);

    setIsMobileMapOpen(false);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    const onOpenGuideMap = () => {
      setIsMobileMapOpen(true);
    };

    const onCloseGuideMap = () => {
      setIsMobileMapOpen(false);
    };

    const updateActiveDoc = () => {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(".sculptor-guide-doc"),
      );
      if (!cards.length) {
        return;
      }

      const focusLine = window.innerHeight * 0.34;
      let closestTitle = cards[0].dataset.docTitle ?? activeDocTitle;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!visible) {
          continue;
        }

        const distance = Math.abs(rect.top - focusLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTitle = card.dataset.docTitle ?? closestTitle;
        }
      }

      if (closestTitle && closestTitle !== activeDocTitle) {
        setActiveDocTitle(closestTitle);
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveDoc();
      });
    };

    updateActiveDoc();
    window.addEventListener(GUIDE_MAP_OPEN_EVENT, onOpenGuideMap);
    window.addEventListener(GUIDE_MAP_CLOSE_EVENT, onCloseGuideMap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener(GUIDE_MAP_OPEN_EVENT, onOpenGuideMap);
      window.removeEventListener(GUIDE_MAP_CLOSE_EVENT, onCloseGuideMap);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [activeDocTitle]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(GUIDE_MAP_STATE_EVENT, {
        detail: { open: isMobileMapOpen },
      }),
    );
  }, [isMobileMapOpen]);

  return (
    <SectionWrapper
        id="sculptor-guide"
        eyebrow="Framework Guide"
        title="Sculptor TS"
        description={`${contribution.packageName} • rendered from the markdown docs in public/Sculptor`}
        className="sculptor-guide-page"
        bodyClassName="sculptor-guide-page__body"
        titleAs="h1"
      >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="sculptor-guide-page__stack"
      >
        <motion.article
          variants={revealItem}
          className="sculptor-guide-page__hero"
        >
          <div className="sculptor-guide-page__copy">
            <p className="sculptor-guide-page__status">{ sculptorProductSpec.version }</p>
            <h2 className="sculptor-guide-page__title">
              The full framework docs, rendered in-page.
            </h2>
            <p className="sculptor-guide-page__text">
              This guide is not a separate rewrite. It is a styled wrapper
              around the actual markdown files from the public docs folder, so
              the content stays faithful to the source while fitting the
              portfolio aesthetic.
            </p>
          </div>

          <div className="sculptor-guide-page__actions">
            <button type="button" className="link-btn" onClick={onBackProduct}>
              Back to Product <FaArrowLeftLong />
            </button>
            <button
              type="button"
              className="link-btn"
              onClick={onOpenContributions}
            >
              Back to Contributions <FaArrowRightLong />
            </button>
            <a
              href={`${sculptorRepoUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="link-btn link-btn--warning"
            >
              <FaBug /> Report Bug
            </a>
          </div>
        </motion.article>

        <div className="sculptor-guide-page__layout">
          <motion.aside
            variants={revealItem}
            className="sculptor-guide-page__sidebar"
          >
            <div className="sculptor-guide-page__sidebar-main">
              <div className="sculptor-guide-page__sidebar-section">
                <h3>File Map</h3>
                <div className="sculptor-guide-page__map-links">
                  {sculptorGuideDocs.map((doc) => (
                    <button
                      key={doc.url}
                      type="button"
                      className={`sculptor-guide-page__map-link ${activeDocId === createDocAnchorId(doc.title) ? "is-active" : ""}`}
                      aria-current={activeDocId === createDocAnchorId(doc.title) ? "true" : undefined}
                      onClick={() => jumpToDoc(doc.title)}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sculptor-guide-page__sidebar-section">
                <h3>Reading Stats</h3>
                <div className="sculptor-guide-page__stats">
                  <div>
                    <span className="sculptor-guide-page__stat-label">
                      Docs
                    </span>
                    <strong>{sculptorGuideDocs.length}</strong>
                  </div>
                  <div>
                    <span className="sculptor-guide-page__stat-label">
                      Words
                    </span>
                    <strong>{totalWords || "Loading"}</strong>
                  </div>
                  <div>
                    <span className="sculptor-guide-page__stat-label">
                      Read time
                    </span>
                    <strong>
                      {totalReadTime ? `${totalReadTime} min` : "Loading"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="sculptor-guide-page__sidebar-footer">
              <p>
                This wrapper keeps the docs in the portfolio shell while
                preserving the markdown source and links.
              </p>
              <div className="sculptor-guide-page__bottom-links">
                <a
                  href="https://github.com/imprakhartripathi/Sculptor"
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn link-btn--ghost"
                  aria-label="Open Sculptor repository"
                >
                  <FaGithub />
                </a>
                <a
                  href={sculptorNpmOrgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn link-btn--ghost"
                  aria-label="Open Sculptor npm org"
                >
                  <FaNpm />
                </a>
                <a
                  href={`${sculptorRepoUrl}/issues`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn link-btn--warning"
                  aria-label="Report a Sculptor bug"
                >
                  <FaBug />
                </a>
              </div>
            </div>
          </motion.aside>

          <div className="sculptor-guide-page__docs">
            {sculptorGuideDocs.map((doc) => (
              <motion.div key={doc.url} variants={revealItem}>
                <MarkdownDocCard
                  title={doc.title}
                  summary={doc.summary}
                  path={doc.url}
                  isActive={activeDocId === createDocAnchorId(doc.title)}
                  onStatsChange={(stats) =>
                    setDocStats((current) => {
                      const filtered = current.filter(
                        (item) => item.title !== stats.title,
                      );
                      return [...filtered, stats];
                    })
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className={`sculptor-guide-page__mobile-map ${isMobileMapOpen ? "is-open" : ""}`}
          aria-hidden={!isMobileMapOpen}
        >
          <button
            type="button"
            className="sculptor-guide-page__mobile-map-backdrop"
            aria-label="Close file map"
            onClick={() => setIsMobileMapOpen(false)}
          />

          <div className="sculptor-guide-page__mobile-map-panel" role="dialog" aria-modal="true" aria-label="Guide file map">
            <div className="sculptor-guide-page__mobile-map-head">
              <div>
                <p className="sculptor-guide-page__mobile-map-kicker">File Map</p>
                <h3>Jump between docs</h3>
              </div>
              <button
                type="button"
                className="sculptor-guide-page__mobile-map-close"
                aria-label="Close file map"
                onClick={() => setIsMobileMapOpen(false)}
              >
                <FaXmark aria-hidden="true" />
              </button>
            </div>

            <div className="sculptor-guide-page__mobile-map-links">
              {sculptorGuideDocs.map((doc) => (
                <button
                  key={`mobile-${doc.url}`}
                  type="button"
                  className={`sculptor-guide-page__map-link ${activeDocId === createDocAnchorId(doc.title) ? "is-active" : ""}`}
                  onClick={() => jumpToDoc(doc.title)}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
