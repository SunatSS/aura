import { Fragment, useId, useState, type ReactNode } from 'react';
import type { Block, ContentPage, Section } from '../../data/types';
import { useI18n } from '../../i18n/I18n';
import './content.css';

// **жирный** и *курсив* внутри строк контента
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong>
        : p.startsWith('*') && p.length > 2 ? <em key={i}>{p.slice(1, -1)}</em>
        : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

function Accordion({ items }: { items: Extract<Block, { type: 'accordion' }>['items'] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="stack">
      {items.map((it, i) => (
        <div key={it.title} className={`acc ${open === i ? 'is-open' : ''}`}>
          <button className="acc__head" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`${id}-${i}`}>
            <span className="badge" aria-hidden="true">{i + 1}</span>
            <span className="acc__title">{it.title}</span>
            <span className="acc__chevron" aria-hidden="true">⌃</span>
          </button>
          {open === i && (
            <div className="acc__body" id={`${id}-${i}`}>
              <p><Rich text={it.text} /></p>
              {it.bullets && <ul>{it.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function NewTab() {
  const { t } = useI18n();
  return <span className="visually-hidden">{t.common.newTab}</span>;
}

export function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case 'text':
      return <p className="c-text"><Rich text={block.text} /></p>;
    case 'subheading':
      return <h3 className="c-subheading">{block.text}</h3>;
    case 'cards':
      return (
        <div className="stack">
          {block.items.map((it) => (
            <div key={it.title} className={`c-card ${block.accent === 'yellow' ? 'c-card--yellow' : ''}`}>
              <h4 className="c-card__title">{it.title}</h4>
              <p className="c-card__text"><Rich text={it.text} /></p>
            </div>
          ))}
        </div>
      );
    case 'grid':
      return (
        <div className={`c-grid ${block.items.length === 3 ? 'c-grid--3' : ''}`}>
          {block.items.map((it) => (
            <div key={it.title} className="c-card">
              <h4 className="c-card__title c-card__title--display">{it.title}</h4>
              <p className="c-card__text c-card__text--sm"><Rich text={it.text} /></p>
            </div>
          ))}
        </div>
      );
    case 'steps':
      return (
        <div className="stack">
          {block.items.map((it, i) => (
            <div key={it.title} className={`c-card c-step ${block.badge === 'blue' ? 'c-step--inline' : ''}`}>
              <div className="c-step__head">
                <span className={`badge ${block.badge === 'blue' ? 'badge--blue' : ''}`}>{i + 1}</span>
                {it.when && <span className="c-step__when">{it.when}</span>}
                {block.badge === 'blue' && <h4 className="c-card__title">{it.title}</h4>}
              </div>
              <div className="c-step__body">
                {block.badge !== 'blue' && <h4 className="c-card__title c-card__title--display">{it.title}</h4>}
                <p className="c-card__text"><Rich text={it.text} /></p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'costs':
      return (
        <table className="c-costs">
          <tbody>
            {block.rows.map(([k, v]) => (
              <tr key={k}><td>{k}</td><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
      );
    case 'timeline':
      return (
        <div className="c-timeline">
          {block.rows.map((r) => (
            <div key={r.period + r.title} className="c-timeline__row">
              <div className="c-timeline__period">{r.period}</div>
              <div className="c-timeline__body">
                <h4 className="c-card__title">{r.title}</h4>
                <p className="c-card__text"><Rich text={r.text} /></p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'letters':
      return (
        <div className="c-timeline c-timeline--letters">
          {block.rows.map((r) => (
            <div key={r.letter} className="c-timeline__row">
              <div className="c-timeline__period">{r.letter}</div>
              <div className="c-timeline__body">
                <h4 className="c-card__title">{r.title}</h4>
                <p className="c-card__text">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'callout':
      return <div className={`c-callout c-callout--${block.variant ?? 'purple'}`}><Rich text={block.text} /></div>;
    case 'links':
      return (
        <ul className="c-links">
          {block.items.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
                <NewTab />
              </a>
            </li>
          ))}
        </ul>
      );
    case 'accordion':
      return <Accordion items={block.items} />;
    case 'facts':
      return (
        <div className="c-facts">
          {block.items.map((f) => (
            <div key={f.value} className="c-facts__item">
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      );
    case 'formula':
      return <div className="c-formula">{block.lines.map((l) => <div key={l}>{l}</div>)}</div>;
    case 'highlights':
      return (
        <ul className="c-highlights">
          {block.items.map((h) => (
            <li key={h.tag}><mark>{h.tag}</mark> {h.text}</li>
          ))}
        </ul>
      );
    case 'compare':
      return (
        <div className="c-compare">
          <div className="c-compare__item c-compare__item--bad">
            <span className="tag tag--red">{block.bad.tag}</span>
            <p><em>{block.bad.text}</em></p>
          </div>
          <div className="c-compare__item c-compare__item--good">
            <span className="tag">{block.good.tag}</span>
            <p><em>{block.good.text}</em></p>
          </div>
        </div>
      );
    case 'note':
      return (
        <div className="c-note">
          <p>{block.intro}</p>
          <ol>{block.items.map((i) => <li key={i}>{i}</li>)}</ol>
        </div>
      );
    case 'dashed':
      return <div className="c-dashed">{block.text}</div>;
    case 'twoLists':
      return (
        <div className="c-grid">
          {block.columns.map((col) => (
            <div key={col.tag} className="c-card c-twolist">
              <span className={`tag tag--${col.color}`}>{col.tag}</span>
              <h4 className="c-twolist__title">{col.title}</h4>
              <ul>{col.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      );
  }
}

function SectionView({ section }: { section: Section }) {
  return (
    <section id={section.id} className="c-section" aria-labelledby={`${section.id}-title`}>
      <div className="c-section__kicker">
        <span className="badge" aria-hidden="true">{section.badge}</span>
        <span>{section.kicker}</span>
      </div>
      <h2 className="c-section__title" id={`${section.id}-title`}>{section.title}</h2>
      <div className="c-section__body">
        {section.blocks.map((b, i) => <BlockView key={i} block={b} />)}
      </div>
    </section>
  );
}

export function ContentPageView({ page, eyebrow, aside }: { page: ContentPage; eyebrow?: ReactNode; aside?: ReactNode }) {
  const { t } = useI18n();
  const chips = page.sections.filter((s) => s.chip);
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <article className="container c-page">
      {eyebrow}
      <h1 className="c-page__title">{page.title}</h1>
      <p className="c-page__lead">{page.lead}</p>
      {chips.length > 0 && (
        <nav className="c-page__chips" aria-label={t.country.sectionsNav}>
          {chips.map((s) => (
            <button key={s.id} className="chip" onClick={() => jump(s.id)}>{s.chip}</button>
          ))}
        </nav>
      )}
      {aside}
      {page.sections.map((s) => <SectionView key={s.id} section={s} />)}
      {page.footer && (
        <div className="c-footer">
          <h3>{page.footer.title}</h3>
          {page.footer.text && <p>{page.footer.text}</p>}
          {page.footer.steps && <ol>{page.footer.steps.map((s) => <li key={s}>{s}</li>)}</ol>}
        </div>
      )}
    </article>
  );
}
