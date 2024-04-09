from rest_framework import serializers
from base.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']  # Update as needed

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    images = ImageSerializer(source='images.all', many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['user', 'products']