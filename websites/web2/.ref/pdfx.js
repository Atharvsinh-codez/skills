const fs=require('fs'); const zlib=require('zlib');
const buf=fs.readFileSync(process.argv[2]);
const s=buf.toString('latin1');
let re=/(\d+) 0 obj\s*<<([\s\S]*?)>>\s*stream\r?\n/g, m, n=0;
while((m=re.exec(s))){
  const dict=m[2]; const start=m.index+m[0].length;
  const lenM=dict.match(/\/Length (\d+)/); if(!lenM) continue;
  const len=+lenM[1];
  if(!/\/Subtype\s*\/Image/.test(dict)) continue;
  const w=(dict.match(/\/Width (\d+)/)||[])[1], h=(dict.match(/\/Height (\d+)/)||[])[1];
  const data=buf.subarray(start,start+len);
  console.log('img',m[1],w,h,dict.replace(/\s+/g,' ').slice(0,200));
  if(/DCTDecode/.test(dict)){ fs.writeFileSync(`pdfimg${n}.jpg`,data); }
  else if(/FlateDecode/.test(dict)){ fs.writeFileSync(`pdfimg${n}.raw`,zlib.inflateSync(data)); fs.writeFileSync(`pdfimg${n}.meta`,`${w} ${h} ${dict}`); }
  n++;
}
console.log('count',n);
