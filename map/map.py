from flask import Flask, render_template
import folium

app = Flask(__name__)

@app.route('/')
def index():
    # Criar um mapa usando Folium
    my_map = folium.Map(location=[-23.550520, -46.633308], zoom_start=12)

    # Adicionar um marcador para a localização da câmera
    camera_location = [-23.550520, -46.633308]
    folium.Marker(location=camera_location, popup='Câmera aqui').add_to(my_map)

    # Salvar o mapa gerado como um arquivo HTML
    my_map.save('templates/mapa.html')

    # Renderizar o modelo HTML que contém o mapa
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
