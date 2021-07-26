# discordbattlebots

#Bot setup

The ref bot is startes with a `!bb init` command.

In response it expects a `!bb @<user>`

the ref bot will then tag the battle bot with a `@<user> init`

In response the ref bot expects a stringified JSON object containing the battle bots stats

Example stats object
`{ "name": string, "atk": int, "def": int, "spd": int, "atkList": [ { "name": string, "dmg": int, "cooldown": int } ], //more to come as the bot gets more intelligent }`
