import time
import board
import neopixel

pixels = neopixel.NeoPixel(board.D12, 24)

pixels.fill((255,255,255))
step = 0.08
bound = 0.7
freq = 0.01

while True:
    while pixels.brightness < bound:
        pixels.brightness += step
        time.sleep(freq)
    while pixels.brightness > 0.0:
        pixels.brightness -= step
        time.sleep(freq)

