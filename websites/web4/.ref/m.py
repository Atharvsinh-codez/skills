from PIL import Image
R=Image.open(r"D:\design-to-code\Own-skills\websites\web4\.ref\full.png").convert("RGB"); M=Image.open(r"D:\design-to-code\Own-skills\websites\web4\.ref\impl.png").convert("RGB")
def runs(im,x,test):
    out=[];prev=False
    for y in range(im.height):
        v=test(im.getpixel((x,y)))
        if v!=prev: out.append(y); prev=v
    return out
dark=lambda p: sum(p)<100
soft=lambda p: abs(p[0]-247)<=1 and abs(p[2]-247)<=1
def rows(im,x0,x1,y0,y1,th=140):
    res=[];inrow=False
    for y in range(y0,y1):
        d=any(sum(im.getpixel((x,y)))<th*3 for x in range(x0,x1,2))
        if d and not inrow: s=y; inrow=True
        if not d and inrow: res.append((s,y)); inrow=False
    return res
for name,im in (("ref",R),("impl",M)):
    print(name,"dark",runs(im,100,dark)[:4],"soft",runs(im,100,soft)[:6])
    print(name,"hero",rows(im,200,760,150,900))
    print(name,"stmt",rows(im,480,1440,1300,1900,th=200))
    print(name,"darktitle",rows(im,700,1300,2700,3200,th=-1) if False else "")
    print(name,"cases",rows(im,200,900,4400,4620))
    print(name,"casetext",rows(im,200,700,5000,5200))
    print(name,"steps",rows(im,200,700,5400,5700))
    print(name,"cta",rows(im,600,1300,9850,10300))
ranges=[(0,1300),(1250,2700),(2650,4300),(4250,5300),(5250,6600),(6550,7850),(7800,8700),(8650,9800),(9750,11152)]
for i,(a,b) in enumerate(ranges):
    r=R.crop((0,a,1920,b)); m=M.crop((0,a,1920,b))
    out=Image.new("RGB",(3860,b-a),"red"); out.paste(r,(0,0)); out.paste(m,(1940,0))
    out.resize((int(3860*0.42),int((b-a)*0.42)),Image.LANCZOS).save(rf"D:\design-to-code\Own-skills\websites\web4\.ref\cmp{i}.png")
