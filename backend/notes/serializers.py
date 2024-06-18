from rest_framework import serializers
from notes.models import Note

class NoteSerializer(serializers.ModelSerializer): #serializes the note model
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {"author": {"read_only": True}} 