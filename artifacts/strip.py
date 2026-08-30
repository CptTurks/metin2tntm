import re, sys, os

for fn in ['anasayfa.html','profil.html','server_ekle_genel.html','sunucu_ekle.html','sunucu_tanitim.html']:
    with open(fn, encoding='utf-8', errors='ignore') as f:
        html = f.read()
    # Remove base64 data URIs
    html = re.sub(r'data:image/[^"\')]+', 'IMG', html)
    # Remove long base64 blobs
    html = re.sub(r'[A-Za-z0-9+/]{200,}={0,2}', 'B64', html)
    out = 'stripped_' + fn
    with open(out, 'w', encoding='utf-8') as f:
        f.write(html)
    print(out, len(html))
