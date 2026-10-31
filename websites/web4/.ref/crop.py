from PIL import Image
im = Image.open(r"C:\Users\jadav\.factory\temp\images\e8e644f6\f12ca71d-4a2c-4ff5-88d9-c8f1a31e4f24.png").convert("RGB")
im.save(r"D:\design-to-code\Own-skills\websites\web4\.ref\design.png")
step=128
for i,y in enumerate(range(0,1024,step)):
    c = im.crop((0,y,176,min(y+step,1024)))
    c = c.resize((c.width*6,c.height*6), Image.LANCZOS)
    c.save(rf"D:\design-to-code\Own-skills\websites\web4\.ref\crop{i}.png")
