from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from decimal import Decimal
# Custom User Manager
class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Password is not provided')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.id, filename)
# User Model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    studentID = models.CharField(max_length=100, unique=True, null=True, blank=True)
    profile_image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    isVerified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

# Product Model
class Product(models.Model):
    owner = models.ForeignKey(User, related_name='owned_products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True)
    condition = models.CharField(max_length=255)
    dateListed = models.DateTimeField(auto_now_add=True)

    def get_image_urls(self):
        return [image.image.url for image in self.images.all()]

def get_image_path(instance, filename):
    # This function will generate an upload path specific to the product
    return f'products/{instance.product.id}/{filename}'

class Image(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to=get_image_path)



# Transaction Model
class Transaction(models.Model):
    buyer = models.ForeignKey(User, related_name='purchases', on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(User, related_name='sales', on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    transactionDate = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField()

# Review Model
class Review(models.Model):
    author = models.ForeignKey(User, related_name='written_reviews', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    datePosted = models.DateTimeField(auto_now_add=True)

# Cart Model
class Cart(models.Model):
    user = models.OneToOneField(User, related_name='cart', on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, related_name='carts')
