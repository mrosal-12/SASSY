from data import get_data
from parsing import parse_and_return

# make sure keys are paths
def query(k_v_dict: dict) -> list:
    data = get_data()
    valid_entries = []
    for k, v in k_v_dict.items():
        if not isinstance(v, list):
            v = [v]
        for entry in data:
            if parse_and_return(entry, k) in v:
                valid_entries.append(entry)
    return valid_entries