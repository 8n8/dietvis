import json


def get_energy(food):
    return int([n for n in food['foodNutrients'] if n['nutrient']['name'] == 'Energy'][0]['amount'])


def extract(food):
    return {
        'description': food['description'],
        'energy': get_energy(food)}


with open("foods.json", "r") as f:
    foods = json.load(f)['SurveyFoods']


def sort_by(food):
    return food['description']


extracted = [extract(food) for food in foods]
extracted.sort(key=sort_by)

descriptions = [e['description'] for e in extracted]
descriptions = [d.replace('"', '\\"') for d in descriptions]
with open("descriptions", "w") as f:
    f.write(f'    ["{descriptions[0]}",\n')
    [f.write(f'     "{description}",\n') for description in descriptions[1:-1]]
    f.write(f'     "{descriptions[-1]}"]\n')


energies = [e['energy'] for e in extracted]
with open("energies", "w") as f:
    f.write(f'    [{energies[0]},\n')
    [f.write(f'     {energy},\n') for energy in energies[1:-1]]
    f.write(f'     {energies[-1]}]\n')
