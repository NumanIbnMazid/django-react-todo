from rest_framework.response import Response
from rest_framework import status
from django.http.response import Http404
from rest_framework.viewsets import ModelViewSet


class ResponseWrapper(Response):
    
    """[Custom Response Wrapper Extending Rest Framework's Response]

    Args:
        Response ([Response]): [Rest Framework's Response]
    """

    def __init__(self, data=None, error_code=None, template_name=None, headers=None, exception=False, content_type=None,
                 error_msg=None, msg=None, response_success=True, status=None, data_type=None):
        """
        Alters the init arguments slightly.
        For example, drop 'template_name', and instead use 'data'.

        Setting 'renderer' and 'media_type' will typically be deferred,
        For example being set automatically by the `APIView`.
        """
        status_by_default_for_gz = 200
        if error_code is None and status is not None:
            if status > 299 or status < 200:
                error_code = status
                response_success = False
            else:
                status_by_default_for_gz = status
        if error_code is not None:
            status_by_default_for_gz = error_code
            response_success = False

        # manipulate dynamic msg
        if msg:
            if msg.lower() == "list":
                msg = "List retrieved successfully!" if response_success else "Failed to retrieve the list!"
            elif msg.lower() == "create":
                msg = "Created successfully!" if response_success else "Failed to create!"
            elif msg.lower() == "update":
                msg = "Updated successfully!" if response_success else "Failed to update!"
            elif msg.lower() == "delete":
                msg = "Deleted successfully!" if response_success else "Failed to delete!"
            elif msg.lower() == "retrieve":
                msg = "Object retrieved successfully!" if response_success else "Failed to retrieve the object!"
            else:
                pass

        output_data = {
            "error": {"code": error_code, "error_details": error_msg},
            "data": data,
            "status": response_success,
            "status_code": error_code if not error_code == "" and not error_code == None else status_by_default_for_gz,
            "message": msg if msg else str(error_msg) if error_msg else "Success" if response_success else "Failed",
        }
        if data_type is not None:
            output_data["type"] = data_type

        super().__init__(data=output_data, status=status_by_default_for_gz,
                         template_name=template_name, headers=headers,
                         exception=exception, content_type=content_type)

class CustomModelViewSet(ModelViewSet):
    
    """[Custom Model View Set Extending Rest Framework's ModelViewSet]

    Args:
        ModelViewSet ([ModelViewSet]): [Rest Framework ModelViewSet]
    """
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return ResponseWrapper(data=serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return ResponseWrapper(data=serializer.data, status=status.HTTP_200_OK, msg="list")
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return ResponseWrapper(data=serializer.data, msg="retrieve")
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return ResponseWrapper(data=serializer.data, status=status.HTTP_200_OK, msg="update")
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return ResponseWrapper(status=status.HTTP_204_NO_CONTENT, msg="delete")