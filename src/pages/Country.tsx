import { Link, useParams } from 'react-router-dom';
import { Flag } from '../components/CountryCard';
import { ContentPageView } from '../components/content/ContentPageView';
import { CtaBanner } from '../components/layout/Layout';
import { countryById, docsFor, type Country as CountryT } from '../data/countries';
import { countryDetails } from '../data/countryDetails';
import type { ContentPage } from '../data/types';
import { useStore } from '../store/AppStore';
import { formatDate, nextDate } from '../store/recommend';
import NotFound from './NotFound';
import './pages.css';

const degreeLabel = { bachelor: 'Бакалавриат', master: 'Магистратура', phd: 'PhD' };

// Общий шаблон для стран, по которым ещё нет полного разбора
function templatePage(c: CountryT): ContentPage {
  const deadlineRows = [
    c.deadlines.early && { period: 'Ранняя подача', title: formatDate(nextDate(c.deadlines.early)), text: 'Ориентировочная дата — сверяй с официальным сайтом.' },
    { period: c.deadlines.early ? 'Поздняя подача' : 'Дедлайн', title: formatDate(nextDate(c.deadlines.late)), text: c.deadlines.note ?? 'Ориентировочная дата — сверяй с официальным сайтом.' },
  ].filter(Boolean) as { period: string; title: string; text: string }[];

  return {
    title: `${c.name}: ${c.grant}`,
    lead: `${c.tags}. Короткая сводка по направлению — подробный разбор AURA готовит.`,
    sections: [
      {
        id: 'requirements', chip: 'Требования', badge: '1', kicker: 'Кого берут', title: 'Требования',
        blocks: [{
          type: 'grid',
          items: [
            { title: 'Ступени', text: c.degrees.map((d) => degreeLabel[d]).join(', ') },
            { title: 'Финансирование', text: c.fullGrant ? 'Есть полные гранты' : 'Частичные гранты и скидки вузов' },
            { title: 'Английский', text: c.ieltsMin ? `IELTS от ${c.ieltsMin}` : 'Зависит от программы' },
            { title: 'GPA', text: c.gpaMin ?? 'Зависит от программы' },
          ],
        }],
      },
      { id: 'deadlines', chip: 'Дедлайны', badge: '2', kicker: 'Календарь', title: 'Дедлайны', blocks: [{ type: 'timeline', rows: deadlineRows }] },
      {
        id: 'docs', chip: 'Документы', badge: '3', kicker: 'Чек-лист', title: 'Документы',
        blocks: [{ type: 'highlights', items: docsFor(c).map((d, i) => ({ tag: String(i + 1), text: d })) }],
      },
      {
        id: 'sources', badge: '!', kicker: 'Официальный источник', title: 'Проверяй здесь',
        blocks: c.links.length
          ? [{ type: 'links', items: c.links }]
          : [{ type: 'dashed', text: 'Ссылки на первоисточники по этой стране ещё собираются командой контента.' }],
      },
    ],
  };
}

function TrackButton({ country }: { country: CountryT }) {
  const { user, isTracked, toggleTracked } = useStore();
  if (!user) return <Link to="/register" className="btn btn--lime">+ Добавить в трекер</Link>;
  const on = isTracked(country.id);
  return (
    <button className={`btn ${on ? '' : 'btn--lime'}`} onClick={() => toggleTracked(country.id)}>
      {on ? '✓ В трекере — убрать' : '+ Добавить в трекер'}
    </button>
  );
}

export default function Country() {
  const { id = '' } = useParams();
  const country = countryById(id);
  if (!country) return <NotFound />;
  const page = countryDetails[id] ?? templatePage(country);

  return (
    <>
      <div className="country-page">
        <ContentPageView
          page={page}
          eyebrow={
            <div className="country-page__top">
              <Link to="/catalog" className="back-link">← Каталог</Link>
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
