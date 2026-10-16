import { Link, useParams } from 'react-router-dom';
import { Flag } from '../components/CountryCard';
import { ContentPageView } from '../components/content/ContentPageView';
import { CtaBanner } from '../components/layout/Layout';
import type { Country as CountryT } from '../data/countries';
import type { ContentPage } from '../data/types';
import { docItems, getCountry } from '../i18n/content';
import { useI18n } from '../i18n/I18n';
import { useCountryPage } from '../i18n/lazyPages';
import { formatDateIn, type Locale } from '../i18n/locales';
import type { Dict } from '../i18n/ui';
import { useStore } from '../store/AppStore';
import { nextDate } from '../store/recommend';
import NotFound from './NotFound';
import './pages.css';

// Общий шаблон для стран, по которым ещё нет полного разбора
function templatePage(c: CountryT, t: Dict, locale: Locale): ContentPage {
  const T = t.country;
  const date = (mmdd: string) => formatDateIn(locale, nextDate(mmdd));
  const deadlineRows = [
    ...(c.deadlines.early ? [{ period: T.early, title: date(c.deadlines.early), text: T.approx }] : []),
    { period: c.deadlines.early ? T.late : T.deadline, title: date(c.deadlines.late), text: c.deadlines.note ?? T.approx },
  ];

  return {
    title: `${c.name}: ${c.grant}`,
    lead: T.templateLead(c.tags),
    sections: [
      {
        id: 'requirements', chip: T.chipReq, badge: '1', kicker: T.reqKicker, title: T.reqTitle,
        blocks: [{
          type: 'grid',
          items: [
            { title: T.reqDegrees, text: c.degrees.map((d) => t.degreeNames[d]).join(', ') },
            { title: T.reqFunding, text: c.fullGrant ? T.fundingFull : T.fundingPartial },
            { title: T.reqEnglish, text: c.ieltsMin ? T.ieltsFrom(c.ieltsMin) : T.dependsOnProgram },
            { title: 'GPA', text: c.gpaMin ?? T.dependsOnProgram },
          ],
        }],
      },
      { id: 'deadlines', chip: T.chipDeadlines, badge: '2', kicker: T.deadlinesKicker, title: T.deadlinesTitle, blocks: [{ type: 'timeline', rows: deadlineRows }] },
      {
        id: 'docs', chip: T.chipDocs, badge: '3', kicker: T.docsKicker, title: T.docsTitle,
        blocks: [{ type: 'highlights', items: docItems(c, locale).map((d, i) => ({ tag: String(i + 1), text: d.label })) }],
      },
      {
        id: 'sources', badge: '!', kicker: T.sourcesKicker, title: T.sourcesTitle,
        blocks: c.links.length ? [{ type: 'links', items: c.links }] : [{ type: 'dashed', text: T.noLinks }],
      },
    ],
  };
}

function TrackButton({ country }: { country: CountryT }) {
  const { user, isTracked, toggleTracked } = useStore();
  const { t, path } = useI18n();
  if (!user) return <Link to={path('/register')} className="btn btn--lime">{t.country.add}</Link>;
  const on = isTracked(country.id);
  return (
    <button className={`btn ${on ? '' : 'btn--lime'}`} onClick={() => toggleTracked(country.id)}>
      {on ? t.country.inTracker : t.country.add}
    </button>
  );
}

export default function Country() {
  const { id = '' } = useParams();
  const { locale, t, path } = useI18n();
  const country = getCountry(locale, id);
  const loaded = useCountryPage(locale, id);
  if (!country) return <NotFound />;
  if (loaded === undefined) return <div className="container page muted" role="status">{t.common.loading}</div>;
  const page = loaded ?? templatePage(country, t, locale);

  return (
    <>
      <div className="country-page">
        <ContentPageView
          page={page}
          eyebrow={
            <div className="country-page__top">
              <Link to={path('/catalog')} className="back-link">{t.country.back}</Link>
              <Flag code={country.flag} size={40} />
            </div>
          }
          aside={<div className="country-page__track"><TrackButton country={country} /></div>}
        />
      </div>
      <CtaBanner />
    </>
  );
}
