# discordbattlebots

#Bot setup

The ref bot is startes with a `!bb init` command.

In response it expects a `!bb @<user>`

the ref bot will then tag the battle bot with a `@<user> init`

In response the ref bot expects a stringified JSON object containing the battle bots stats

Example stats object

```
{
  "name": string,
  "atk": int,
  "def": int,
  "spd": int,
  "hp": int,
  "atkList": [
    {
      "name": string,
      "dmg": int,
      "cooldown": int,
      "range": int,
      "accuracy": int
    }
  ],
  //more to come as the bot gets more intelligent
}
```

Once both players are initialized, the ref bot will request an attack in the form of `@<user> attack`

it expects a response of `!bb atk <index of attack> [attack name]`

For now, that is the entire game loop, though I will expand this further with time. This allows you to build your bot with whatever attacks and decision making processes you desire, for now.
