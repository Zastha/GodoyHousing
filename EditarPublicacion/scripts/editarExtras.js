document.addEventListener("DOMContentLoaded", () => {
    const openFeaturesButton = document.getElementById("open-features-popup");
    const featuresPopup = document.getElementById("features-popup");
    const closeFeaturesButton = document.getElementById("close-features-popup");
    const saveFeaturesButton = document.getElementById("save-features");
    const featureItems = document.querySelectorAll(".feature-item");
    const extraSection = document.querySelector(".extra-section");
  
    // Abrir el popup
    openFeaturesButton.addEventListener("click", () => {
      featuresPopup.style.display = "flex";
    });
  
    // Cerrar el popup
    closeFeaturesButton.addEventListener("click", () => {
      featuresPopup.style.display = "none";
    });
  
    // Alternar selección de características
    featureItems.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("selected");
      });
    });
  
    // Guardar características seleccionadas
    saveFeaturesButton.addEventListener("click", () => {
      const selectedFeatures = Array.from(
        document.querySelectorAll(".feature-item.selected")
      ).map((item) => ({
        key: item.getAttribute("data-key"),
        name: item.querySelector(".feature-name").textContent,
        icon: item.querySelector("img").src,
      }));
  
      // Actualizar la sección "¿Qué más quisieras destacar?" con las seleccionadas
      const featuresList = document.createElement("div");
      featuresList.className = "selected-features-list";
      selectedFeatures.forEach((feature) => {
        const featureDiv = document.createElement("div");
        featureDiv.className = "feature-item selected-display";
        featureDiv.innerHTML = `
          <img src="${feature.icon}" alt="${feature.name}">
          <span class="feature-name">${feature.name}</span>
        `;
        featuresList.appendChild(featureDiv);
      });
  
      // Reemplazar contenido de la sección
      const existingList = extraSection.querySelector(".selected-features-list");
      if (existingList) {
        extraSection.replaceChild(featuresList, existingList);
      } else {
        extraSection.appendChild(featuresList);
      }
  
      featuresPopup.style.display = "none"; // Cerrar el popup
    });
  });
  