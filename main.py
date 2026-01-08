from fastapi import FastAPI
from routers import auth_router, tool_router, review_router, admin_router

app = FastAPI(title="AI Tool Discovery Platform")

app.include_router(auth_router.router)
app.include_router(tool_router.router)
app.include_router(review_router.router)
app.include_router(admin_router.router)
