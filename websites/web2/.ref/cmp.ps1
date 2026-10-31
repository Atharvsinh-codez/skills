Add-Type -AssemblyName System.Drawing
$d='D:\design-to-code\Own-skills\websites\web2\.ref'
$a=[System.Drawing.Image]::FromFile("$d\live-full.png"); $b=[System.Drawing.Image]::FromFile("$d\impl-full.png")
$H=[Math]::Max($a.Height,$b.Height); $n=0
for($y=0;$y -lt $H;$y+=900){
 $bmp=New-Object System.Drawing.Bitmap 1440,900; $g=[System.Drawing.Graphics]::FromImage($bmp); $g.Clear([System.Drawing.Color]::White)
 $g.DrawImage($a,(New-Object System.Drawing.Rectangle 0,0,720,900),(New-Object System.Drawing.Rectangle 0,$y,1440,1800),'Pixel')
 $g.DrawImage($b,(New-Object System.Drawing.Rectangle 720,0,720,900),(New-Object System.Drawing.Rectangle 0,$y,1440,1800),'Pixel')
 $g.DrawLine((New-Object System.Drawing.Pen ([System.Drawing.Color]::Red),2),720,0,720,900)
 $bmp.Save("$d\cmp$n.png",[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose(); $n++; $y+=900
}
$a.Dispose(); $b.Dispose(); "n=$n"
