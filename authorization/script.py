import re, os

version = ''
with open('build.gradle', 'r') as f:
    if l := re.findall('version.*=.*', f.read() ):
        version = l[0].split('=')[1]
     
with open(os.getenv('GITHUB_OUTPUT'), 'a') as out:
    out.write(f'VERSION={version}')