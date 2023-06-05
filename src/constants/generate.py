from copy import deepcopy
import json
import os
current_path = os.path.dirname(__file__)

basic = {
    "sideBarName": 'side ',
    "correspondingData": {
      "name": 'heihei',
    },
}

def generate_random_data(times):
	result_list = []
	for i in range(times):
		temp_ = deepcopy(basic)
		# print(type(temp_))
		temp_["sideBarName"] = f'range-{i}'
		temp_["correspondingData"]["name"] = f'range-{i}'
		result_list.append(temp_)
	with open(os.path.join(current_path, 'temp_data.json'), 'w+', encoding="utf-8-sig") as f:
		json.dump(result_list, f, ensure_ascii=False, indent=4)

generate_random_data(100)
