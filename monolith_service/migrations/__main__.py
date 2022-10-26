async def migrate():
    from . import down, up, LATEST, ZERO
    import os
    import sys

    db_url = "postgres://yksrwiukjqttgc:5c65f27606bc06f1b77ebd4f13f449afa673dc8c76eeae9b7621830eff0b5c7c@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d7jhu5uh9l43d8"

    if len(sys.argv) < 2:
        print("Command: up|down [amount]")
        exit(1)
    direction = sys.argv[1]
    amount = sys.argv[2] if len(sys.argv) > 2 else None
    if direction == "up":
        if amount is None:
            amount = LATEST
        else:
            try:
                amount = int(amount)
            except ValueError:
                print(f"Unknown amount {amount}")
        await up(db_url, to=amount)
    elif direction == "down":
        if amount is None:
            amount = 1
        elif amount == "zero":
            amount = ZERO
        else:
            try:
                amount = int(amount)
            except ValueError:
                print(f"Unknown amount {amount}")
        await down(db_url, to=amount)


if __name__ == "__main__":
    from asyncio import run

    run(migrate())
