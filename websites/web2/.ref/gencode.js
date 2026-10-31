const fs=require('fs');
const j=JSON.parse(fs.readFileSync(__dirname+'/panels.json','utf8'));
const strip=s=>s==null?s:s.replace(/\s?[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\uFE0F?/gu,'').replace(/[ \t]+$/gm,'');
const langs=['cURL','NodeJS','Rust','Go','PHP','C#','Java','Python'];
const send={}, inboundReq={};
for(const l of langs){ send[l]=strip(j.code['Email API / SMTP'][l].code); inboundReq[l]=strip(j.code['Inbound'][l].code); }
const out=`// Code samples shown in the transactional email panels.
export const LANGUAGES = ${JSON.stringify(langs.map(l=>({id:l, icon:{'cURL':'bash','NodeJS':'nodejs','Rust':'rust','Go':'go','PHP':'php','C#':'csharp','Java':'java','Python':'python'}[l]})),null,2)} as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

export const SEND_EMAIL: Record<LanguageId, string> = ${JSON.stringify(send,null,2)};

export const SDK_SAMPLE = ${JSON.stringify(strip(j.code['SDK'].cURL.code))};

export const INBOUND_REQUEST: Record<LanguageId, string> = ${JSON.stringify(inboundReq,null,2)};

export const INBOUND_RESPONSE = ${JSON.stringify(strip(j.code['Inbound'].cURL.response))};
`;
fs.mkdirSync(process.argv[2].replace(/[\\/][^\\/]+$/,''),{recursive:true});
fs.writeFileSync(process.argv[2],out);
console.log(out.length, langs.map(l=>l+':'+(send[l]||'').length+'/'+(inboundReq[l]||'').length).join(' '));
