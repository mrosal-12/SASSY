from typing import Callable

from data import get_data
from parsing import parse_and_return

# team path in format 'x.y.z'
# func must be a function that takes a list and returns a single number
def per_team_stats( team_path: str, metric_path: str, func: Callable[[list], float] = None):
    data = get_data()
    stats = {}
    teams = set()
    for entry in data:
        team = parse_and_return(entry, team_path)
        metric = parse_and_return(entry, metric_path)
        if team not in teams:
            teams.add(team)
            stats[team] = [metric]
        else:
            stats[team].append(metric)
    if func is not None:
        for team in stats:
            stats[team] = func(stats[team])
    return stats