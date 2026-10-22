// Accept only known video URLs or an iframe whose src is a known video URL.
// Pasted HTML is never rendered; only the validated ID is used to build an iframe.
const youtube = String.raw`(?:https?:)?//(?:(?:www\.|m\.)?youtube\.com/(?:watch\?(?:[^\s"'<>]*&)?v=[\w-]{11}(?:&[^\s"'<>]*)?|(?:embed|shorts|live)/[\w-]{11}(?:\?[^\s"'<>]*)?)|(?:www\.)?youtube-nocookie\.com/embed/[\w-]{11}(?:\?[^\s"'<>]*)?|youtu\.be/[\w-]{11}(?:\?[^\s"'<>]*)?)`;
const bilibili = String.raw`(?:https?:)?//(?:(?:www\.|m\.)?bilibili\.com/video/(?:BV[\w]{10}|av[1-9]\d*)/?(?:\?[^\s"'<>]*)?|player\.bilibili\.com/player\.html\?(?:[^\s"'<>]*&)?(?:bvid=BV[\w]{10}|aid=[1-9]\d*)(?:&[^\s"'<>]*)?)`;
const address = `(?:${youtube}|${bilibili})`;
export const videoInputPattern = new RegExp(`^\\s*(?:${address}|<iframe\\b[^>]*?\\ssrc=["']${address}["'][^>]*>\\s*</iframe>)\\s*$`, 'i');
export function parseVideo(input) {
  const raw = (input || '').trim();
  if (!raw || !videoInputPattern.test(raw)) return null;
  const source = raw.startsWith('<') ? raw.match(/\ssrc=["']([^"']+)["']/i)?.[1] : raw;
  if (!source) return null;
  let url;
  try { url = new URL(source.replace(/&amp;/g, '&').replace(/^\/\//, 'https://')); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();
  if (['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com','youtu.be'].includes(host)) {
    const id = host === 'youtu.be' ? url.pathname.slice(1) : url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.split('/')[2];
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    const time = url.searchParams.get('start') || url.searchParams.get('t') || '';
    let start = /^\d+$/.test(time) ? Number(time) : 0;
    const hms = time.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
    if (hms && time) start = Number(hms[1] || 0)*3600 + Number(hms[2] || 0)*60 + Number(hms[3] || 0);
    return { provider:'YouTube', embed:`https://www.youtube.com/embed/${id}?autoplay=0${start>0?`&start=${Math.floor(start)}`:''}`, url:`https://www.youtube.com/watch?v=${id}` };
  }
  if (['bilibili.com','www.bilibili.com','m.bilibili.com','player.bilibili.com'].includes(host)) {
    const pathId = url.pathname.match(/^\/video\/(BV\w{10}|av[1-9]\d*)\/?$/)?.[1];
    const bvid = pathId?.startsWith('BV') ? pathId : url.searchParams.get('bvid');
    const aid = pathId?.startsWith('av') ? pathId.slice(2) : url.searchParams.get('aid');
    const id = bvid && /^BV\w{10}$/.test(bvid) ? `bvid=${bvid}` : aid && /^[1-9]\d*$/.test(aid) ? `aid=${aid}` : null;
    if (!id) return null;
    const part = url.searchParams.get('p');
    const p = part && /^[1-9]\d*$/.test(part) ? part : '1';
    const cid = url.searchParams.get('cid');
    return {provider:'哔哩哔哩',embed:`https://player.bilibili.com/player.html?${id}&p=${p}${cid && /^[1-9]\d*$/.test(cid)?`&cid=${cid}`:''}&autoplay=0`,url:`https://www.bilibili.com/video/${bvid || `av${aid}`}/?p=${p}`};
  }
  return null;
}
