from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from custom_admin.admin import custom_admin_site  # Import your custom admin site

urlpatterns = [
    path("admin/", custom_admin_site.urls),  # Use the custom admin
    path("api/", include("accounts.urls")),
    path("api/", include("support_agent.urls")),
]

# ✅ Serve media files only in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Custom error handlers
handler404 = "utils.error_views.handler404"
handler500 = "utils.error_views.handler500"
