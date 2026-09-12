Add-Type -AssemblyName System.Drawing

$imgFile = Resolve-Path "public/only-red-and-shaadi-pitara-text-logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($imgFile)
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0;
for ($y = 0; $y -lt $bmp.Height; $y += 4) {
    for ($x = 0; $x -lt $bmp.Width; $x += 4) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Non-transparent bounds: X=[$minX, $maxX], Y=[$minY, $maxY]"
Write-Host "Content size: $($maxX - $minX) x $($maxY - $minY)"
$bmp.Dispose()
