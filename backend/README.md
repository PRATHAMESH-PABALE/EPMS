# Backend Setup

1. (optional) create virtualenv:
   python -m venv venv
   source venv/bin/activate   # linux/mac
   venv\Scripts\activate      # windows

2. pip install -r requirements.txt

3. export FLASK_APP=app.py

4. Initialize DB (first time):
   flask db init
   flask db migrate -m "initial"
   flask db upgrade

   (Alternatively: run python shell to create tables)

5. Create an admin via register endpoint:
   POST /api/auth/register
   { "username":"admin", "password":"adminpass", "role":"admin" }

6. Start:
   python app.py
