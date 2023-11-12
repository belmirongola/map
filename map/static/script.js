var saoPauloBounds = L.latLngBounds([-24.008620, -46.587280], [-23.356400, -46.365380]);
var saoPauloCenter = saoPauloBounds.getCenter();

var map = L.map('map', {
    maxBounds: saoPauloBounds,
    maxBoundsViscosity: 0.9
}).setView(saoPauloCenter, 12);

// Use a camada Mapbox Dark para um estilo mais escuro
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiYmVsbWlyb25nb2xhIiwiYSI6ImNsb3ZyamhxdDEwODYybGxsNHViZHU3NGUifQ.GB3bgH5i8j9cnLVzZIiUiQ', {
    attribution: '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> contributors',
    maxZoom: 18,
    id: 'mapbox/dark-v10',  // Estilo Mapbox Dark
    accessToken: 'sk.eyJ1IjoiYmVsbWlyb25nb2xhIiwiYSI6ImNsb3ZyamhxdDEwODYybGxsNHViZHU3NGUifQ.GB3bgH5i8j9cnLVzZIiUiQ'
}).addTo(map);

// Adicionar uma polilinha representando uma rodovia
var highwayCoordinates = [
    [-23.550520, -46.633308],  // Início da rodovia (exemplo)
    [-23.555000, -46.640000],  // Pontos intermediários (adicionar conforme necessário)
    [-23.560000, -46.650000]   // Fim da rodovia (exemplo)
];

var highwayPolyline = L.polyline(highwayCoordinates, { color: 'blue' }).addTo(map);

/// Função para criar marcadores com popup de vídeo
function createVideoMarker(position, videoURL) {
    var marker = L.marker(position).addTo(map);

    var videoPopupContent = '<div class="popup-content">' +
                            '<video class="popup-video" controls autoplay>' +
                            '<source src="' + videoURL + '" type="video/mp4">' +
                            'Seu navegador não suporta o elemento de vídeo.' +
                            '</video>' +
                            '<div class="popup-info">Informações sobre o vídeo</div>' +
                            '<a href="#" class="popup-expand-btn">Ampliar</a></div>';
    
    marker.bindPopup(videoPopupContent, {
        maxWidth: 400,
        minWidth: 300,
        maxHeight: 400  // Ajuste a altura máxima conforme necessário
    });

    marker.on('click', function () {
        marker.openPopup();
    });

    // Adicionar evento de clique ao botão de "Ampliar"
    marker.on('popupopen', function () {
        var expandBtn = document.querySelector('.popup-expand-btn');
        expandBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // Abra a janela/modal com o vídeo em tamanho maior
            openFullscreenVideo(videoURL);
        });
    });
}

// Função para abrir o vídeo em tela cheia
function openFullscreenVideo(videoURL) {
    // Implemente a lógica para abrir o vídeo em tela cheia, como abrir uma nova janela ou modal
    // Aqui você pode usar bibliotecas ou implementar sua própria lógica, dependendo do ambiente do seu aplicativo web.
    // Por exemplo, você pode usar o modal do Bootstrap ou outra biblioteca de modais.
    // Exemplo com modal do Bootstrap:
    // $('#fullscreenVideoModal').modal('show');
}


// Adicionar marcador ao centro de São Paulo
createVideoMarker(saoPauloCenter, 'https://youtu.be/gwYIwyIebqg');

// Adicionar mais 3 marcadores próximos
var nearbyMarkers = [
    { lat: saoPauloCenter.lat + 0.01, lng: saoPauloCenter.lng + 0.01 },
    { lat: saoPauloCenter.lat - 0.01, lng: saoPauloCenter.lng - 0.01 },
    { lat: saoPauloCenter.lat + 0.005, lng: saoPauloCenter.lng - 0.005 }
];

nearbyMarkers.forEach(function (position) {
    createVideoMarker(position, 'https://youtu.be/gwYIwyIebqg'); // Substitua pela URL do vídeo desejado
});