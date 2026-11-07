<template>
  <v-app>
    <div class="about">
      <!-- Barre de navigation réactive -->
      <v-app-bar color="white" flat scroll-target="#scrolling-techniques-7" class="border-b">
        <!-- Déclencheur Menu Mobile -->
        <v-app-bar-nav-icon 
          class="d-flex d-sm-none text-grey-darken-2" 
          @click="mobileDrawerVisible = !mobileDrawerVisible"
        ></v-app-bar-nav-icon>

        <!-- Titre du site -->
        <v-app-bar-title 
          class="text-h6 font-weight-black text-orange-darken-4 clickable ms-2 ms-sm-4" 
          @click="router.push('/')"
        >
          Chermical promotion SSD
        </v-app-bar-title>

        <!-- Liens Menu Ordinateur -->
        <div class="d-none d-sm-flex align-center fill-height">
          <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#produit')">Produits</v-btn>
          <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#avantage')">Avantages</v-btn>
          <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#ingredient')">Ingrédients</v-btn>
          <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#contact')">Contact</v-btn>
        </div>

        <v-spacer class="d-none d-sm-flex"></v-spacer>

        <!-- Icône de profil avec menu déroulant -->
        <div class="me-2 me-sm-4">
          <v-menu min-width="220px" rounded="lg" transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon 
                v-bind="props" 
                :color="isClientAuthenticated ? 'orange-darken-4' : 'grey-darken-1'"
                variant="tonal"
                size="small"
              >
                <v-icon size="small">mdi-account</v-icon>
              </v-btn>
            </template>

            <v-card class="pa-2 border" flat>
              <v-card-text class="pa-2">
                <!-- Utilisateur connecté -->
                <div v-if="isClientAuthenticated" class="text-center">
                  <v-avatar color="orange-darken-4" class="mb-2" size="40">
                    <span class="text-white text-h6">{{ clientEmail.charAt(0).toUpperCase() }}</span>
                  </v-avatar>
                  <p class="text-subtitle-2 font-weight-bold text-truncate mb-4" style="max-width: 180px;">
                    {{ clientEmail }}
                  </p>
                  <v-divider class="my-2"></v-divider>
                  <v-btn color="red-darken-1" variant="flat" block class="text-none font-weight-bold rounded-md" prepend-icon="mdi-logout" @click="handleLogout">
                    Déconnexion
                  </v-btn>
                </div>

                <!-- Utilisateur déconnecté -->
                <div v-else class="text-center py-2">
                  <p class="text-caption text-grey-darken-1 mb-3">Espace Client Privé</p>
                  <v-btn color="orange-darken-4" variant="flat" block class="text-none font-weight-bold rounded-md mb-2" prepend-icon="mdi-login" @click="loginDialogVisible = true">
                    Se connecter
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </v-app-bar>

      <!-- Tiroir de navigation mobile (Drawer) -->
      <v-navigation-drawer 
        v-model="mobileDrawerVisible" 
        location="left" 
        temporary 
        class="d-flex d-sm-none pa-2"
      >
        <v-list nav>
          <v-list-item class="mb-4">
            <div class="text-subtitle-1 font-weight-black text-orange-darken-4">Navigation Menu</div>
          </v-list-item>
          <v-list-item prepend-icon="mdi-package-variant-closed" title="Produits" link @click="handleMobileGoTo('#produit')"></v-list-item>
          <v-list-item prepend-icon="mdi-star-four-points-outline" title="Avantages" link @click="handleMobileGoTo('#avantage')"></v-list-item>
          <v-list-item prepend-icon="mdi-flower-tulip-outline" title="Ingrédients" link @click="handleMobileGoTo('#ingredient')"></v-list-item>
          <v-list-item prepend-icon="mdi-email-outline" title="Contact" link @click="handleMobileGoTo('#contact')"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Modale de connexion client (v-dialog) -->
      <v-dialog v-model="loginDialogVisible" max-width="450px" transition="dialog-bottom-transition">
        <v-card class="rounded-xl pa-4 border shadow-2">
          <v-card-title class="d-flex align-center px-2">
            <span class="text-h5 font-weight-bold text-orange-darken-4">Connexion Client</span>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" color="grey" @click="closeLoginModal"></v-btn>
          </v-card-title>
          <v-card-text class="px-2 pt-4">
            <v-form v-model="isLoginFormValid" @submit.prevent="handleModalLogin">
              <v-text-field v-model="loginPayload.email" label="Adresse e-mail" type="email" variant="outlined" density="comfortable" prepend-inner-icon="mdi-email-outline" :rules="[v => !!v || 'E-mail requis']" required class="mb-2"></v-text-field>
              <v-text-field v-model="loginPayload.password" label="Mot de passe" type="password" variant="outlined" density="comfortable" prepend-inner-icon="mdi-lock-outline" :rules="[v => !!v || 'Mot de passe requis']" required class="mb-6"></v-text-field>
              <v-btn type="submit" color="orange-darken-4" block size="large" :disabled="!isLoginFormValid" :loading="isLoginLoading" class="text-none font-weight-bold rounded-lg">
                Me connecter
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Bouton de retour au catalogue -->
      <v-container class="mt-16 pt-6 px-4">
        <v-btn variant="text" color="grey-darken-2" prepend-icon="mdi-arrow-left" class="text-none font-weight-bold" to="/">
          Retour aux produits
        </v-btn>
      </v-container>

      <!-- SECTION AFFICHAGE DU PRODUIT -->
      <div id="produit">
        <v-container class="py-8" v-if="produit">
          <v-row>
            <!-- Image du produit (Colonne Gauche) -->
            <v-col cols="12" md="6">
              <v-img
                :src="produit.imageUrl"
                alt="Image du produit"
                max-height="500"
                cover
                class="rounded-xl elevation-3 bg-grey-lighten-4"
              ></v-img>
            </v-col>

            <!-- Détails textuels (Colonne Droite) -->
            <v-col cols="12" md="6" class="d-flex flex-column">
              <v-card class="mx-auto w-100" flat>
                <v-card-text class="pa-0">
                  <span class="text-overline text-orange-darken-4 font-weight-bold">{{ produit.nom }}</span>
                  <h1 class="text-h3 font-weight-black my-2 text-grey-darken-3">{{ produit.titre }}</h1>
                  
                  <!-- Notes Étoiles -->
                  <v-row align="center" class="ma-0 mb-4" no-gutters>
                    <v-rating :model-value="produit.rating" color="amber" density="compact" half-increments readonly></v-rating>
                    <span class="text-body-2 text-grey-darken-1 ms-3">({{ produit.commentCount }} avis clients)</span>
                  </v-row>

                  <!-- Prix -->
                  <div class="text-h4 font-weight-black text-orange-darken-4 my-4">
                    {{ produit.price }} CFA
                  </div>

                  <v-divider class="my-4"></v-divider>

                  <!-- Description -->
                  <p class="text-body-1 text-grey-darken-2 mb-6" style="line-height: 1.6;">
                    {{ produit.description }}
                  </p>
                </v-card-text>
              </v-card>

              <!-- Tableaux d'ingrédients (Sécurisé et refermé) 🎯 -->
              <v-card class="pa-4 mb-4 rounded-xl" flat color="green-lighten-5" border v-if="ensureArray(produit.ingredient).length">
                <div class="text-subtitle-1 font-weight-bold text-green-darken-4 mb-2">
                  <v-icon class="me-2">mdi-leaf</v-icon>Ingrédients Clés
                </div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip v-for="(ing, i) in ensureArray(produit.ingredient)" :key="i" color="green-darken-3" variant="flat" size="small">
                    {{ ing }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Loader si les données ne sont pas encore prêtes -->
        <v-container class="py-12 text-center" v-else>
          <v-progress-circular indeterminate color="orange-darken-4" size="64"></v-progress-circular>
          <p class="text-body-1 text-grey mt-4">Chargement des détails du produit...</p>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 🎯 Alignement sur votre instance centrale d'API dynamique
import Axios from '@/_services/caller.service';

const route = useRoute();
const router = useRouter();

// États de l'affichage et de l'authentification client
const mobileDrawerVisible = ref(false);
const loginDialogVisible = ref(false);
const isLoginFormValid = ref(false);
const isLoginLoading = ref(false);
const isClientAuthenticated = ref(false);
const clientEmail = ref('');

const produit = ref(null);
const loginPayload = ref({ email: '', password: '' });

// Récupération sécurisée du produit par son ID via l'instance Axios majuscule
const fetchProduitDetails = () => {
  const productId = route.params.id;
  if (!productId) return;

  Axios.get(`/api/stuff/${productId}`)
    .then(response => {
      produit.value = response.data;
    })
    .catch(error => {
      console.error("Erreur lors de la récupération du produit star :", error);
    });
};

// Soumission du formulaire de connexion client
const handleModalLogin = () => {
  isLoginLoading.value = true;
  Axios.post('/api/public/login', loginPayload.value)
    .then(response => {
      if (response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        isClientAuthenticated.value = true;
        clientEmail.value = loginPayload.value.email;
        closeLoginModal();
      }
    })
    .catch(error => {
      console.error("Erreur d'authentification client :", error);
    })
    .finally(() => {
      isLoginLoading.value = false;
    });
};

const handleLogout = () => {
  localStorage.removeItem('auth_token');
  isClientAuthenticated.value = false;
  clientEmail.value = '';
};

const closeLoginModal = () => {
  loginDialogVisible.value = false;
  loginPayload.value = { email: '', password: '' };
};

// Fonctions de défilement fluide (Scroll)
const goTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const handleMobileGoTo = (selector) => {
  mobileDrawerVisible.value = false;
  goTo(selector);
};

// Sécurité pour s'assurer que les ingrédients sont toujours traités sous forme de tableau
const ensureArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return typeof val === 'string' ? val.split(',').map(s => s.trim()) : [];
};

onMounted(() => {
  fetchProduitDetails();
  // Vérification de session cliente existante
  const token = localStorage.getItem('auth_token');
  if (token) {
    isClientAuthenticated.value = true;
    clientEmail.value = "client@chermical.com";
  }
});
</script>
