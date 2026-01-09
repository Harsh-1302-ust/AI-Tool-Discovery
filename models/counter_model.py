from core.database import counter_collection

def get_next_id(name: str):
    counter = counter_collection.find_one_and_update(
        {"_id": name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True
    )
    return counter["seq"]
