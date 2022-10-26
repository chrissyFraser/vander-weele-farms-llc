async def migrate():
    from . import down, up, LATEST, ZERO
    import os
    import sys

    db_url = "postgres://eefjcgxoynhbbx:c7ea00732bcdd946470a427b8929fca8e08f9b0fdaa9e9e449821e1be0312880@ec2-44-210-228-110.compute-1.amazonaws.com:5432/dam2uj9rihqll4"

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
