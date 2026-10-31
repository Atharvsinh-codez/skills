const fs=require('fs');
const buf=fs.readFileSync(process.argv[2]);
const s=buf.toString('latin1');
const re=/\/Subtype\s*\/Image[^>]*?\/Length (\d+)[^>]*>>\s*stream\r?\n/g; let m,n=0;
while((m=re.exec(s))){ const start=m.index+m[0].length; const data=buf.subarray(start,start+(+m[1])); fs.writeFileSync(`page${n}.jpg`,data); console.log(n, data[0].toString(16), data[1].toString(16), data.length); n++; }
