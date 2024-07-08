import cv2
from qreader import QReader

qreader = QReader()

def decode():
    image = cv2.cvtColor(cv2.imread("image.png"), cv2.COLOR_BGR2RGB)
    decoded_text = qreader.detect_and_decode(image=image)
    return decoded_text
