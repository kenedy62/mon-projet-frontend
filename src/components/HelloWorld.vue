<template>
  
  <v-footer class="d-flex flex-column align-center justify-center" density="comfortable" color="#020635">
  <v-container class="align-center justify-center" density="comfortable" fluid>
    <v-row class="align-center justify-center" density="comfortable">
      
      <!-- Colonne 1 : Description -->
      <v-col cols="12" md="4"> 
        <v-card color="#020635" flat>
          <v-card-text>
            <p class="text-h5 text-white font-weight-bold">Chermical promotion SSD<br></p>
            <!-- 💡 Correction : "class" au lieu de "calss" -->
            <div class="text-subtitle-1 ms-1 mt-2">
              <p class="text-grey-lighten-1">Des cosmétiques d'exception pour révéler votre beauté naturelle</p>
            </div>
          </v-card-text>
        </v-card> 
      </v-col> 

      <!-- Colonne 2 : Catégories de produits -->
      <v-col cols="12" md="4">
        <v-card color="#020635" class="ma-4" flat>
          <v-card-text align="center"> 
            <p class="text-h5 text-white font-weight-bold">Produits<br></p>
            <v-sheet color="#020635" class="ma-2 text-grey-lighten-1">Sérums</v-sheet>
            <v-sheet color="#020635" class="ma-2 text-grey-lighten-1">Crèmes</v-sheet>
            <v-sheet color="#020635" class="ma-2 text-grey-lighten-1">Huiles</v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colonne 3 : Réseaux Sociaux et Contact Dynamique 🎯 -->
      <v-col cols="12" md="4">
        <v-card color="#020635" flat>
          <v-card-text align="center">
            <p class="text-h5 text-white font-weight-bold mb-3">Suivez-nous<br></p>
            
            <div class="d-flex justify-center align-center ga-3 mb-4">
              <!-- 💡 Bouton WhatsApp Dynamique -->
              <v-btn
                icon="mdi-whatsapp"
                color="green-lighten-1"
                variant="tonal"
                target="_blank"
                :href="`https://wa.me{adminWhatsApp}`"
                title="Discuter sur WhatsApp"
              ></v-btn>

              <!-- 💡 Bouton Facebook Dynamique -->
              <v-btn
                icon="mdi-facebook"
                color="blue-lighten-1"
                variant="tonal"
                target="_blank"
                :href="facebookUrl"
                title="Nous suivre sur Facebook"
              ></v-btn>
            </div>

            <!-- 💡 Affichage textuel du numéro WhatsApp récupéré de la BDD -->
            <div class="text-grey-lighten-1 text-body-2 mt-2">
              <v-icon size="small" color="green-lighten-1" class="me-2">mdi-phone</v-icon>
              <span>+{{ formatDisplayNumber(adminWhatsApp) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

  <v-divider class="my-2 bg-grey" thickness="2" width="50"></v-divider>
  
  <div class="text-grey-lighten-1 text-caption py-2">
    {{ new Date().getFullYear() }} — <strong>SSD. tous droits réservés</strong>
  </div>
</v-footer>

</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({
   
  }),
}
</script>
<script setup>
  import { ref, onMounted } from 'vue';
import axios from 'axios';

// 🎯 Variables réactives pour stocker les coordonnées de l'administrateur
const adminWhatsApp = ref("237600000000"); // Valeur du Cameroun par défaut en attendant l'API
const facebookUrl = ref("https://facebook.com"); // 👈 Modifiez avec votre vrai lien de page Facebook

// Fonction pour récupérer le numéro WhatsApp configuré en base de données
const fetchFooterSettings = () => {
  axios.get('http://localhost:3000/api/admin/settings')
    .then(response => {
      // 🎯 DIAGNOSTIC LOG: Right-click your browser, click Inspect -> Console to see this layout
      console.log("Raw Footer Payload Data From Backend:", response.data);

      if (response.data) {
        // Handle case where MongoDB returns data wrapped inside an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          adminWhatsApp.value = response.data[0].whatsappNumber;
          facebookUrl.value = response.data.facebookUrl || "https://facebook.com"; 
        } else {
          adminWhatsApp.value = response.data.whatsappNumber || "237600000000";
        }
        console.log("Successfully bound footer phone variable:", adminWhatsApp.value);
      }
    })
    .catch(error => {
      console.error("Impossible de charger les paramètres de contact du footer :", error);
    });
};


// Fonction utilitaire pour rendre le numéro joli à l'affichage (ex: 237 6xx xx xx xx)
const formatDisplayNumber = (numStr) => {
  // If the variable is null, undefined, or empty, return a default string placeholder instantly
  if (!numStr) return '237 600 000 000';
  
  // Enforces clean conversion to plain string text data types
 const cleanString = String(numStr).replace(/[\s+]/g, '');
  
  // Inserts a clean spacing separation after the 3-digit country code symbol mapping indicator
  return cleanString.replace(/^(\d{3})(\d+)/, '$1 $2');
};


onMounted(() => {
  fetchFooterSettings();
});

</script>
