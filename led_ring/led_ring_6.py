import time
import board
import neopixel

# Code adapted from the sample code provided here: https://circuitpython.readthedocs.io/projects/neopixel/en/latest/examples.html

def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos*3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos*3)
        g = 0
        b = int(pos*3)
    else:
        pos -= 170
        r = 0
        g = int(pos*3)
        b = int(255 - pos*3)
    return (r, g, b)

pixels = neopixel.NeoPixel(board.D12, 24)

pixels.fill((255,255,255))

while True:
    for j in range(0, 255, 30):
        for i in range(24):
            pixel_index = (i * 256 // 24) + j
            pixels[i] = wheel(pixel_index & 255)
        pixels.show()

