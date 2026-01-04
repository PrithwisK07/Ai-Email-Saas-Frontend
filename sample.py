import svgwrite
import cv2
import numpy as np
from skimage.morphology import skeletonize

# Load signature
img = cv2.imread("signature.png", cv2.IMREAD_GRAYSCALE)

# Threshold to make it binary
_, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

# Skeletonize (reduce strokes to 1-pixel width)
skeleton = skeletonize(binary // 255)
skeleton = (skeleton * 255).astype(np.uint8)

cv2.imwrite("skeleton.png", skeleton)

# Find contours (curves)
contours, _ = cv2.findContours(skeleton, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create an SVG drawing
dwg = svgwrite.Drawing("signature.svg", profile="tiny")

# Add contours as paths
for cnt in contours:
    points = [(p[0][0], p[0][1]) for p in cnt]
    dwg.add(dwg.polyline(points, stroke='black', fill='none', stroke_width=1))

dwg.save()
