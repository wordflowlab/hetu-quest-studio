export const config = {
  "fields": {
    "evidence": "evidence",
    "variable": "variables",
    "step": "steps",
    "transition": "transitions",
    "route": "routes",
    "playthrough": "playthroughs",
    "note": "notes"
  },
  "defaults": {
    "brief": "",
    "evidence": [],
    "variables": [],
    "steps": [],
    "transitions": [],
    "routes": [],
    "playthroughs": [],
    "notes": []
  },
  "tabs": [
    "任务阅读",
    "状态与条件",
    "路线与试玩",
    "意见与复核",
    "任务交付"
  ]
} as const;
