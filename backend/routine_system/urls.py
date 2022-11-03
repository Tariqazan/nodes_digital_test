
from django.urls import path
from .views import PeriodView, RoutineView


urlpatterns = [
    path("routine/", RoutineView.as_view()),
    path("period/<int:pk>/", PeriodView.as_view())
]
