import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseVideo,videoInputPattern } from '../src/lib/video.mjs';
const id='M7lc1UVf-VE';
test('YouTube watch, share, shorts, live and embed URLs',()=>{
 for(const input of [`https://www.youtube.com/watch?v=${id}`,`https://youtu.be/${id}?si=share`,`https://www.youtube.com/shorts/${id}`,`https://m.youtube.com/live/${id}`,`https://www.youtube-nocookie.com/embed/${id}`]){
  assert(videoInputPattern.test(input),input);assert.match(parseVideo(input).embed,new RegExp(id));
 }
 assert.match(parseVideo(`https://youtu.be/${id}?t=1m30s`).embed,/start=90/);
});
test('Bilibili BV, AV, part selection and official embed code',()=>{
 const result=parseVideo('https://www.bilibili.com/video/BV1B7411m7LV/?p=2&share_source=copy_web');
 assert.match(result.embed,/bvid=BV1B7411m7LV&p=2/);
 assert.match(parseVideo('https://www.bilibili.com/video/av170001/').embed,/aid=170001/);
 const code='<iframe src="//player.bilibili.com/player.html?isOutside=true&bvid=BV1B7411m7LV&p=2&autoplay=1" scrolling="no" allowfullscreen="true"></iframe>';
 assert(videoInputPattern.test(code));assert.match(parseVideo(code).embed,/autoplay=0/);
});
test('pasted HTML attributes are never passed through',()=>{
 const code=`<iframe src="https://www.youtube.com/embed/${id}?start=5&amp;autoplay=1" onload="alert(1)"></iframe>`;
 const output=parseVideo(code);assert.match(output.embed,/start=5/);assert(!JSON.stringify(output).includes('onload'));assert.match(output.embed,/autoplay=0/);
});
test('reject untrusted hosts, non-video URLs, invalid IDs and scripts',()=>{
 for(const input of ['', 'javascript:alert(1)','https://youtube.com.evil.test/watch?v='+id,'https://www.youtube.com/watch?v=bad','https://www.bilibili.com/','https://b23.tv/abc','<script>alert(1)</script>',`<iframe src="https://evil.test/embed/${id}"></iframe>`])assert.equal(parseVideo(input),null,input);
});
