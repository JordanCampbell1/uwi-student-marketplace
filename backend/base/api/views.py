from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.contrib.auth import get_user_model
from base.models import *
import os
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
def upload_image(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        project_id = request.POST.get('project_id')
        print(project_id)
        if image:
            # Construct the filename using the project ID
            filename = f"{project_id}.jpg"

            # Determine the folder path
            folder_path = os.path.join(settings.MEDIA_ROOT, f"project_{project_id}")

            # Check if the folder exists and delete it if it does
            if os.path.exists(folder_path):
                for file in os.listdir(folder_path):
                    file_path = os.path.join(folder_path, file)
                    os.remove(file_path)
                os.rmdir(folder_path)

            # Save the new image with the specified filename
            new_image = Image(image=image, project_id=project_id, name=filename)
            new_image.save()

            # Update project with image ID
            try:
                project = Project.objects.get(id=project_id)
                project.image_id = new_image.id
                project.save()
                return JsonResponse({'image_id': new_image.id, 'message': 'Image uploaded successfully'})
            except Project.DoesNotExist:
                return JsonResponse({'error': 'Project not found'}, status=404)
        else:
            return JsonResponse({'error': 'No image found in request'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)