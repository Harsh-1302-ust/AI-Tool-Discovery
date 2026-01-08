class Review:
    def __init__(self, tool_id, user_email, rating, comment):
        self.tool_id = tool_id
        self.user_email = user_email
        self.rating = rating
        self.comment = comment
        self.status = "PENDING"
