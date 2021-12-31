from django.views.generic import View
from django.shortcuts import render
import markdown
from pathlib import Path

class HomeView(View):
    
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return render(request, "index.html", context=context)

    def get_context_data(self, **kwargs):
        context = {}
        context["content"] = self.get_markdown_html()
        return context
    
    def get_project_readme_markdown(self):
        BASE_DIR = Path(__file__).resolve().parent.parent.parent
        readme_file = f"{BASE_DIR}/README.md"
        return readme_file
    
    def get_markdown_html(self):
        config = {
            'extra': {
                'footnotes': {
                    'UNIQUE_IDS': True
                },
                'fenced_code': {
                    'lang_prefix': 'lang-'
                }
            },
            'toc': {
                'permalink': True
            }
        }
        
        md = markdown.Markdown(extensions=['extra', 'toc'], extension_configs=config)
        
        project_readme_file = self.get_project_readme_markdown()
        
        html_data = None
        
        # Read readme file
        with open(project_readme_file, 'r') as readme_file:
            text = readme_file.read()
            html_data = md.convert(text)
            
        return html_data
