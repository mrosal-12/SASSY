import cv2
import numpy as np

def process(img_file_buffer):
    bytes_data = img_file_buffer.getvalue()
    cv2_img = cv2.imdecode(np.frombuffer(bytes_data, np.uint8), cv2.IMREAD_COLOR)
    cv2.imwrite("image.png",cv2_img)
