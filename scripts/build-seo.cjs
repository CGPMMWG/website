/* Rebuild SEO and static English pages from the editable Spanish HTML and existing translations. */
const sharp = require('sharp');
const {fs,path,root,origin,pages,route,localized,browser,server} = require('./site-tools.cjs');
const { portableMarkup } = require('./portable-paths.cjs');
const stamp = '20260921-seo';
const optimizedDir = path.join(root,'img/optimized');
const assets = {};
const plainLogo = /^(DATA-STRAT|IA-HUB|MATION|BRANDING|WEB-ECOMM|LETRA|logo1)\./i;

async function optimizeImages() {
  await fs.mkdir(optimizedDir,{recursive:true});
  let before = 0, after = 0, count = 0;
  for (const name of await fs.readdir(path.join(root,'img'))) {
    if (!/\.(png|jpe?g|svg)$/i.test(name)) continue;
    const input = path.join(root,'img',name);
    const meta = await sharp(input).metadata();
    const source = '/img/' + name;
    assets[source] = {src:source,width:meta.width,height:meta.height};
    const stat = await fs.stat(input);
    if (plainLogo.test(name) || name.endsWith('.svg') || stat.size < 40000) continue;
    const slug = name.replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const dest = slug + '.webp';
    const full = path.join(optimizedDir,dest);
    // Preserve the full canvas and alpha channel, including logo whitespace.
    await sharp(input).webp({quality:84,effort:5}).toFile(full);
    const bytes = (await fs.stat(full)).size;
    if (bytes >= stat.size) continue;
    Object.assign(assets[source],{src:'/img/optimized/'+dest,original:source,bytes,originalBytes:stat.size});
    before += stat.size; after += bytes; count++;
    if (!/(logo|header|email\.|wpp|idioma|instagram|linkedin|vcg|pronto)/i.test(name) && meta.width > 1000) {
      const variants = [];
      for (const width of [480,960]) {
        const output = slug + '-' + width + '.webp';
        await sharp(input).resize({width}).webp({quality:80,effort:5}).toFile(path.join(optimizedDir,output));
        variants.push('/img/optimized/'+output+' '+width+'w');
      }
      variants.push(assets[source].src+' '+meta.width+'w');
      assets[source].srcset=variants.join(', ');
    }
  }
  // Also recognize optimized paths on subsequent builds.
  for (const asset of Object.values(assets)) assets[asset.src] = asset;
  console.log(`Images: ${count} optimized; ${(before/1e6).toFixed(2)} MB → ${(after/1e6).toFixed(2)} MB (${Math.round((1-after/before)*100)}% less).`);
}

function configFor(page,lang) {
  const meta = page[lang];
  const topics = {
    branding:['servicios/branding-communication.html','blog/blog-branding.html','casos-exito/caso-gope-consulting.html'],
    web:['servicios/web-ecommerce.html','blog/blog-websites1.html','casos-exito/caso-letratec.html'],
    ai:['servicios/ia-hub.html','blog/blog-ia-marketing-growth.html','servicios/data-analytics.html'],
    marketing:['servicios/marketing-automation.html','blog/blog-email-marketing-automatizacion.html','casos-exito/caso-prontoled.html']
  };
  const topic=/branding|gope|calificaciones/.test(page.file)?'branding':/web|letratec/.test(page.file)?'web':/ia-|ia2|data-/.test(page.file)?'ai':'marketing';
  const related = topics[topic].filter(file=>file!==page.file).map(file=>{
    const entry=pages.find(p=>p.file===file);
    return {href:localized(file,lang),name:entry[lang].title.split(' | ')[0]};
  });
  return {
    title:meta.title,description:meta.description,
    alternates:{es:route(page.file),...(page.en?{en:localized(page.file,'en')}:{})},
    pages:pages.map(p=>route(p.file)),english:pages.filter(p=>p.en).map(p=>route(p.file)),related
  };
}

function schemaFor(page,lang,heading) {
  const canonical = origin + localized(page.file,lang);
  const home = origin + (lang==='en'?'/en/':'/');
  const meta = page[lang];
  const asset = assets['/img/'+page.image];
  const image = {'@type':'ImageObject','@id':canonical+'#image',url:origin+asset.src,width:asset.width,height:asset.height};
  const orgId=origin+'/#organization',siteId=origin+'/#website';
  const graph = [
    {'@type':'Organization','@id':orgId,name:'TrendMakers',alternateName:'TrendMakers Agency',url:origin+'/',logo:{'@type':'ImageObject',url:origin+'/img/logo1.png',width:384,height:379},email:'info@trendmakers.agency',telephone:'+54 11 2254-9351',sameAs:['https://www.linkedin.com/company/trendmakersagency','https://www.instagram.com/trendmakers.agency_'],contactPoint:[{'@type':'ContactPoint',contactType:'sales',email:'info@trendmakers.agency',availableLanguage:['Spanish','English']}]},
    {'@type':'WebSite','@id':siteId,url:origin+'/',name:'TrendMakers',inLanguage:['es','en'],publisher:{'@id':orgId}},
    image,
    {'@type':['CollectionPage','AboutPage'].includes(page.type)?page.type:'WebPage','@id':canonical+'#webpage',url:canonical,name:meta.title,description:meta.description,inLanguage:lang,isPartOf:{'@id':siteId},primaryImageOfPage:{'@id':image['@id']},about:{'@id':orgId}}
  ];
  const webPage=graph[3];
  if (page.file!=='index.html') {
    const crumbs=[{name:lang==='en'?'Home':'Inicio',item:home}];
    const section=page.file.split('/')[0];
    if (!page.file.endsWith('/index.html')) {
      const parent = section==='academy-cursos' ? ['Academy','academy/index.html'] : section==='servicios' ? [lang==='en'?'Services':'Servicios','servicios/index.html'] : section==='blog' ? ['Blog','blog/index.html'] : [lang==='en'?'Case studies':'Casos de éxito','index.html'];
      crumbs.push({name:parent[0],item:origin+localized(parent[1],lang)+(section==='casos-exito'?'#casos-exito':'')});
    }
    crumbs.push({name:heading,item:canonical});
    graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
    webPage.breadcrumb={'@id':canonical+'#breadcrumb'};
  }
  if (['Service','Course','Article','BlogPosting'].includes(page.type)) {
    const entity={'@type':page.type,'@id':canonical+'#primary',name:heading,description:meta.description,url:canonical,image:{'@id':image['@id']},mainEntityOfPage:{'@id':webPage['@id']}};
    if (page.type==='Service') Object.assign(entity,{serviceType:heading,provider:{'@id':orgId}});
    else if(page.type==='Course') Object.assign(entity,{inLanguage:lang,provider:{'@id':orgId}});
    else Object.assign(entity,{inLanguage:lang,headline:heading,author:{'@id':orgId},publisher:{'@id':orgId}});
    webPage.mainEntity={'@id':entity['@id']};graph.push(entity);
  }
  let items=[];
  if(page.file==='index.html'||page.file==='servicios/index.html')items=pages.filter(p=>p.type==='Service');
  if(page.file==='academy/index.html')items=pages.filter(p=>p.type==='Course');
  if(page.file==='blog/index.html')items=pages.filter(p=>p.type==='BlogPosting');
  if(items.length)graph.push({'@type':'ItemList','@id':canonical+'#contents',itemListElement:items.map((p,i)=>({'@type':'ListItem',position:i+1,name:(p[lang]||p.es).title.split(' | ')[0],url:origin+localized(p.file,p[lang]?lang:'es')}))});
  return {'@context':'https://schema.org','@graph':graph};
}

// This function runs in Chromium's parser, with no page scripts or network requests.
function transform({html,page,lang,assets,config,graph,stamp,origin,cleanup}) {
  const doc = new DOMParser().parseFromString(html,'text/html');
  const canonical=origin+(lang==='en'?'/en':'')+'/'+page.file.replace(/index\.html$/,'');
  const originalUrl=origin+(cleanup&&lang==='en'?'/en/':'/')+page.file;
  const meta=page[lang];
  doc.querySelectorAll('.seo-related').forEach(el=>el.remove());
  doc.documentElement.lang=lang;doc.documentElement.dataset.siteLanguage=lang;
  doc.title=meta.title;
  doc.querySelectorAll('meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],meta[name="thumbnail"],link[rel="canonical"],link[rel="alternate"][hreflang],link[rel="image_src"],script[type="application/ld+json"],#page-seo,script[src*="site-locale.js"],link[href*="/seo.css"],#seo-noscript').forEach(el=>el.remove());
  const add=(tag,attrs,content)=>{const el=doc.createElement(tag);for(const [key,value]of Object.entries(attrs))el.setAttribute(key,value);if(content!==undefined)el.textContent=content;doc.head.appendChild(el);return el;};
  add('meta',{name:'description',content:meta.description});
  add('meta',{name:'robots',content:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'});
  add('link',{rel:'canonical',href:canonical});
  if(page.en)for(const [code,url]of Object.entries({...config.alternates,'x-default':config.alternates.es}))add('link',{rel:'alternate',hreflang:code,href:origin+url});
  const asset=assets['/img/'+page.image];
  const image=origin+asset.src;
  for(const [key,value]of Object.entries({
    'og:locale':lang==='en'?'en_US':'es_AR','og:site_name':'TrendMakers','og:type':['Article','BlogPosting'].includes(page.type)?'article':'website',
    'og:title':meta.title,'og:description':meta.description,'og:url':canonical,'og:image':image,'og:image:secure_url':image,
    'og:image:type':asset.src.endsWith('.webp')?'image/webp':asset.src.endsWith('.png')?'image/png':'image/jpeg',
    'og:image:width':asset.width,'og:image:height':asset.height,'og:image:alt':meta.title.split(' | ')[0]
  }))add('meta',{property:key,content:String(value)});
  if(page.en)add('meta',{property:'og:locale:alternate',content:lang==='en'?'es_AR':'en_US'});
  for(const [key,value]of Object.entries({card:'summary_large_image',title:meta.title,description:meta.description,image,'image:alt':meta.title.split(' | ')[0]}))add('meta',{name:'twitter:'+key,content:value});
  add('script',{id:'seo-entity-schema',type:'application/ld+json'},JSON.stringify(graph).replace(/</g,'\\u003c'));
  const configEl=add('script',{id:'page-seo',type:'application/json'},JSON.stringify(config).replace(/</g,'\\u003c'));
  const locale=doc.createElement('script');locale.src='/js/site-locale.js?v='+stamp;
  // Locale is established before any inline page translation or deferred script.
  doc.head.insertBefore(configEl,doc.head.querySelector('script'));
  configEl.after(locale);
  add('link',{rel:'stylesheet',href:'/css/seo.css?v='+stamp});
  const fallback=doc.createElement('noscript');fallback.id='seo-noscript';fallback.innerHTML='<style>#preloader{display:none!important}body{overflow:auto!important}html body .content .animate__animated,html body .service-card,html body .reveal,html body .case-reveal,html body .story-reveal,html body .hero-brain,html body #blog-view-all-text,html body #problema .closing-cta__title span,html body #problema .closing-cta__subtitle,html body #problema .closing-cta__btn,html body header :is(.hero-main,#title),html body header :is(.hero-main,#title) *{opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important;clip-path:none!important;filter:none!important}</style>';doc.head.appendChild(fallback);
  for (const el of doc.querySelectorAll('[src],link[href],[poster]')) {
    const attr=el.hasAttribute('src')?'src':el.hasAttribute('poster')?'poster':'href';
    const value=el.getAttribute(attr);
    if(!value||/^(https?:|data:|blob:)/.test(value))continue;
    const url=new URL(value,originalUrl);
    if(url.origin===origin)el.setAttribute(attr,decodeURI(url.pathname)+url.search+url.hash);
  }
  for(const img of doc.querySelectorAll('img[src]')) {
    const asset=assets[decodeURI(new URL(img.getAttribute('src'),origin).pathname)];
    if(!asset)continue;
    img.setAttribute('src',asset.src);img.width=asset.width;img.height=asset.height;img.decoding='async';
    const priority=!!img.closest('nav,.article-image,.detail-hero,.service-hero,.hero,.academy-hero');
    img.loading=priority?'eager':'lazy';
    if(img.closest('.article-image'))img.setAttribute('fetchpriority','high');
    if(asset.srcset){img.srcset=asset.srcset;img.sizes=img.closest('.blog-mini-card,.service-card,.flip-card')?'(max-width: 640px) 92vw, (max-width: 1040px) 45vw, 30vw':'(max-width: 768px) 94vw, 960px';}
  }
  for(const link of doc.querySelectorAll('a[href]')) {
    let raw=link.getAttribute('href');
    if(!raw||/^(mailto:|tel:|javascript:|data:)/.test(raw))continue;
    let url=new URL(raw,originalUrl);
    if(url.origin!==origin)continue;
    if(url.hash==='#equipo'&&/\/(index\.html)?$/.test(url.pathname)){url.pathname='/equipo/';url.hash='';}
    const source=url.pathname.replace(/^\/en(?=\/)/,'').replace(/index\.html$/,'');
    if(config.pages.includes(source)) {
      const targetLang=link.dataset.lang||lang;
      url.pathname=targetLang==='en'&&config.english.includes(source)?'/en'+source:source;
      url.searchParams.delete('lang');link.setAttribute('href',decodeURI(url.pathname)+url.search+url.hash);
    }
  }
  for(const option of doc.querySelectorAll('.lang-option')) {
    const target=option.dataset.lang;
    if(!config.alternates[target]){option.remove();continue;}
    const anchor=doc.createElement('a');
    for(const attr of option.attributes)if(!['type','onclick','href'].includes(attr.name))anchor.setAttribute(attr.name,attr.value);
    anchor.setAttribute('href',config.alternates[target]);anchor.hreflang=target;anchor.lang=target;anchor.textContent=target==='en'?'English':'Español';
    option.replaceWith(anchor);
  }
  if(lang==='en'){
    const labels={'Inicio':'Home','Servicios':'Services','Nosotros':'About us','Equipo':'Team','Academia':'Academy','Cursos':'Courses','Casos':'Cases','Casos de éxito':'Case studies','Contacto':'Contact'};
    doc.querySelectorAll('nav a,nav .dropdown-toggle').forEach(el=>{
      for(const node of el.childNodes)if(node.nodeType===3&&labels[node.textContent.trim()])node.textContent=labels[node.textContent.trim()];
    });
    doc.querySelectorAll('.case-footer-copy').forEach(el=>el.textContent='© 2026 TrendMakers. All rights reserved.');
    const alts={
      'BRAIN-BIENVENIDOS.png':'Artificial intelligence applied to business growth',
      'PRONTO.png':'Prontoled logo','LETRA.png':'Letratec logo','VCG IMAGEN.png':'GOPE Consulting logo',
      'ROBOT-IA.png':'TrendMakers artificial intelligence and automation',
      'MKTNG2.png':'Marketing strategy, content, data and performance',
      'IA EN MKTNG.png':'Artificial intelligence applied to marketing',
      'web-ecommerce.png':'Website and e-commerce development',
      'blogbrand.png':'Brand identity and communication',
      'BLOG1.jpg':'Marketing automation and lead management',
      'BLOG-IA-MARKETING.png':'Artificial intelligence for business and marketing',
      'Blog-ia-personas.png':'Business teams working with artificial intelligence',
      'blogprincipal1.png':'Artificial intelligence and business operations',
      'EMAILMKTNG.png':'Email marketing and lead nurturing',
      'calificaciones-google.png':'Google ratings and customer reviews',
      'MAFOTO1.png':'Digital marketing strategy and business growth',
      'MAPASOS.png':'Steps in a marketing and automation strategy',
      'course-model.png':'TrendMakers Academy practical online learning',
      'IDIOMA.PNG':'Language'
    };
    doc.querySelectorAll('img[alt]').forEach(img=>{
      if(!img.alt)return;
      const asset=assets[img.getAttribute('src')];
      const name=(asset?.original||img.getAttribute('src')).split('/').pop();
      if(alts[name])img.alt=alts[name];
    });
  }
  if(['Service','BlogPosting','Article'].includes(page.type)){
    const container=doc.querySelector('main')||doc.querySelector('.shell');
    if(container){
      const section=doc.createElement('section');section.className='seo-related';
      const title=doc.createElement('h2');title.textContent=lang==='en'?'Explore related services and insights':'Servicios y artículos relacionados';section.appendChild(title);
      const list=doc.createElement('ul');
      config.related.forEach(item=>{const li=doc.createElement('li');const a=doc.createElement('a');a.href=item.href;a.textContent=item.name;li.appendChild(a);list.appendChild(li);});
      section.appendChild(list);container.appendChild(section);
    }
  }
  if(page.type==='Course'&&!doc.querySelector('script[src*="academy_course_i18n.js"]')){
    const script=doc.createElement('script');script.src='/js/academy_course_i18n.js?v='+stamp;doc.body.appendChild(script);
  }
  // Normalize cached bundles consistently across all pages.
  doc.querySelectorAll('script[src^="/js/"],link[rel="stylesheet"][href^="/css/"]').forEach(el=>{
    const attr=el.tagName==='SCRIPT'?'src':'href';el.setAttribute(attr,el.getAttribute(attr).split('?')[0]+'?v='+stamp);
  });
  doc.querySelectorAll('script:not([src]):not([type])').forEach(el=>{
    el.textContent=el.textContent.replace(/(?:(?:\.\.\/|\.\/)+|\/)?img\/[^'"`<>\n]+?\.(?:png|PNG|jpg|jpeg|svg|webp)/g,ref=>{
      const key='/img/'+ref.split('img/')[1];return assets[key]?.src||key;
    });
  });
  if(cleanup){
    doc.querySelectorAll('*').forEach(el=>{
      for(const attr of [...el.attributes])if(/^data-(?:.*bound|anim-observed|counted)$/.test(attr.name))el.removeAttribute(attr.name);
      if(el.style.animationPlayState)el.style.removeProperty('animation-play-state');
    });
    doc.querySelector('#preloader')?.remove();doc.body.classList.remove('loading');
    doc.querySelectorAll('[data-count-target]').forEach(el=>el.textContent=(el.dataset.countPrefix||'')+el.dataset.countTarget+(el.dataset.countSuffix||''));
  }
  // Metadata replacement leaves blank text nodes behind on every rebuild.
  doc.head.normalize();
  for (const node of doc.head.childNodes) {
    if (node.nodeType === 3 && !node.textContent.trim()) node.textContent = '\n';
  }
  return '<!DOCTYPE html>\n'+doc.documentElement.outerHTML+'\n';
}

async function main() {
  await optimizeImages();
  // The original JS translators also create images; keep those URLs optimized and root-relative.
  for(const name of await fs.readdir(path.join(root,'js'))) {
    if(!name.endsWith('.js')||name==='site-locale.js')continue;
    const file=path.join(root,'js',name);let source=await fs.readFile(file,'utf8');
    source=source.replace(/(?:(?:\.\.\/|\.\/)+|\/)?img\/[^'"`<>\n]+?\.(?:png|PNG|jpg|jpeg|svg|webp)/g,ref=>{
      const key='/img/'+ref.split('img/')[1];return assets[key]?.src||key;
    });
    await fs.writeFile(file,source);
  }
  const chrome=await browser();const parser=await chrome.newPage();
  const transformed=new Map();
  try {
    for(const page of pages) {
      const source=await fs.readFile(path.join(root,page.file),'utf8');
      const heading=await parser.evaluate(html=>new DOMParser().parseFromString(html,'text/html').querySelector('h1')?.textContent.trim().replace(/\s+/g,' '),source);
      const html=portableMarkup(await parser.evaluate(transform,{html:source,page,lang:'es',assets,config:configFor(page,'es'),graph:schemaFor(page,'es',heading),stamp,origin}),page.file);
      await fs.writeFile(path.join(root,page.file),html);transformed.set(page.file,html);
    }
    const local=await server(async name=>{
      if(!name.startsWith('/en/'))return;
      const sourceFile=name.slice(4);const page=pages.find(p=>p.file===sourceFile);
      if(!page?.en)return;
      return portableMarkup(await parser.evaluate(transform,{html:transformed.get(page.file),page,lang:'en',assets,config:configFor(page,'en'),graph:schemaFor(page,'en',page.en.title.split(' | ')[0]),stamp,origin}),'en/'+page.file);
    });
    try {
      const renderer=await chrome.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
      await renderer.route('**/*',r=>r.request().url().startsWith(local.url)?r.continue():r.abort());
      for(const page of pages.filter(p=>p.en)) {
        const errors=[];const onError=e=>errors.push(e.message);renderer.on('pageerror',onError);
        await renderer.goto(local.url+localized(page.file,'en'),{waitUntil:'load'});
        await renderer.waitForTimeout(180);
        const heading=await renderer.locator('h1').innerText();
        const snapshot=await renderer.content();
        if(errors.length)throw new Error(page.file+': '+errors.join('; '));
        const html=portableMarkup(await parser.evaluate(transform,{html:snapshot,page,lang:'en',assets,config:configFor(page,'en'),graph:schemaFor(page,'en',heading.replace(/\s+/g,' ').trim()),stamp,origin,cleanup:true}),'en/'+page.file);
        const output=path.join(root,'en',page.file);await fs.mkdir(path.dirname(output),{recursive:true});
        await fs.writeFile(output,html.replace('<!DOCTYPE html>','<!DOCTYPE html>\n<!-- Generated by npm run build:seo. Edit the Spanish source and translation dictionaries. -->'));
        renderer.off('pageerror',onError);
        console.log('English: '+localized(page.file,'en'));
      }
      await renderer.close();
    } finally {await local.close();}
    const entries=pages.flatMap(p=>[...['es',...(p.en?['en']:[])].map(lang=>{
      const alternatives=p.en?['es','en','x-default'].map(code=>`    <xhtml:link rel="alternate" hreflang="${code}" href="${origin+localized(p.file,code==='en'?'en':'es')}"/>`).join('\n'):'';
      return `  <url>\n    <loc>${origin+localized(p.file,lang)}</loc>\n${alternatives}\n  </url>`;
    })]);
    await fs.writeFile(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+entries.join('\n')+'\n</urlset>\n');
    await fs.writeFile(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: '+origin+'/sitemap.xml\n');
    console.log(`SEO: ${pages.length} Spanish + ${pages.filter(p=>p.en).length} English pages. Sitemap rebuilt.`);
  } finally {await chrome.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
