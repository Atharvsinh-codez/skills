import math, random
random.seed(3)
# rough continent polygons (lon, lat)
polys = {
 "africa":[(-17,15),(-16,21),(-10,30),(-5,36),(10,37),(20,32),(32,31),(35,28),(43,12),(51,12),(44,-2),(40,-15),(35,-25),(26,-34),(18,-34),(12,-17),(9,-2),(9,4),(-8,4),(-15,10)],
 "europe":[(-9,37),(-9,43),(-2,43.5),(-4.5,48),(-1,49.5),(2,51),(5,53.5),(8,54),(8,57),(10.5,57.5),(11,59),(5,59),(5,62),(12,66),(16,69),(22,70.5),(30,70.5),(40,66),(50,62),(55,55),(50,46),(40,44),(30,46),(28,41),(24,38),(21,40),(19,42),(16,41),(18,40),(15,38),(12,42),(9,44),(5,43),(3,42),(0,39),(-2,37)],
 "baltic_gap":[(0,0)],
 "arabia":[(35,30),(48,30),(56,25),(59,22),(52,16),(45,13),(39,20)],
 "asia":[(40,42),(50,45),(60,40),(70,38),(75,30),(68,25),(62,25),(57,27),(50,30),(45,38)],
 "brazil":[(-35,-5),(-40,-3),(-50,0),(-52,4),(-60,8),(-70,6),(-75,0),(-80,-5),(-75,-15),(-70,-20),(-58,-34),(-48,-28),(-40,-22),(-39,-14)],
 "uk":[(-6,50),(-5,58),(-2,58),(1,52)],
 "madagascar":[(44,-25),(47,-25),(50,-15),(49,-12),(44,-17)],
}
def inside(pt, poly):
    x,y=pt; c=False; j=len(poly)-1
    for i in range(len(poly)):
        xi,yi=poly[i]; xj,yj=poly[j]
        if ((yi>y)!=(yj>y)) and (x < (xj-xi)*(y-yi)/(yj-yi+1e-9)+xi): c=not c
        j=i
    return c
R=310; cx=320; cy=320
lon0=math.radians(5); lat0=math.radians(22)
out=[]
step=1.15
lat=-80.0
while lat<=80:
    lon=-180.0
    while lon<180:
        la=math.radians(lat); lo=math.radians(lon)
        cosc=math.sin(lat0)*math.sin(la)+math.cos(lat0)*math.cos(la)*math.cos(lo-lon0)
        if cosc>0:
            x=cx+R*math.cos(la)*math.sin(lo-lon0)
            y=cy-R*(math.cos(lat0)*math.sin(la)-math.sin(lat0)*math.cos(la)*math.cos(lo-lon0))
            land=any(inside((lon,lat),p) for k,p in polys.items() if len(p)>2) and not inside((lon,lat),[(12,54),(14,58),(18,62),(22,65),(26,65),(25,60),(22,57),(20,54)])
            edge = cosc<0.22
            if land:
                op=0.35+0.45*cosc
                out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1.05" fill="#6e6e78" fill-opacity="{op:.2f}"/>')
            elif (edge and random.random()<0.6) or (random.random()<0.07):
                out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1" fill="#9a9aa2" fill-opacity="{0.25+0.9*(0.22-cosc):.2f}"/>')
        lon+=step/max(math.cos(math.radians(lat)),0.25)
    lat+=step
# a few blue dots (active region)
for (x,y) in [(18,305),(22,305),(26,305),(14,312),(18,312)]:
    out.append(f'<circle cx="{x}" cy="{y}" r="1.4" fill="#306ffc"/>')
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" fill="none">{"".join(out)}</svg>'
open(r"D:\design-to-code\Own-skills\websites\web4\app\public\globe-dots.svg","w").write(svg)
print(len(out))
