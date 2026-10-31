const fs=require('fs');
const svgs=JSON.parse(fs.readFileSync(__dirname+'/svgs.json','utf8'));
const names={0:'Logo',1:'ChevronDown',2:'ArrowUpRight12',3:'Plus',4:'ArrowUp',5:'ArrowUpRight',8:'IconApi',9:'IconSdk',10:'IconInbound',11:'IconWebhooks',12:'IconCopy',13:'ArrowRight',14:'IconCampaigns',15:'IconWarmup',16:'IconSegment',17:'IconBuilder',18:'PlusSmall',19:'IconSending',20:'IconDots',21:'ChevronRight',29:'IconAutomation',30:'IconTriggers',31:'IconAnalytics',32:'IconTrigger',33:'TabCurve',34:'Connector',35:'IconClock',37:'IconExit',38:'TabCurveB',40:'ChevronUpDown',41:'IconGear',42:'PlusCircle',43:'BrandChatGPT',44:'ArrowUpRight20',45:'BrandCodex',47:'BrandClaude',49:'BrandAntigravity',51:'BrandCursor',53:'BrandLovable',55:'BrandCopilot',60:'BrandGemini',64:'BrandPerplexity',66:'ArrowRight14',67:'ArrowUpRight11',74:'SocialPeerlist',75:'SocialX',76:'SocialGithub',77:'SocialDiscord',78:'SocialLinkedin',79:'SocialYoutube'};
const camel=s=>s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
let idc=0;
function conv(html,name){
  // make ids unique per component
  const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
  for(const id of ids){ const nid=name.toLowerCase()+'-'+id.replace(/[^a-zA-Z0-9_-]/g,''); html=html.split(`"${id}"`).join(`"${nid}"`).split(`#${id})`).join(`#${nid})`).split(`#${id}"`).join(`#${nid}"`); }
  html=html.replace(/<svg([^>]*)>/,(m,a)=>{ a=a.replace(/\s(class|width|height|aria-hidden|style)="[^"]*"/g,''); return `<svg${a} {...props}>`; });
  html=html.replace(/\s([a-zA-Z:-]+)="([^"]*)"/g,(m,k,v)=>{
    if(k==='class') return ` className="${v}"`;
    if(k==='style'){ const o=v.split(';').filter(Boolean).map(p=>{const [a,...b]=p.split(':'); return `${JSON.stringify(camel(a.trim()))}:${JSON.stringify(b.join(':').trim())}`}).join(','); return ` style={{${o}}}`; }
    if(k==='xlink:href') return ` xlinkHref="${v}"`;
    if(k==='xmlns:xlink') return ` xmlnsXlink="${v}"`;
    if(k.startsWith('data-')||k.startsWith('aria-')) return ` ${k}="${v}"`;
    return ` ${camel(k)}="${v}"`;
  });
  html=html.replace(/className="[^"]*"/g,'');
  html=html.replace(/<!--[\s\S]*?-->/g,'');
  return html;
}
let out=`import type { SVGProps } from "react";\n\ntype P = SVGProps<SVGSVGElement>;\n\n`;
for(const [i,n] of Object.entries(names)){ const s=svgs[i]; if(!s){console.error('missing',i);continue;} out+=`// ${s.w}x${s.h}\nexport const ${n} = (props: P) => (\n  ${conv(s.html,n)}\n);\n\n`; }
fs.writeFileSync(process.argv[2],out);
console.log('ok', out.length);
