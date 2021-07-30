# discordbattlebots

This bot is meant to provide a structure to the battle bots games. It can handle storing and updating game state, as well as requesting attacks fron each of the battling bots. For now this system is very simple, but I intend to increase the complexity of what the bot is capable of over time.

If you have any questions, or want to reach out for anyi reason, please do!

#Bot setup

This link will allow you to add the ref bot to your own server:
https://discord.com/api/oauth2/authorize?client_id=868980631156187156&permissions=259846040640&scope=bot

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
