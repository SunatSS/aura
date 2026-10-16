import { Link, useParams } from 'react-router-dom';
import { ContentPageView } from '../components/content/ContentPageView';
import { CtaBanner } from '../components/layout/Layout';
import { getGuide, getGuides } from '../i18n/content';
import { useI18n } from '../i18n/I18n';
import NotFound from './NotFound';
import './pages.css';

export function GuidesIndex() {
  const { locale, t, path } = useI18n();
  const T = t.guides;
  return (
    <>
      <div className="container page">
        <p className="eyebrow">{T.eyebrow}</p>
        <h1 className="landing-h2">{T.title}</h1>
        <p className="landing-sub">{T.sub}</p>
        <div className="guides-grid">
          {getGuides(locale).map((g) =>
            g.page ? (
              <Link key={g.slug} to={path(`/guides/${g.slug}`)} className="guide-card card">
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <span className="guide-card__go">{T.read}</span>
              </Link>
            ) : (
              <div key={g.slug} className="guide-card card guide-card--soon">
                <span className="tag">{T.soon}</span>
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
  const { locale, t, path } = useI18n();
  const guide = getGuide(locale, slug);
  if (!guide?.page) return <NotFound />;
  return (
    <>
      <ContentPageView
        page={guide.page}
        eyebrow={<Link to={path('/guides')} className="back-link">{t.guides.back}</Link>}
        aside={
          slug === 'essay' && (
            <Link to={path('/mentor?tab=essay')} className="btn btn--lime">{t.guides.essayCta}</Link>
          )
        }
      />
      <CtaBanner />
    </>
  );
}
