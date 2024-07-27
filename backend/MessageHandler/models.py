from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class UserMessages(models.Model):
    message = models.CharField(max_length=1000)
    user = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    # One to many relationship with User
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user + " - " + self.message

class ModelMessages(models.Model):
    message = models.CharField(max_length=1000)
    date = models.DateTimeField(auto_now_add=True)
    # One to one relationship with UserMessages
    user_message = models.OneToOneField(UserMessages, on_delete=models.CASCADE)
    def __str__(self):
        return self.user + " - " + self.message