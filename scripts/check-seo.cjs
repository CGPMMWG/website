const assert = require('node:assert/strict');
const {fs,path,root,origin,pages,route,localized,browser,server} = require('./site-tools.cjs');
async function main() {
  const chrome=await browser();const local=await server();const failures=[];const records=[];
  const check=(condition,message)=>{if(!condition)failures.push(message);};
  try {
    const parser=await chrome.newPage();
    for(const page of pages)for(const lang of ['es',...(page.en?['en']:[])]) {
      const file=(lang==='en'?'en/':'')+page.file;
      const html=await fs.readFile(path.join(root,file),'utf8');
      const data=await parser.evaluate(html=>{
        const d=new DOMParser().parseFromString(html,'text/html');
        const metas=key=>[...d.querySelectorAll(`meta[name="${key}"],meta[property="${key}"]`)].map(el=>el.content);
        return {
          title:d.title,description:metas('description'),lang:d.documentElement.lang,
          canonical:[...d.querySelectorAll('link[rel="canonical"]')].map(el=>el.getAttribute('href')),
          alternates:[...d.querySelectorAll('link[hreflang]')].map(el=>({lang:el.hreflang,href:el.getAttribute('href')})),
          schemas:[...d.querySelectorAll('script[type="application/ld+json"]')].map(el=>JSON.parse(el.textContent)),
          headings:[...d.querySelectorAll('h1')].map(el=>el.textContent.trim()),ids:[...d.querySelectorAll('[id]')].map(el=>el.id),
          images:[...d.images].map(el=>({src:el.getAttribute('src'),width:el.getAttribute('width'),height:el.getAttribute('height'),alt:el.getAttribute('alt')})),
          refs:[...d.querySelectorAll('a[href],link[href],script[src],img[src],source[src],video[poster]')].map(el=>el.getAttribute('href')||el.getAttribute('src')||el.getAttribute('poster')),
          ogTitle:metas('og:title'),ogDescription:metas('og:description'),ogUrl:metas('og:url'),ogImage:metas('og:image'),ogWidth:metas('og:image:width'),ogHeight:metas('og:image:height')
        };
      },html);
      records.push({file,page,lang,...data});
      const prefix=file+': ';
      check(data.title===page[lang].title,prefix+'title');
      check(data.description.length===1&&data.description[0]===page[lang].description,prefix+'description');
      check(data.headings.length===1&&data.headings[0],prefix+'single H1');
      check(data.lang===lang,prefix+'language');
      check(data.canonical.length===1&&data.canonical[0]===origin+localized(page.file,lang),prefix+'canonical');
      check(data.ogTitle[0]===data.title&&data.ogDescription[0]===data.description[0]&&data.ogUrl[0]===data.canonical[0],prefix+'social metadata');
      check(data.schemas.length===1&&!!data.schemas[0]['@graph'],prefix+'single JSON-LD graph');
      const ids=data.schemas.flatMap(s=>s['@graph']||[]).map(s=>s['@id']);
      check(new Set(ids).size===ids.length,prefix+'unique schema identities');
      if(page.en)for(const code of ['es','en','x-default'])check(data.alternates.some(a=>a.lang===code&&a.href===origin+localized(page.file,code==='en'?'en':'es')),prefix+'hreflang '+code);
      for(const img of data.images)check(img.width&&img.height&&img.alt!==null,prefix+'image dimensions/alt '+img.src);
      const config=JSON.parse(html.match(/<script[^>]*id="page-seo"[^>]*>([\s\S]*?)<\/script>/)[1]);
      check(config.title===data.title,prefix+'runtime metadata');
    }
    const byRoute=new Map(records.map(r=>[route(r.file),r]));
    for(const record of records)for(const ref of new Set(record.refs)) {
      if(!ref||/^(mailto:|tel:|javascript:|data:)/.test(ref))continue;
      const url=new URL(ref,origin+'/'+record.file);
      if(url.origin!==origin)continue;
      let file=decodeURIComponent(url.pathname.slice(1));if(!file||file.endsWith('/'))file+='index.html';
      try {await fs.access(path.join(root,file));}catch{failures.push(record.file+': missing '+ref);continue;}
      const target=byRoute.get(url.pathname.replace(/index\.html$/,''));
      if(url.hash&&target)check(target.ids.includes(decodeURIComponent(url.hash.slice(1))),record.file+': broken anchor '+ref);
    }
    const xml=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');
    const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
    check(locs.length===records.length&&new Set(locs).size===records.length,'Sitemap count/duplicates');
    for(const r of records)check(locs.includes(r.canonical[0]),r.file+': missing from sitemap');
    // Render every URL: catches untranslated courses, stale runtime metadata and broken resources.
    const rendered=[];let next=0;
    await Promise.all(Array.from({length:3},async()=>{
      const view=await chrome.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
      await view.route('**/*',r=>r.request().url().startsWith(local.url)?r.continue():r.abort());
      while(next<records.length){
        const record=records[next++];const errors=[];const missing=[];
        const onError=e=>errors.push(e.message),onResponse=r=>{if(r.url().startsWith(local.url)&&r.status()>=400)missing.push(r.url().replace(local.url,''));};
        view.on('pageerror',onError);view.on('response',onResponse);
        await view.goto(local.url+route(record.file),{waitUntil:'load'});
        await view.waitForTimeout(250);
        const data=await view.evaluate(()=>({
          title:document.title,description:document.querySelector('meta[name="description"]').content,lang:document.documentElement.lang,
          h1:document.querySelector('h1').textContent.trim().replace(/\s+/g,' '),overflow:document.documentElement.scrollWidth-innerWidth,
          links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),
          intro:[...document.querySelectorAll('main p,.shell p,.course-hero p')].slice(0,3).map(p=>p.textContent.trim()).join(' ').slice(0,180)
        }));
        check(!errors.length,record.file+': JS '+errors.join('; '));check(!missing.length,record.file+': HTTP '+missing.join('; '));
        check(data.title===record.title,record.file+': runtime title '+data.title);
        check(data.description===record.description[0],record.file+': runtime description');
        check(data.lang===record.lang,record.file+': runtime language');
        check(data.overflow<=1,record.file+': mobile overflow '+data.overflow);
        for(const href of data.links){
          if(!href||/^(mailto:|tel:|javascript:|data:)/.test(href))continue;
          const url=new URL(href,local.url+route(record.file));
          if(url.origin!==local.url)continue;
          const target=byRoute.get(url.pathname.replace(/index\.html$/,''));
          if(target&&url.hash)check(target.ids.includes(decodeURIComponent(url.hash.slice(1))),record.file+': runtime broken anchor '+href);
        }
        if(record.lang==='en')check(!/^(Aprendé|Conocé|Creación|Diagnóstico|Ventas Digitales|Marketing Digital desde)/.test(data.h1+' '+data.intro),record.file+': untranslated English page');
        rendered.push({file:record.file,...data,errors,missing});view.off('pageerror',onError);view.off('response',onResponse);
      }
      await view.close();
    }));
    if(process.env.SEO_REPORT)await fs.writeFile(process.env.SEO_REPORT,JSON.stringify({pages:records.length,failures,rendered},null,2));
    for(const failure of failures)console.error(failure);
    assert.equal(failures.length,0,`${failures.length} SEO validation failures`);
    console.log(`PASS: ${records.length} pages; metadata, canonicals, reciprocal hreflang, JSON-LD, local links, image dimensions, sitemap and mobile rendering.`);
  } finally {await chrome.close();await local.close();}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
