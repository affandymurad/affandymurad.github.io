// Proxy CORS untuk API CampaignEvents (Cloudflare Worker, format module).
//
// Browser selalu mengirim header Origin pada permintaan lintas-origin, dan REST API mediawiki.org
// menjawabnya 403 "rest-cross-origin-anon-write". Worker ini meneruskan permintaan dari server
// (tanpa Origin) lalu menambahkan header CORS pada jawabannya.
//
// Pasang: wrangler deploy, lalu isi EVENTS_API_BASE di ../index.html dengan URL worker (tanpa garis miring akhir).

const UPSTREAM = 'https://www.mediawiki.org/w/rest.php/campaignevents/v0';
const USER_AGENT = 'wikikategori-campaignevents-proxy/1.0 (https://affandymurad.github.io/wiki/)';
const ALLOWED_ORIGINS = ['https://affandymurad.github.io'];

// Hanya endpoint baca yang dipakai Wiki
const ROUTES = [
  /^\/participant\/\d+\/event_registrations$/,
  /^\/organizer\/\d+\/event_registrations$/,
  /^\/event_registration\/\d+$/,
  /^\/event_registration\/\d+\/organizers$/
];

function corsHeaders(origin){
  const allowed = ALLOWED_ORIGINS.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');
  return allowed
    ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin', 'Access-Control-Expose-Headers': 'Retry-After' }
    : { 'Vary': 'Origin' };
}

export default {
  async fetch(request){
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin);

    if(request.method === 'OPTIONS'){
      return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Accept', 'Access-Control-Max-Age': '86400' } });
    }
    if(request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });
    if(!cors['Access-Control-Allow-Origin']) return new Response('Origin not allowed', { status: 403, headers: cors });

    const { pathname } = new URL(request.url);
    if(!ROUTES.some(r => r.test(pathname))) return new Response('Not found', { status: 404, headers: cors });

    const upstream = await fetch(UPSTREAM + pathname, {
      headers: { 'Accept': 'application/json', 'User-Agent': USER_AGENT },
      cf: { cacheTtl: 300, cacheEverything: true }
    });

    const headers = new Headers(cors);
    headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/json');
    const retryAfter = upstream.headers.get('Retry-After');
    if(retryAfter) headers.set('Retry-After', retryAfter);
    headers.set('Cache-Control', 'public, max-age=300');
    return new Response(upstream.body, { status: upstream.status, headers });
  }
};
