# Message Handler Backend

This handler is used to store the messages of the user in the database as well as the responses. It also handles the logic of the chatbot.

## Running

1. Make sure you have a Django installed in your system. If not, install it using the following command:
```bash
pip install django
```

2. Migrate the database using the following command:
```bash
python manage.py makemigrations MessageHandler
```

3. Migrate in the SQL database using the following command:
```bash
python manage.py sqlmigrate MessageHandler 0001
```

4. Complete the migration using the following command:
```bash
python manage.py migrate
```

5. Run the server using the following command:
```bash
python manage.py runserver
```

6. Open the browser and go to the link specified in the terminal.


### Admin Panel (Optional)

1. Create a superuser using the following command:
```bash
python manage.py createsuperuser
```

2. Enter the username, email, and password as prompted.

3. Go to the link specified in the terminal and login using the credentials you entered.


## Running the Model

Make sure that everything you do uses WSL2. Unfortunately the xformers uses linux things and it is not compatible with Windows especially that Unsloth uses it. (you can use xformers in windows but if it's integrated with Unsloth, it will not work)

1. Ensure that you have WSL and has GPU that supports CUDA
2. Instsall CUDA for WSL
3. Install NVCC for Ubuntu
4. Install Anaconda
5. Follow the commands from the Unsloth repository using conda: https://github.com/unslothai/unsloth
6. There can be several problems along the way....Goodluck!!
    * you can try to use this as a reference: https://github.com/unslothai/unsloth/issues/73