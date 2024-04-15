from django.urls import path
# from .views import *
from . import views
from .views import MyTokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from django.conf import settings
# from .views import UserAPICallCountView



urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register_user),
    path('listproduct/', views.upload_product),
    path('products/',views.list_products),
    path('add-to-cart/', views.add_to_cart),
    path('cart/', views.get_user_cart),
    path('search-products/', views.search_products),
    path('user-info/', views.get_user_info),
    path('update-user/', views.update_user),
    path('delete-account/', views.delete_account),
    path('my-products/', views.get_user_products),
    path('edit-product/<int:product_id>/', views.edit_product, name='edit-product'),

   
   

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)