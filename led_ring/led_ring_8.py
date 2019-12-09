import time
import board
import neopixel

pixels = neopixel.NeoPixel(board.D12, 24)

pixels.fill((0,0,0))
