import os
import json
import pickle

PRELOAD_PATH = 'test_data.json'
MAX_NUM_CACHES = 5

# stores array of entries
data = []

# decorator allows functions to cache after running
def cache_data(func):
    def wrapper(*args, **kwargs):

        # saves original function return val if necessary
        re = func(*args, **kwargs)

        cached_dir_path = os.path.join(os.getcwd(), 'cached')
        cached_dir = os.listdir(cached_dir_path)
        cached_dir.sort(key=lambda file: os.path.getmtime(os.path.join(cached_dir_path, file)), reverse=True)
        if len(cached_dir) >= MAX_NUM_CACHES:
            os.remove(os.path.join('cached', cached_dir[-1]))
        file = open(os.path.join('cached','cache'+str(int(cached_dir[0].removeprefix('cache'))+1)), 'ab')
        pickle.dump(data, file)
        file.close()

        return re
    
    return wrapper

def load():
    global data
    cached_dir_path = os.path.join(os.getcwd(), 'cached')
    if not os.path.exists(cached_dir_path):
        os.makedirs(cached_dir_path)
    cached_dir = os.listdir(cached_dir_path)
    if len(cached_dir) == 0:
        if PRELOAD_PATH != '':
            data = json.load(open(PRELOAD_PATH))
        file = open(os.path.join('cached','cache0'), 'ab')
        pickle.dump(data, file)
        file.close()
    else:
        cached_dir.sort(key=lambda file: os.path.getmtime(os.path.join(cached_dir_path, file)), reverse=True)
        for file in cached_dir:
            try:
                file = open(os.path.join('cached',file), 'rb')
                temp = pickle.load(file)
            except Exception:
                continue
            else:
                data = temp
                break

def get_data() -> list:
    return data

# be careful about calling this method
# if data is set to a non-list object, other methods will break
@cache_data
def set_data(new_data):
    global data
    data = new_data

@cache_data
def add_data(new_data):
    global data
    data.append(new_data)