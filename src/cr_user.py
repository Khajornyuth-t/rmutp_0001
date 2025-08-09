import asyncio
import json
from prisma import Prisma

async def create_user():
    # Connect to the Prisma database
    db = Prisma()
    await db.connect()

    # Load test users from JSON file
    with open('src/test_users.json', 'r') as file:
        data = json.load(file)

    for user in data['users']:
        try:
            created_user = await db.user.create(
                data={
                    'username': user['username'],
                    'password': user['password'],
                    'mobile': user['mobile'],
                    'cardId': user['cardId']
                }
            )
            print(f"User created: {created_user.username}")
        except Exception as e:
            print(f"Error creating user {user['username']}: {e}")

    await db.disconnect()
if __name__ == "__main__":
    asyncio.run(create_user())

# This script connects to the Prisma database and creates users based on the data in test_users.json.

