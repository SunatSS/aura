import { Link, useParams } from 'react-router-dom';
import { ContentPageView } from '../components/content/ContentPageView';
import { CtaBanner } from '../components/layout/Layout';
import { guideBySlug, guides } from '../data/guides';
import NotFound from './NotFound';
import './pages.css';

export function GuidesIndex() {
  return (
    <>
      <div className="container page">
        <p className="eyebrow">База знаний</p>
        <h1 className="landing-h2">Библиотека поступающего</h1>
        <p className="landing-sub">Пошаговые гайды без воды: от первого черновика эссе до апостиля.</p>
        <div className="guides-grid">
          {guides.map((g) =>
            g.page ? (
              <Link key={g.slug} to={`/guides/${g.slug}`} className="guide-card card">
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <span className="guide-card__go">Читать ›</span>
              </Link>
            ) : (
              <div key={g.slug} className="guide-card card guide-card--soon">
                <span className="tag">Скоро</span>
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
              </div>
            ),
          )}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}

export function GuidePage() {
  const { slug = '' } = useParams();
  const guide = guideBySlug(slug);
  if (!guide?.page) return <NotFound />;
  return (
    <>
      <ContentPageView page={guide.page} eyebrow={<Link to="/guides" className="back-link">← Все гайды</Link>} />
      <CtaBanner />
    </>
  );
}
