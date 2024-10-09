$(document).ready(function () {
    let currentPage = 1;
  
    getStarWarsCharacters(currentPage);
  
    // Al hacer clic en el botón de cargar más, aumenta la página y carga más personajes
    $(document).on("click", "#btn-get-data", function () {
      currentPage++;
      getStarWarsCharacters(currentPage);
    });
  
    // Función para obtener la lista de personajes de Star Wars
    function getStarWarsCharacters(page) {
      $("#data-content").append('<div id="loading" class="text-center my-3"><img src="../IMG/carga.gif" style="width: 50px;" /></div>'); // Imagen de carga pequeña
  
      $.ajax({
        url: `https://swapi.dev/api/people/?page=${page}`, // Cambia la página dinámica
        method: "GET",
      }).done(function (resp) {
        setTimeout(function () {
          // Elimina el GIF de carga
          $("#loading").remove();
  
          var charactersList = resp.results; // Lista de personajes
  
          // Itera sobre los personajes y genera el HTML para cada uno
          charactersList.forEach(function (character) {
            var characterId = character.url.split("/")[5]; // Extrae el ID del personaje desde la URL
            var template = `
              <div class="col-md-4 mb-4">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Altura: ${character.height} cm, Peso: ${character.mass} kg</p>
                    <a href="detail.html?pid=${characterId}" class="btn btn-dark">Ver detalles</a>
                  </div>
                </div>
              </div>
            `;
            // Añade el contenido de cada personaje al contenedor principal
            $("#data-content").append(template);
          });
  
          // Mostrar el botón de cargar más después de las tarjetas
          $("#btn-get-data").removeClass("d-none");
  
        }, 1000);
      }).fail(function () {
        $("#loading").remove();
        $("#data-content").append("<p>Error al cargar los personajes. Inténtalo de nuevo más tarde.</p>");
      });
    }
  });