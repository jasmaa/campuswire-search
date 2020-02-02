import requests
import json
import os
from dotenv import load_dotenv
from fuzzywuzzy import fuzz

load_dotenv()
token = os.getenv("TOKEN")

res = requests.get(
    "https://api.campuswire.com/v1/group/7a7f923e-1605-48a2-bc90-71b5b7d6579d/posts",
    params={
        "number": 20
    },
    headers={
        "Authorization": f"Bearer {token}"
    },
)

keywords = "piazza".lower()
content = json.loads(res.text)
for post in content:
    if fuzz.partial_ratio(keywords, post["title"].lower()) > 50 or \
       fuzz.partial_ratio(keywords, post["body"].lower()) > 50:
        print(post["title"])
