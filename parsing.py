# returns value of nested key with path given 'x.y.key'
def parse_and_return(entry, path: str):
    for k in path.split('.'):
        entry = entry[k]
    return entry