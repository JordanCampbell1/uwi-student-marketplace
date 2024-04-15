from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.contrib.auth import get_user_model
from base.models import *
from django.core.exceptions import ValidationError
from .serializers import *
import os
import re
from django.shortcuts import get_object_or_404
from django.db.models import Q



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        #encrypts user data in token from database
        token['email'] = user.email
        token['first_name']=user.first_name
        token['last_name']=user.last_name
       
        
        # ...

        return token

#extends serializer class
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            studentID = data.get('studentID')
            password = data.get('password')

            # Validate input
            if not all([email, first_name, last_name, password]):
                raise ValidationError('Missing required fields')

            # Create user
            User = get_user_model()
            user = User.objects.create_user(
                email=email, 
                password=password, 
                first_name=first_name, 
                last_name=last_name, 
                studentID=studentID
            )

            return JsonResponse({'message': 'User created successfully'}, status=201)

        except ValidationError as e:
            return JsonResponse({'error': str(e)}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_product(request):
    if request.method == 'POST':
        try:
            title = request.POST.get('title')
            category_name = request.POST.get('type')
            description = request.POST.get('description')
            price_string = request.POST.get('price')

            # Remove currency symbols and commas
            cleaned_price = re.sub(r'[^\d.]', '', price_string)
            price = Decimal(cleaned_price)

            images = request.FILES.getlist('images')

            # Fetch or create the Category instance
            category, created = Category.objects.get_or_create(name=category_name)

            # Create Product instance
            product = Product(name=title, category=category, description=description, price=price, owner=request.user)
            product.save()

            # Save images
            for image in images:
                Image.objects.create(product=product, image=image)

            return JsonResponse({'status': 'success', 'message': 'Product uploaded successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@api_view(['GET'])
def list_products(request):
    if request.method == 'GET':
        # Exclude products where the logged-in user is the owner
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')

    if not product_id:
        return JsonResponse({'error': 'Product ID is required'}, status=400)

    product = get_object_or_404(Product, id=product_id)

    # Get or create a cart for the user
    cart, created = Cart.objects.get_or_create(user=user)

    # Add the product to the cart
    cart.products.add(product)

    return JsonResponse({'message': 'Product added to cart'}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cart(request):
    user = request.user
    cart, created = Cart.objects.get_or_create(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['GET'])
def search_products(request):
    query = request.GET.get('query', '')
    products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    user_data = {
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'studentID': user.studentID,
        # Assuming the User model has a method to get the profile image URL
        'profile_image': request.build_absolute_uri(user.profile_image.url) if user.profile_image else None,
    }
    return Response(user_data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data

    # Update user fields
    user.first_name = data.get('firstName', user.first_name)
    user.last_name = data.get('lastName', user.last_name)
    user.email = data.get('email', user.email)
    user.studentID = data.get('studentID', user.studentID)
    # Handle other fields if necessary

    user.save()
    return Response({'message': 'User updated successfully'})

# Don't forget to add the URL pattern in urls.py

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    try:
        user.delete()
        return JsonResponse({'message': 'Account deleted successfully'}, status=200)
    except:
        return JsonResponse({'error': 'Error deleting account'}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_products(request):
    if request.method == 'GET':
        # Get products owned by the logged-in user
        products = Product.objects.filter(owner=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def edit_product(request, product_id):
    user = request.user

    # Get the product to be edited
    product = get_object_or_404(Product, id=product_id, owner=user)

    if request.method == 'GET':
        # Display the form for editing the product
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Handle the form submission to update the product
        try:
            title = request.data.get('title')
            category_name = request.data.get('type')
            description = request.data.get('description')
            price_string = request.data.get('price')

            # Remove currency symbols and commas
            cleaned_price = re.sub(r'[^\d.]', '', price_string)
            price = Decimal(cleaned_price)

            # Update product details
            product.name = title
            product.description = description
            product.price = price

            # Update category (assuming category name is changed)
            category, created = Category.objects.get_or_create(name=category_name)
            product.category = category

            product.save()

            return JsonResponse({'status': 'success', 'message': 'Product updated successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)