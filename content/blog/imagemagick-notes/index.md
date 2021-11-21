---
tags:
  - powershell
  - imagemagick
published: true
date: 2021-01-04T17:40:59.748Z
title: ImageMagick Notes
---

# Gist

**Imagemagick** is a powerful command-line tool for editing images. This page includes some notes for how to use ImageMagick for simple image resizing tasks. This is useful because ImageMagick is lighter than Bridge or Photoshop and, when used with PowerShell, can help you make changes to a large number of images in a short amount of time.

## Home page

https://imagemagick.org/index.php

# How to Get Started

1. Go to https://imagemagick.org/index.php and download an OS-appropriate installer. I used `ImageMagick-7.0.8-23-Q16-x64-dll.exe` in December 2018.
1. Install ImageMagick
1. Invoke ImageMagick from the command line either in **cmd.exe** or (preferrably) in **PowerShell**. All Image Magick expressions begin with the command `magick`. Use `magick -help` to get the help text.

# Sample Commands

Below are some examples of useful ImageMagick command-line expressions. In each example the `$>` token represents the command prompt.

### Convert Image Format using the `convert` keyword

- Indicate the destination format by the extension (rose.**png**, below)
  `$> magick convert rose.jpg rose.png`

### Resize with the -resize flag

- There are many different ways to express resizing. ([See Also](https://imagemagick.org/script/command-line-options.php#resize)) The simplest way is to indicate a target size in pixel dimensions (e.g. 100x100) or use a percentage like _50%_ to reduce the image size proportionally.

  `$> magick convert rose.jpg -resize 50% rose.jpg`

  `$> convert rose.jpg -resize 320x45 rose.jpg`

### Combine ImageMagick commands with PowerShell loops for batch processing

- The below PS will get all JPG files in the current directory and convert them to PNG
  ```powershell
  Get-ChildItem -Filter "*.png" | % { $n = $_.Name -Replace "png","jpg"; magick convert $_ $n }
  ```

### Aspect Ratio is automatically considered unless you use the `!` operator

- The below command will resize rose.jpg to fit proportionally within a 1600px by 1200px box, without changing the aspect ratio of the image.
  `$> magick convert rose.jpg -resize 1600x1200 rose.jpg`

### Resize and only Upscale, downscale, or fit

You can specify whether _not_ to resize files that are larger or smaller than the target size specified with `-resize`.

- **Upscale** with `>`. Any images that are larger than 64x64 will not be resized.
  `$> convert dragon.jpg -resize 64x64< dragon.jpg`

- **Downscale** with `>`. Any images that are smaller than 64x64 will not be resized.
  `$> convert dragon.jpg -resize 64x64> dragon.jpg`

- Fill the available space (and crop the image if necessary) with `^`
  `$> convert dragon.jpg -resize 64x64^ dragon.jpg`

### Resize to fit and fill the given space

`$> magick convert dragon.jpg -resize 64x64^ -gravity center -extent 64x64 fill_crop_dragon.jpg`

- Here the `-extent` flag sets the "canvas" size, which can be used as padding if it exceedes the resize dimensions

### Resize an image to have a specific pixel count

`$> magick convert dragon.jpg -resize 4096@ pixel_dragon.jpg`

- The image will not have more than 4096 pixels, total.
- Using this command can help make a batch of images all roughly the same size, without warping them.

### Rotate Image Conditionally

- Use `>` to rotate the image only if _its width exceeds the height_. `<` rotates the image only if _its width is less than the height_. For example, if you specify `-rotate "-90>"` and the image size is 480x640, the image is not rotated. However, if the image is 640x480, it is rotated by -90 degrees. If you use `>` or `<`, enclose it in quotation marks to prevent it from being misinterpreted as a file redirection.
- Empty triangles in the corners, left over from rotating the image, are filled with the background color.

  ```powershell
  $> magick convert -resize "1600x1200>" -rotate "90>"
  ```

### Convert from PDF

- For this to work, you first need to install [GhostScript](https://www.ghostscript.com/) (a library that interprets PDF's).
  `$> magick convert -density 150 project.pdf -colorspace rgb -scale 500x500 project.jpg`

### Convert PDF with transparent background

- Images with transparent background (i.e. an alpha channel) will render with a black background unless you specify not to
  `$> magick convert -verbose -density 150 -colorspace rgb -quality 100 -flatten -sharpen 0x1.0 -scale 500x500 $_ $_.jpg}`

### Compare two different images

- Using the Perceptual Hash (PHASH) metric, we can test two images of differing sizes to see if they are perceptually similar. In effect this means we can check to see if two images are "identical" from a human perspective by using Imagemagick. The decimal number that is returned by this call is a measure of the perceptual similarity between the two images being compared. A value of zero means that the images are definitely identical (i.e. they are exactly the same in all respects); higher values means they are less similar.

  `$> magick compare -metric phash image1 image2 diffimage`
  or
  `$> compare -metric phash -subimage-search image1 image2 diffimage`

     <blockquote>
     This metric is different from all the rest. The two images do not have to be the same size when not using the -subimage-search setting. If the sizes differ, then the order is not important.

  When doing subimage searches, the order is important and the larger image must be listed first. However, using this metric in a subimage search is exceedingly slow and works in limited circumstances. An example will be presented below.

  For color images, this metric seems to be insensitive to a variety of mild to moderate attacks (variations in processing). These attacks include: resize, rotation (with black background), translation (with black background), brightness, contrast, gamma, blur, jpeg compression, noise, mirror/transpose, watermarking, arc distortion, barrel distortion, pincushion distortion and shear distortion.

  The hash is created by taking the log of the absolute value of each of the first 7 floating point Hu image moments from each channel using graylevels normalized to the range 0 to 1 (as of IM 6.8.8.5). The log is used to mitigate the large variation in exponents of the moments. The absolute value is used to make the moments insensitive to mirror-like attacks. For color images, there are 42 floating point values. For grayscale images, there are only 7 floating point moments. Therefore, the hash lengths are different for color images and grayscale images. <strong>Consequently, color and grayscale images cannot be compared directly.</strong> The phash metric computes the sum of the squared differences of all 42 or 7 log(abs(moments)) between the two images. One can review the Hu moments by the following commmand:
  ([Source](http://www.fmwconcepts.com/misc_tests/perceptual_hash_test_results_510/index.html))
     </blockquote>

# See Also

- [Tests Of Perceptual Hash (PHASH) Compare Metric](http://www.fmwconcepts.com/misc_tests/perceptual_hash_test_results_510/index.html)
