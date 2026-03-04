import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, PenLine, Star, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import { getRecentSearches } from '../utils/recentSearchUtils';
import ThemeToggle from '../components/Common/ThemeToggle';
import { NAV_LINKS } from '../components/Layout/Layout';
import { BookStateContext } from '../App';
import Navbar from '../components/ui/Navbar';
import FeatureCard from '../components/ui/FeatureCard';
import CTASection from '../components/ui/CTASection';
import FooterWithLinks from '../components/ui/FooterWithLinks';

const PREVIEW_REVIEWS_FALLBACK = [
  { id: 'demo-1', title: '채식주의자', author: '한강', publisher: '창비', rating: 5, excerpt: '섬세하고 강렌한 묘사가 오래도록 머릿속에 남는다. 읽고 나서 한동안 멍하니 앉아 있었다.', date: '2026년 1월 15일', spineColor: 'from-ink-500 to-ink-600', status: 'done' },
  { id: 'demo-2', title: '82년생 김지영', author: '조남주', publisher: '민음사', rating: 4, excerpt: '평범한 이름 속에 담긴 이야기가 이렇게 묵직하게 다가올 줄 있었다.', date: '2026년 2월 3일', spineColor: 'from-spine-500 to-spine-600', status: 'done' },
  { id: 'demo-3', title: '노르웨이의 숲', author: '무라카미 하루키', publisher: '민음사', rating: 5, excerpt: '청춘의 몜랑꽜리를 이토록 아름답게 담아낼 수 있다는 것이 놀랍다.', date: '2026년 2월 18일', spineColor: 'from-emerald-600 to-emerald-700', status: 'done' },
];

const SPINE_PALETTE = ['from-ink-500 to-ink-600','from-spine-500 to-spine-600','from-emerald-600 to-emerald-700','from-purple-500 to-purple-600','from-cover-500 to-cover-600','from-amber-600 to-amber-700'];

const formatKoreanDate = (dateStr) => {
  if (!dateStr) return '날짜 미상';
  try { const d = new Date(dateStr); return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`; }
  catch { return dateStr; }
};

const bookToPreview = (book, index) => ({
  id: book.id,
  title: book.title || '제목 없음',
  author: Array.isArray(book.authors) ? book.authors.slice(0,2).join(', ')+(book.authors.length>2?' 외':'') : (book.authors||'저자 미상'),
  publisher: '',
  rating: book.rating||0,
  excerpt: book.content||'',
  date: formatKoreanDate(book.readingDate||book.createdAt),
  spineColor: SPINE_PALETTE[index % SPINE_PALETTE.length],
  status: 'done',
});

const StarRating = ({ rating, max=5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({length:max},(_,i)=>(
      <Star key={i} className={`w-3.5 h-3.5 ${i<rating?'fill-spine-500 text-spine-500':'text-linen-300'}`} />
    ))}
  </div>
);

const ReviewPreviewCard = ({ review }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '40px' }
    );
    observer.observe(el);
    return () => { observer.unobserve(el); };
  }, []);
  return (
    <article ref={ref} className={`bg-white border border-linen-300 rounded-lg p-6 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-ink-300 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-5'}`}>
      <div className="flex gap-4 mb-4">
        <div className={`w-1.5 rounded-full flex-shrink-0 bg-gradient-to-b ${review.spineColor}`} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-charcoal-900 truncate">{review.title}</h3>
          <p className="text-xs text-charcoal-500 mt-0.5">{review.author}{review.publisher?` · ${review.publisher}`:''}</p>
          <div className="mt-1.5"><StarRating rating={review.rating} /></div>
        </div>
        <span className={`self-start text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${review.status==='done'?'bg-ink-50 text-ink-500':'bg-emerald-50 text-emerald-700'}`}>
          {review.status==='done'?'완료':'독서 중'}
        </span>
      </div>
      <p className="text-xs text-charcoal-700 leading-relaxed line-clamp-3">
        {review.excerpt?review.excerpt:<span className="italic text-charcoal-400">독후감 내용이 없습니다</span>}
      </p>
      <div className="flex-1" />
      <p className="text-xs text-charcoal-500 mt-3 flex items-center gap-1">
        <PenLine className="w-3 h-3" />{review.date} 기록
      </p>
    </article>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setIsVisible(true),80); return()=>clearTimeout(t); }, []);
  return (
    <div className="min-h-[88vh] flex items-center" style={{background:'var(--color-bg)'}}>
      <div className="max-w-content mx-auto w-full px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className={`inline-flex items-center gap-2 mb-8 border-l-2 border-ink-500 pl-3 text-xs tracking-widest uppercase text-ink-500 font-semibold transition-all duration-700 ${isVisible?'opacity-100 translate-x-0':'opacity-0 -translate-x-4'}`}>
            <BookOpen className="w-3.5 h-3.5" />My Reading Record
          </div>
          <h1 className={`font-serif text-charcoal-900 leading-tight mb-5 text-4xl md:text-5xl lg:text-[3.2rem] transition-all duration-700 delay-100 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
            책장 끝에서 만나는<br /><span className="text-ink-500">나만의 독서 기록</span>
          </h1>
          <div className={`w-14 h-0.5 bg-spine-500 mb-6 transition-all duration-700 delay-200 ${isVisible?'opacity-100 scale-x-100':'opacity-0 scale-x-0'} origin-left`} />
          <p className={`text-base text-charcoal-700 leading-loose mb-9 font-light max-w-md transition-all duration-700 delay-200 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-3'}`}>
            Kakao Books API로 원하는 책을 검색하고,<br />읽은 감상과 별점을 기록하세요.<br />나만의 독서 역사가 쌓여갑니다.
          </p>
          <div className={`flex items-center gap-4 flex-wrap mb-10 transition-all duration-700 delay-300 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-3'}`}>
            <Link to="/search" className="btn-ink text-sm"><Search className="w-4 h-4" />독서 검색 시작</Link>
            <Link to="/new" className="btn-ghost-ink text-sm">독후감 작성하러 가기<ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className={`flex gap-8 pt-6 border-t border-linen-300 transition-all duration-700 delay-400 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-3'}`}>
            {[{value:'200만+',label:'독서 데이터베이스'},{value:'2,000자',label:'독후감 최대 길이'},{value:'★ 1–5',label:'별점 시스템'}].map(({value,label})=>(
              <div key={label}>
                <div className="font-serif text-2xl font-bold text-charcoal-900">{value}</div>
                <div className="text-xs text-charcoal-500 mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`hidden lg:block transition-all duration-700 delay-200 ${isVisible?'opacity-100 translate-x-0':'opacity-0 translate-x-8'}`}>
          <div className="divide-y divide-linen-300 border border-linen-300 rounded-xl overflow-hidden shadow-sm">
            {[
              {title:'채식주의자',author:'한강 · 창비',rating:5,status:'독후감 완료',statusType:'done',color:'from-ink-500 to-ink-600'},
              {title:'82년생 김지영',author:'조남주 · 민음사',rating:4,status:'독후감 완료',statusType:'done',color:'from-spine-500 to-spine-600'},
              {title:'노르웨이의 숲',author:'무라카미 하루키',rating:5,status:'독서 중',statusType:'reading',color:'from-emerald-600 to-emerald-700'},
              {title:'파친코',author:'이민진 · 인플루에셜셜',rating:4,status:'읽고 싶어요',statusType:'wish',color:'from-purple-500 to-purple-600'},
            ].map((book)=>(
              <div key={book.title} className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-linen-50 transition-colors duration-150">
                <div className={`w-10 h-14 rounded-sm flex-shrink-0 bg-gradient-to-b ${book.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-charcoal-900 truncate">{book.title}</div>
                  <div className="text-xs text-charcoal-500 mt-0.5">{book.author}</div>
                  <div className="mt-1"><StarRating rating={book.rating} /></div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${book.statusType==='done'?'bg-ink-50 text-ink-500':''} ${book.statusType==='reading'?'bg-emerald-50 text-emerald-700':''} ${book.statusType==='wish'?'bg-amber-50 text-spine-500':''}`}>
                  {book.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QUICK_SEARCHES = [
  {label:'한강',query:'한강',category:'person'},{label:'무라카미 하루키',query:'무라카미 하루키',category:'person'},
  {label:'조남주',query:'조남주',category:'person'},{label:'소설',query:'소설',category:'all'},
  {label:'에세이',query:'에세이',category:'all'},{label:'과학',query:'과학',category:'all'},
  {label:'민음사',query:'민음사',category:'publisher'},{label:'창비',query:'창비',category:'publisher'},
];

const SearchSection = () => {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { setRecentSearches(getRecentSearches().slice(0,5)); }, []);
  const goSearch = (q, cat='all') => {
    if (!q.trim()) return;
    const params = new URLSearchParams({query:q});
    if (cat!=='all') params.append('target',cat);
    navigate(`/search?${params.toString()}`);
  };
  const handleSubmit = (e) => { e.preventDefault(); goSearch(query,category); };
  return (
    <section className="py-20 px-6" style={{background:'var(--color-text)'}}>
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-8">
          <div>
            <p className="eyebrow text-ink-400 mb-3">독서 검색</p>
            <h2 className="font-serif text-3xl text-linen-50 leading-snug mb-4">읽고 싶은 책을<br />지금 바로 찾아보세요</h2>
            <p className="text-sm leading-relaxed" style={{color:'rgba(250,250,248,.5)'}}>제목, 저자, 출판사로 즉시 검색하세요.<br />검색 결과에서 바로 독후감 작성이 가능합니다.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="rounded-lg overflow-hidden border" style={{background:'rgba(250,250,248,.06)',borderColor:'rgba(250,250,248,.15)'}}>
              <div className="flex">
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-transparent border-none text-sm py-4 pl-4 pr-8 outline-none cursor-pointer flex-shrink-0" style={{color:'rgba(250,250,248,.65)'}}>
                  <option value="all" style={{background:'#1A1A1A'}}>전체</option>
                  <option value="title" style={{background:'#1A1A1A'}}>책 제목</option>
                  <option value="person" style={{background:'#1A1A1A'}}>저자</option>
                  <option value="publisher" style={{background:'#1A1A1A'}}>출판사</option>
                </select>
                <div className="self-stretch my-3 flex-shrink-0" style={{width:'1px',backgroundColor:'rgba(250,250,248,.1)'}} />
                <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="검색어를 입력하세요..." className="flex-1 bg-transparent border-none outline-none text-sm py-4 px-4 font-sans min-w-0" style={{color:'#FAFAF8'}} />
                <button type="submit" className="btn-ink text-sm px-5 m-2 rounded flex-shrink-0"><Search className="w-4 h-4" />검색</button>
              </div>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-7" style={{borderTop:'1px solid rgba(250,250,248,.08)'}}>
          <div>
            <p className="text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5" style={{color:'rgba(250,250,248,.3)'}}>
              <Clock className="w-3 h-3" />최근 검색어
            </p>
            {recentSearches.length>0?(
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item,i)=>(
                  <button key={i} onClick={()=>goSearch(item.query,item.category)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors duration-150" style={{background:'rgba(250,250,248,.07)',color:'rgba(250,250,248,.6)',border:'1px solid rgba(250,250,248,.1)'}}>
                    <Clock className="w-2.5 h-2.5 opacity-60" />{item.query}
                    {item.category!=='all'&&<span className="opacity-40 text-[10px]">· {item.category==='title'?'제목':item.category==='person'?'저자':'출판사'}</span>}
                  </button>
                ))}
              </div>
            ):(<p className="text-xs" style={{color:'rgba(250,250,248,.2)'}}>아직 검색 기록이 없습니다</p>)}
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{color:'rgba(250,250,248,.3)'}}>빠른 검색</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((chip)=>(
                <button key={chip.label} onClick={()=>goSearch(chip.query,chip.category)} className="text-xs px-3 py-1.5 rounded-full transition-colors duration-150" style={{background:'rgba(45,95,138,.2)',color:'rgba(150,190,230,.85)',border:'1px solid rgba(45,95,138,.35)'}} onMouseEnter={(e)=>{e.currentTarget.style.background='rgba(45,95,138,.35)';e.currentTarget.style.color='rgba(180,215,250,.95)';}} onMouseLeave={(e)=>{e.currentTarget.style.background='rgba(45,95,138,.2)';e.currentTarget.style.color='rgba(150,190,230,.85)';}}>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const books = useContext(BookStateContext);
  const hasRealBooks = books && books.length > 0;
  const previewReviews = hasRealBooks
    ? [...books].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,3).map(bookToPreview)
    : PREVIEW_REVIEWS_FALLBACK;

  const navLogo = (
    <div className="flex flex-col leading-tight">
      <span className="font-serif text-lg font-bold tracking-tight">At the End of the Shelf</span>
      <span className="text-xs tracking-widest uppercase opacity-40 font-sans font-light">A Working Library</span>
    </div>
  );

  const features = [
    { number:1, icon:'📚', title:'독서 검색', description:'Kakao Books API를 활용한 200만 권 이상의 방대한 독서 데이터베이스. 제목, 저자, 출판사 — 원하는 방식으로 즉시 검색하세요.', chip:'Kakao API 연동', accentColor:'ink', href:'/search', hrefLabel:'검색 바로가기' },
    { number:2, icon:'✍️', title:'독후감 작성', description:'별점(1–5), 독서 날짜, 표지 이미지까지 기록하는 2,000자 독후감. 실시간 유효성 검사로 완성도 높은 기록을 남기세요.', chip:'localStorage 저장', accentColor:'spine', href:'/new', hrefLabel:'독후감 작성하기' },
    { number:3, icon:'🎮', title:'3D 독서관', description:'Unreal Engine 5와 연동되는 가상 3D 서재. 내 독서 기록이 실제 책장처럼 시각화됩니다. C++ + Blueprint로 개발 중.', chip:'UE5 연동 예정', accentColor:'cover', href:'#', hrefLabel:'개발 진행 중' },
  ];

  const footerLinks = [
    { title:'사이트', items:[{label:'독서 검색',href:'/search'},{label:'내 갤러리',href:'/gallery'},{label:'독후감 작성',href:'/new'}] },
    { title:'프로젝트', items:[{label:'GitHub',href:'https://github.com'},{label:'UE5 클라이언트',href:'#'},{label:'API 서버',href:'#'}] },
    { title:'문서', items:[{label:'개발 가이드',href:'#'},{label:'API 레퍼런스',href:'#'},{label:'로드맵',href:'#'}] },
  ];

  return (
    <div className="min-h-screen" style={{background:'var(--color-bg)'}}>
      <Navbar logo={navLogo} links={NAV_LINKS} sticky={true} transparent={false} rightContent={<ThemeToggle />} />
      <HeroSection />
      <section className="py-20 px-6" style={{background:'var(--color-surface)'}}>
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-2">주요 기능</p>
              <h2 className="section-heading text-3xl md:text-4xl">독서를 더 꺝게 즐기는 세 가지 방법</h2>
            </div>
            <Link to="/search" className="hidden md:flex items-center gap-1 text-sm text-ink-500 hover:text-ink-600 transition-colors">모두 보기 <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-linen-300">
            {features.map((feat)=>(<FeatureCard key={feat.number} {...feat} />))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6" style={{background:'var(--color-bg)'}}>
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-2">내 갤러리</p>
              <h2 className="section-heading text-3xl md:text-4xl">작성한 독후감 목록</h2>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-1 text-sm text-ink-500 hover:text-ink-600 transition-colors">전체 보기 <ArrowRight className="w-4 h-4" /></Link>
          </div>
          {!hasRealBooks&&(<p className="text-xs text-charcoal-400 mb-6 flex items-center gap-1.5"><span className="inline-block w-1.5 h-1.5 rounded-full bg-linen-400" />독후감을 작성하면 여기에 최신 3개가 표시됩니다</p>)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previewReviews.map((review)=>(<ReviewPreviewCard key={review.id} review={review} />))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/gallery" className="btn-ink text-sm">전체 갤러리 보기<ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <SearchSection />
      <CTASection title="오늘부터 독서 기록을 시작하세요" subtitle="무료로 사용할 수 있으며, 브라우저에 안전하게 저장됩니다" primaryButton={{text:'✍️ 첫 독후감 작성',href:'/new'}} secondaryButton={{text:'🔍 독서 검색',href:'/search'}} backgroundType="solid" />
      <FooterWithLinks companyName="At the End of the Shelf" description={`책장 끝에서 만나는 나만의 독서 기록 공간.\nKakao Books API와 Unreal Engine 5로\n구현하는 독서 관리 & 3D 독서관.`} links={footerLinks} socialLinks={[{platform:'github',href:'https://github.com'}]} copyright="© 2026 At the End of the Shelf. React 19 + Express + Kakao API + UE5" />
    </div>
  );
};

export default LandingPage;
