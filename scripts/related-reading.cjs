/* Editorial recommendations shared by static pages and the SEO generator. */
const recommendations = {
  'blog-branding': ['blog-calificaciones-google','blog-websites1','blog-marketing-estrategico','blog-errores-marketing'],
  'blog-calificaciones-google': ['blog-branding','blog-email-marketing-automatizacion','blog-marketing-estrategico'],
  'blog-email-marketing-automatizacion': ['blog-errores-marketing','blog-marketing-estrategico','blog-ia-automatizacion'],
  'blog-errores-marketing': ['blog-email-marketing-automatizacion','blog-marketing-estrategico','blog-ia-marketing-growth'],
  'blog-ia-automatizacion': ['blog-ia-marketing-growth','blog-ia2','blog-errores-marketing'],
  'blog-ia-marketing-growth': ['blog-ia-automatizacion','blog-marketing-estrategico','blog-email-marketing-automatizacion'],
  'blog-ia2': ['blog-ia-marketing-growth','blog-ia-automatizacion','blog-errores-marketing'],
  'blog-marketing-estrategico': ['blog-errores-marketing','blog-branding','blog-email-marketing-automatizacion'],
  'blog-websites1': ['blog-branding','blog-errores-marketing','blog-marketing-estrategico']
};
const artwork = {
  'blog-branding':'blogbrand-480.webp', 'blog-calificaciones-google':'calificaciones-google-480.webp',
  'blog-email-marketing-automatizacion':'emailmktng-480.webp', 'blog-errores-marketing':'blog1.webp',
  'blog-ia-automatizacion':'blog-ia-personas-480.webp', 'blog-ia-marketing-growth':'ia-en-mktng-480.webp',
  'blog-ia2':'robot-ia-480.webp', 'blog-marketing-estrategico':'mktng2-480.webp', 'blog-websites1':'web-ecommerce-480.webp'
};
const topics = {
  'blog-branding':['Marca y comunicación','Brand & communication'],
  'blog-calificaciones-google':['Reputación digital','Digital reputation'],
  'blog-email-marketing-automatizacion':['Email y automatización','Email & automation'],
  'blog-errores-marketing':['Marketing y conversión','Marketing & conversion'],
  'blog-ia-automatizacion':['IA y operaciones','AI & operations'],
  'blog-ia-marketing-growth':['IA y marketing','AI & marketing'],
  'blog-ia2':['IA y crecimiento','AI & growth'],
  'blog-marketing-estrategico':['Estrategia y crecimiento','Strategy & growth'],
  'blog-websites1':['Web y e-commerce','Web & e-commerce']
};
function escape(value) { return String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function relatedReading(page,lang,pages) {
  const en=lang==='en', prefix=en?'/en/':'/';
  const key=page.file.split('/').pop().replace('.html','');
  const selected=(recommendations[key]||[]).map(slug=>pages.find(p=>p.file==='blog/'+slug+'.html')).filter(p=>p&&p[lang]).slice(0,3);
  if(selected.length!==3)throw new Error('Expected three localized recommendations: '+page.file+' '+lang);
  const cards=selected.map(entry=>{
    const slug=entry.file.split('/').pop().replace('.html',''), meta=entry[lang];
    return `<a class="reading-card" href="${prefix+entry.file}"><div class="reading-card__image"><img src="/img/optimized/${artwork[slug]}" width="480" height="270" alt="" loading="lazy" decoding="async"></div><div class="reading-card__body"><span class="reading-card__topic">${escape(topics[slug][en?1:0])}</span><h3>${escape(meta.title.split(' | ')[0])}</h3><p>${escape(meta.description)}</p><span class="reading-card__action">${en?'Read article':'Leer artículo'} <span aria-hidden="true">↗</span></span></div></a>`;
  }).join('');
  const links=(page.relatedFiles||[]).map(file=>{const entry=pages.find(p=>p.file===file);if(!entry||!entry[lang])throw new Error('Missing related destination');return `<li><a href="${prefix+file}">${escape(entry[lang].title.split(' | ')[0])} <span aria-hidden="true">↗</span></a></li>`;}).join('');
  return `<section class="seo-related article-reading"><div class="article-reading__header"><div><span class="article-reading__eyebrow">${en?'MORE FROM TRENDMAKERS':'MÁS DE TRENDMAKERS'}</span><h2>${en?'Keep exploring ideas for your business':'Seguí explorando ideas para tu negocio'}</h2><p>${en?'Three related reads to connect strategy, technology and growth.':'Tres lecturas relacionadas para conectar estrategia, tecnología y crecimiento.'}</p></div><a class="article-reading__all" href="${prefix}blog/">${en?'Explore the blog':'Ver todo el blog'} <span aria-hidden="true">→</span></a></div><div class="article-reading__grid">${cards}</div><div class="article-reading__practice"><h3>${en?'From ideas to practice':'De las ideas a la práctica'}</h3><p>${en?'Explore our related services and client projects.':'Explorá nuestros servicios y proyectos relacionados.'}</p><ul>${links}</ul></div></section>`;
}
module.exports = { relatedReading };

