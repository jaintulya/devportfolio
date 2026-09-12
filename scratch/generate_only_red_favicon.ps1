Add-Type -AssemblyName System.Drawing

$srcLogoPath = Resolve-Path "public/only-red-and-shaadi-pitara-text-logo.png"

function Generate-Favicon([int]$targetSize, [string]$outPath) {
    $bmp = [System.Drawing.Bitmap]::new($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.Clear([System.Drawing.Color]::Transparent)

    $srcImg = [System.Drawing.Image]::FromFile($srcLogoPath)
    
    # Draw image fitted cleanly into target square
    $destRect = [System.Drawing.RectangleF]::new(0, 0, $targetSize, $targetSize)
    $srcRect = [System.Drawing.RectangleF]::new(0, 0, $srcImg.Width, $srcImg.Height)
    $g.DrawImage($srcImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $srcImg.Dispose()
    $g.Dispose()

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Generated: $outPath ($targetSize x $targetSize)"
}

$targets = @(
    @{ Size = 512; Path = (Resolve-Path "public").Path + "\favicon-512.png" },
    @{ Size = 512; Path = (Resolve-Path "public").Path + "\favicon.png" },
    @{ Size = 512; Path = (Resolve-Path "src/app").Path + "\icon.png" },
    @{ Size = 192; Path = (Resolve-Path "public").Path + "\favicon-192.png" },
    @{ Size = 180; Path = (Resolve-Path "public").Path + "\favicon-180.png" },
    @{ Size = 180; Path = (Resolve-Path "public").Path + "\apple-touch-icon.png" },
    @{ Size = 180; Path = (Resolve-Path "src/app").Path + "\apple-icon.png" },
    @{ Size = 48;  Path = (Resolve-Path "public").Path + "\favicon-48.png" },
    @{ Size = 32;  Path = (Resolve-Path "public").Path + "\favicon-32.png" },
    @{ Size = 16;  Path = (Resolve-Path "public").Path + "\favicon-16.png" }
)

foreach ($t in $targets) {
    Generate-Favicon $t.Size $t.Path
}

# Generate multi-resolution favicon.ico
Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.IO;

public class IcoHelper {
    public static void CreateIco(string png32Path, string icoPath) {
        using (Bitmap bmp = new Bitmap(png32Path)) {
            IntPtr hIcon = bmp.GetHicon();
            using (Icon icon = Icon.FromHandle(hIcon)) {
                using (FileStream fs = new FileStream(icoPath, FileMode.Create)) {
                    icon.Save(fs);
                }
            }
        }
    }
}
"@ -ReferencedAssemblies System.Drawing

$icoPath = (Resolve-Path "public").Path + "\favicon.ico"
$png32Path = (Resolve-Path "public").Path + "\favicon-32.png"
[IcoHelper]::CreateIco($png32Path, $icoPath)
Write-Output "Generated: $icoPath"
