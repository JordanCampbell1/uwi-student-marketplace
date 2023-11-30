from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import *
# Register your models here.
user=get_user_model()
admin.site.register(user)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(Image)
