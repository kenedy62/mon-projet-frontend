
    <template>
        <v-app>
        <div class='gestion'>
            <v-responsive class="rounded">
                <AppbarView></AppbarView>
                <MenueView></MenueView>
        <v-main>
          <v-container class="py-8">
            <v-row align="center" class="mb-6">
          <div>
          <h1  class="text-h4 font-weight-black text-grey-darken-3 mb-1">Tableau de bord</h1>
          <p class="text-body-2 text-medium-emphasis">Vue d'ensemble du site</p>
          </div>
            </v-row>
                 <v-row justify="center" class="ma-0">
    <!-- Une seule boucle v-for propre gère les 4 cartes dynamiquement -->
    <v-col cols="12" sm="6" md="3" lg="3" v-for="stat in statsCards" :key="stat.title">
      <v-card border flat height="130" class="pa-2 rounded-lg elevation-1">
        <v-row no-gutters class="fill-height align-center">
          
          <!-- Colonne Gauche : Textes et Chiffres -->
          <v-col cols="8" class="d-flex flex-column justify-center">
            <div class="text-grey text-subtitle-2 font-weight-medium mb-1">{{ stat.title }}</div>
            <div class="text-h4 font-weight-black text-grey-darken-3 mb-1">{{ stat.value }}</div>
            <div class="text-caption font-weight-bold" :class="stat.percentage >= 0 ? 'text-green' : 'text-red'">
              {{ stat.percentage >= 0 ? '+' : '' }}{{ stat.percentage }}% ce mois
            </div>
          </v-col>

          <!-- Colonne Droite : Icône et Couleur de fond -->
          <v-col cols="4" class="d-flex justify-end align-center">
            <v-sheet rounded="lg" class="d-flex align-center justify-center" :color="stat.color" height="48" width="48">
              <v-icon size="large" color="white">{{ stat.icon }}</v-icon>
            </v-sheet>
          </v-col>

        </v-row>
      </v-card>
    </v-col>
  </v-row>
            </v-container>
            <v-container class="pa-0 mt-6">
  <v-row justify="center">
    
    <!-- PANNEAU 1 : ACTIVITÉ RÉCENTE -->
    <v-col cols="12" md="6">
      <v-card border flat class="rounded-xl">
        <v-card-text class="bg-green-lighten-5 pa-4">
          <h3 class="text-h5 font-weight-bold mb-4 text-grey-darken-3">
            Activité récente
          </h3>
          
          <v-alert v-if="recentComments.length === 0" type="info" variant="tonal" class="rounded-lg">
            Aucun commentaire récent à afficher.
          </v-alert>

          <!-- Boucle sur les vrais commentaires reçus -->
          <v-sheet 
  v-for="comment in recentComments" 
  :key="comment._id" 
  class="ma-2 pa-3 rounded-lg border d-flex flex-column"
>
  <v-row no-gutters align="center" class="mb-1">
    <v-icon color="orange-darken-4" size="x-small" class="me-2">
      mdi-checkbox-blank-circle
    </v-icon>
    <div class="text-body-1">
      Avis de <strong>{{ comment.author }}</strong> sur 
      <span class="text-orange-darken-4 font-weight-bold">
        <!-- 💡 Double fallback check: reads populated object title, else raw data -->
        {{ comment.productId?.nom || comment.nom || 'Produit Chargé' }}
      </span>
    </div>
  </v-row>
  <div class="text-body-2 text-medium-emphasis ms-5 italic">"{{ comment.text }}"</div>
  <div class="font-weight-light text-grey text-caption ms-5 mt-1">
    {{ formatTime(comment.createdAt) }}
  </div>
</v-sheet>

        </v-card-text>
      </v-card>
    </v-col>

    <!-- PANNEAU 2 : PRODUITS POPULAIRES -->
    <v-col cols="12" md="6">
      <v-card border flat class="rounded-xl">
        <v-card-text class="bg-green-lighten-5 pa-4">
          <h3 class="text-h5 font-weight-bold mb-4 text-grey-darken-3">
            Produits populaires
          </h3>

          <v-alert v-if="popularProducts.length === 0" type="info" variant="tonal" class="rounded-lg">
            Aucun produit enregistré.
          </v-alert>

          <!-- Boucle sur les vrais produits populaires -->
          <v-sheet 
            v-for="product in popularProducts" 
            :key="product._id" 
            class="ma-2 pa-3 rounded-lg border d-flex flex-column"
          >
            <v-row no-gutters align="center">
              <div class="text-body-1 font-weight-bold text-grey-darken-3">
                {{ product.nom }} <span class="text-caption text-grey font-weight-regular">({{ product.titre }})</span>
              </div> 
              <v-spacer></v-spacer>
              <!-- Affichage visuel de la note -->
              <div class="d-flex align-center">
                <v-icon color="amber" size="small" class="me-1">mdi-star</v-icon>
                <span class="text-amber font-weight-bold text-body-1">{{ product.rating || 4.5 }}</span>
                <span class="text-grey text-caption ms-1">({{ product.commentCount || 0 }} avis)</span>
              </div>
            </v-row>
            <div class="font-weight-light text-grey text-caption mt-1">
              Prix : {{ product.price }} CFA
            </div>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</v-container>
        </v-main>
    </v-responsive>
        </div>
        </v-app>
    </template>
    <script setup>
import { ref, computed, onMounted } from 'vue';
//import axios from 'axios';

// Stockage brut des statistiques provenant du backend
// Vos variables de statistiques existantes...
const apiStats = ref({
  products: { total: 0, percentage: 0 },
  comments: { total: 0, percentage: 0 },
  views: { total: 0, percentage: 0 },
  visitors: { total: 0, percentage: 0 }
});

// 💡 NOUVEAU : Variables pour l'activité récente et les produits populaires
const recentComments = ref([]);
const popularProducts = ref([]);

// Fonction utilitaire pour formater joliment le temps écoulé (ex: "Il y a 2 heures", "Le 14/05/2026")
const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};


// Propriété calculée pour mapper les données brutes de l'API vers le design des cartes Vuetify
const statsCards = computed(() => [
  { 
    title: 'Produits', 
    value: apiStats.value.products.total, 
    percentage: apiStats.value.products.percentage, 
    icon: 'mdi-package-variant-closed', 
    color: 'orange-darken-4' 
  },
  { 
    title: 'Commentaires', 
    value: apiStats.value.comments.total, 
    percentage: apiStats.value.comments.percentage, 
    icon: 'mdi-message-outline', 
    color: 'blue-darken-3' 
  },
  { 
    title: 'Vues Totales', 
    value: apiStats.value.views.total, 
    percentage: apiStats.value.views.percentage, 
    icon: 'mdi-trending-up', 
    color: 'green' 
  },
  { 
    title: 'Visiteurs', 
    value: apiStats.value.visitors.total, 
    percentage: apiStats.value.visitors.percentage, 
    icon: 'mdi-account-multiple-outline', 
    color: 'purple' 
  }
]);

// Appel API global du Dashboard
const fetchDashboardStats = () => {
  // L'URL propre sans le double mot dashboard 🎯
  produitService.getDashboardStats()
  //axios.get('http://localhost:3000/api/dashboard/stats')
    .then(response => {
      // 1. Stockage des compteurs card
      apiStats.value = response.data;
      
      // 2. Stockage des nouvelles listes d'activité
      recentComments.value = response.data.recentComments || [];
      popularProducts.value = response.data.popularProducts || [];

    })
    .catch(error => console.error("Erreur de tableau de bord :", error));
};

onMounted(() => {
  fetchDashboardStats();
});



    </script>
    <script>
    import AppbarView from '@/components/AppbarView.vue';
    import MenueView from '@/components/MenueView.vue';
import { produitService } from '@/_services';
    export default {
        name:'GestionView',
        components: {
            AppbarView,
            MenueView
        }
    }
    </script>