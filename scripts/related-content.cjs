/* Static cards for related services, articles and client projects. */
function relatedContent(related,lang) {
  const en=lang==='en';
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels=en?{Service:'Service',BlogPosting:'From the blog',Article:'Case study'}:{Service:'Servicio',BlogPosting:'Del blog',Article:'Caso de éxito'};
  const cards=related.map(item=>`<li><a class="related-link-card" href="${escape(item.href)}"><span class="related-link-card__type">${labels[item.type]||(en?'Explore':'Explorar')}</span><h3>${escape(item.name)}</h3><p>${escape(item.description)}</p><span class="related-link-card__action">${en?'Explore more':'Conocer más'} <span aria-hidden="true">↗</span></span></a></li>`).join('');
  return `<section class="seo-related related-content"><div class="related-content__heading"><span class="related-content__eyebrow">${en?'KEEP EXPLORING':'SEGUÍ EXPLORANDO'}</span><h2>${en?'Related services, case studies and articles':'Servicios, casos y artículos relacionados'}</h2></div><ul class="related-content__grid">${cards}</ul></section>`;
}
module.exports={relatedContent};

