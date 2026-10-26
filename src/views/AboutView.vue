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

              <!-- Tableaux d'ingrédients -->
              <v-card class="pa-4 mb-4 rounded-xl" flat color="green-lighten-5" border v-if="ensureArray(produit.ingredient).length">
                <h3 class="text-subtitle-1 font-weight-bold text-green-darken-4 mb-2">🌿 Ingrédients inclus :</h3>
                <div class="d-flex flex-wrap align-center">
                  <v-chip v-for="(ing, i) in ensureArray(produit.ingredient)" :key="i" color="teal-darken-2" variant="tonal" class="ma-1 font-weight-bold">
                    {{ ing }}
                  </v-chip>
                </div>
              </v-card>

              <!-- Tableaux des Bienfaits -->
              <v-card class="pa-4 mb-6 rounded-xl" flat color="orange-lighten-5" border v-if="ensureArray(produit.bienfaits).length">
                <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-4 mb-2">✨ Bienfaits pour votre corps :</h3>
                <div class="d-flex flex-wrap align-center">
                  <v-chip v-for="(bienfait, i) in ensureArray(produit.bienfaits)" :key="i" color="orange-darken-4" variant="tonal" class="ma-1 font-weight-bold">
                    {{ bienfait }}
                  </v-chip>
                </div>
              </v-card>

              <!-- 🎯 BOUTON FINAL DE COMMANDE DYNAMIQUE WHATSAPP -->
              <v-btn 
                :href="whatsAppUrl"
                target="_blank" 
                color="green-darken-2" 
                size="large" 
                block 
                class="text-none font-weight-bold rounded-xl text-white mt-4 elevation-2 py-3" 
                prepend-icon="mdi-whatsapp"
                :disabled="!whatsAppUrl || whatsAppUrl === '#'"
              >
                Commander sur WhatsApp
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Cercle de chargement si les données de la base n'arrivent pas encore -->



    <v-container>
     
          <v-divider class="my-12"></v-divider>

    <!-- SECTION DES AVIS INTERNAUTES -->
     <v-row>
      <!-- Formulaire pour ajouter un avis -->
      <v-col cols="12" md="5">
        <v-card class="pa-4 rounded-xl elevation-1" border>
          <v-card-title class="text-h5 font-weight-bold px-0 mb-4">Donner votre avis</v-card-title>
          
          <v-form @submit.prevent="submitComment">
            <v-text-field v-model="newComment.author" label="Votre Nom / Pseudo" variant="outlined" required class="mb-2"></v-text-field>
            
            <!-- Choix de la note sous forme d'étoiles cliquables -->
            <div class="mb-4">
              <span class="text-body-2 text-grey-darken-2 d-block mb-1">Votre note :</span>
              <v-rating v-model="newComment.rating" color="amber" density="comfortable"></v-rating>
            </div>

            <v-textarea v-model="newComment.text" label="Votre commentaire..." variant="outlined" rows="3" required class="mb-4"></v-textarea>
            
            <v-btn type="submit" color="orange-darken-4" block class="text-none font-weight-bold rounded-lg">
              Publier l'avis
            </v-btn>
          </v-form>

<v-dialog v-model="commentDialog" max-width="450px" transition="dialog-transition">
  <v-card class="rounded-xl pa-4 text-center border" flat>
    <v-card-text class="pt-4">
      
      <!-- CAS A : REQUÊTE RÉUSSIE (VERT) -->
      <div v-if="commentSuccess">
        <v-avatar color="green-lighten-5" size="70" class="mb-4">
          <v-icon color="green-darken-2" size="40">mdi-checkbox-marked-circle-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Avis Transmis !</h3>
        <p class="text-body-2 text-grey-darken-1 px-2">
          Merci pour votre retour. Votre commentaire a été enregistré avec succès et sera publié sur la fiche produit dès sa validation par notre administrateur.
        </p>
      </div>

      <!-- CAS B : REQUÊTE REJETÉE (ROUGE) -->
      <div v-else>
        <v-avatar color="red-lighten-5" size="70" class="mb-4">
          <v-icon color="red-darken-2" size="40">mdi-alert-circle-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Action Impossible</h3>
        <p class="text-body-2 text-grey-darken-1 px-2">
          {{ commentMessage }}
        </p>
      </div>

    </v-card-text>

    <v-card-actions class="justify-center pb-2">
      <v-btn
        :color="commentSuccess ? 'green-darken-2' : 'red-darken-2'"
        variant="flat"
        class="text-none font-weight-bold px-8 rounded-lg"
        size="large"
        @click="commentDialog = false"
      >
        Fermer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

          
        </v-card>
      </v-col>

      <!-- Liste des avis postés -->
      <v-col cols="12" md="7">
        <h2 class="text-h5 font-weight-bold mb-4">Avis des clients ({{ comments.length }})</h2>
        
        <v-alert v-if="comments.length === 0" type="info" variant="tonal" class="rounded-xl">
          Aucun avis n'a encore été laissé pour ce produit. Soyez le premier !
        </v-alert>

        <div v-else class="d-flex flex-column ga-4">
          <v-card v-for="com in comments" :key="com._id" class="pa-4 rounded-xl elevation-1" border>
            <v-row no-gutters align="center" class="mb-2">
              <span class="font-weight-bold text-subtitle-1 text-primary">{{ com.author }}</span>
              <v-spacer></v-spacer>
              <v-rating :model-value="com.rating" color="amber" density="compact" size="small" readonly></v-rating>
            </v-row>
            <p class="text-body-2 text-medium-emphasis mb-1">{{ com.text }}</p>
            <small class="text-caption text-grey">{{ new Date(com.createdAt).toLocaleDateString('fr-FR') }}</small>
          </v-card>
        </div>
      </v-col>
    </v-row>

    </v-container>

</div>
     
    <v-container  class="ma-2 py-12"></v-container>
    <div id="avantage" class="bg-grey-lighten-5 py-12">
  <!-- Utilisation de v-container sans marge fixe pour un centrage parfait -->
  <v-container>
    
    <!-- TITRE PRINCIPAL -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-black text-grey-darken-3">
          Une formule révolutionnaire
        </h2>
        <v-divider class="mx-auto my-4 bg-orange-darken-4" thickness="3" width="60"></v-divider>
      </v-col>
    </v-row>
    
    <!-- GRILLE DES AVANTAGES RESPONSIVE -->
    <v-row justify="center">
      
      <!-- AVANTAGE 1 : ÉCLAT INSTANTANÉ -->
      <!-- cols="12" (mobile) | sm="6" (tablette) | md="3" (ordinateur) 🎯 -->
      <v-col cols="12" sm="6" md="3" class="d-flex">
        <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
          <!-- Icône avec feuille Vuetify propre -->
          <v-sheet rounded="lg" class="d-flex align-center justify-center mb-4" color="orange-darken-4" height="44" width="44">
            <v-icon color="white" size="large">mdi-star-four-points-outline</v-icon>
          </v-sheet>
          
          <v-card-text class="pa-0 flex-grow-1">
            <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Éclat instantané</h3>
            <p class="text-body-2 text-medium-emphasis leading-normal">
              Une peau radieuse et lumineuse dès la première application.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- AVANTAGE 2 : 100% NATUREL -->
      <v-col cols="12" sm="6" md="3" class="d-flex">
        <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
          <v-sheet rounded="lg" class="d-flex align-center justify-center mb-4" color="green-darken-2" height="44" width="44">
            <v-icon color="white" size="large">mdi-flower-tulip-outline</v-icon>
          </v-sheet>
          
          <v-card-text class="pa-0 flex-grow-1">
            <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">100% Naturel</h3>
            <p class="text-body-2 text-medium-emphasis leading-normal">
              Formule saine avec des ingrédients biologiques et durables.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- AVANTAGE 3 : HYDRATATION PROFONDE -->
      <v-col cols="12" sm="6" md="3" class="d-flex">
        <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
          <v-sheet rounded="lg" class="d-flex align-center justify-center mb-4" color="orange-darken-4" height="44" width="44">
            <v-icon color="white" size="large">mdi-heart-outline</v-icon>
          </v-sheet>
          
          <v-card-text class="pa-0 flex-grow-1">
            <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Hydratation profonde</h3>
            <p class="text-body-2 text-medium-emphasis leading-normal">
              Nourrit et hydrate votre peau en profondeur pendant 24 heures d'affilée.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- AVANTAGE 4 : PROTECTION AVANCÉE -->
      <v-col cols="12" sm="6" md="3" class="d-flex">
        <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
          <v-sheet rounded="lg" class="d-flex align-center justify-center mb-4" color="blue-darken-3" height="44" width="44">
            <v-icon color="white" size="large">mdi-shield-outline</v-icon>
          </v-sheet>
          
          <v-card-text class="pa-0 flex-grow-1">
            <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Protection avancée</h3>
            <p class="text-body-2 text-medium-emphasis leading-normal">
              Protège activement contre les agressions extérieures et le vieillissement cellulaire.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</div>

 <v-container  class="ma-1 py-12"></v-container>
<div id="ingredient">
  <v-row class="ma-0 align-center">
    
    <!-- Colonne Gauche : Textes et Ingrédients Dynamiques -->
    <v-col cols="12" sm="5">
      <v-sheet class="ms-4 bg-transparent">
        <v-card flat class="bg-transparent">
          <v-card-text class="pa-0">
            <p class="text-h3 font-weight-bold text-grey-darken-3 mb-2">Des ingrédients d'exception</p>
            
            <!-- Si le produit populaire est chargé, on affiche un petit clin d'œil à son titre -->
            <div v-if="topProduct" class="text-subtitle-1 text-orange-darken-4 font-weight-bold mb-4">
              À l'honneur aujourd'hui dans notre produit phare : *{{ topProduct.title }}*
            </div>

            <div class="text-h6 font-weight-light text-grey-darken-1 mb-6">
              Nous sélectionnons avec soin les meilleurs ingrédients naturels pour créer des formules efficaces et respectueuses de votre peau.
            </div>
          </v-card-text>
        </v-card>
      </v-sheet>

      <!-- 🎯 ETAPE CLÉ : Affichage si aucun ingrédient n'est en BDD (Fallback de sécurité) -->
      <div v-if="!topProduct || ensureArray(topProduct?.ingredient).length === 0">
        <v-sheet class="ma-2 text-grey-darken-1">
          <v-icon class="ma-1" color="grey" size="large">mdi-alert-circle-outline</v-icon>
          Aucun ingrédient configuré pour le moment.
        </v-sheet>
      </div>

      <!-- 🎯 ETAPE CLÉ : Boucle dynamique sur les vrais ingrédients du produit star de MongoDB -->
      <div v-else>
        <v-sheet 
          v-for="(ing, index) in ensureArray(topProduct.ingredient)" 
          :key="index" 
          class="ma-2 bg-transparent d-flex align-center font-weight-medium text-body-1"
        >
          <v-icon class="me-2" color="orange-darken-4" size="large">
            mdi-checkbox-marked-circle
          </v-icon>
          {{ ing }}
        </v-sheet>
      </div>
    </v-col>

    <v-col cols="12" sm="2"></v-col>

    <!-- Colonne Droite : Photo réelle et dynamique du Produit Star -->
    <v-col cols="12" sm="4"> 
      <v-sheet elevation="12" rounded="xl" class="overflow-hidden bg-grey-lighten-4">
        <!-- 💡 Remplacement de l'image Target fixe par votre imageUrl MongoDB -->
        <v-img 
          v-if="topProduct?.imageUrl"
          :src="topProduct.imageUrl" 
          :alt="topProduct.title"
          width="100%" 
          cover
          aspect-ratio="1"
          class="rounded-xl"
        >
          <!-- Petit badge élégant "Le plus populaire" incrusté sur l'image -->
          <v-chip color="orange-darken-4" variant="flat" size="small" class="ma-3 font-weight-bold position-absolute left-0 top-0">
            🔥 Populaire
          </v-chip>
        </v-img>
        
        <!-- Image de chargement par défaut si le serveur est lent -->
        <v-responsive v-else aspect-ratio="1" class="d-flex align-center justify-center">
          <v-progress-circular indeterminate color="orange-darken-4"></v-progress-circular>
        </v-responsive>
      </v-sheet>
    </v-col>

  </v-row>
</div>
<v-container></v-container>
<div id="contact">
<HelloWorld></HelloWorld>
</div>
  </div>
  </v-app>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue'
import { ref, onMounted, watch } from 'vue';
//import { Text } from 'vue';
import { produitService } from '@/_services/produit.service.js';
export default {
  name: 'AboutView',
  components: {
    HelloWorld,
  
  }
}
</script>
<script setup>

import {  computed } from 'vue'; // Si erreur sur 'react', remplacez par 'vue'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';


// 2. INITIALISATION IMMÉDIATE DES INSTANCES (Pour éviter les erreurs "no-undef") 🎯
const router = useRouter();
const route = useRoute();


// 3. VARIABLES RÉACTIVES DE GESTION DU PRODUIT ET WHATSAPP
const mobileDrawerVisible = ref(false);
const adminPhone = ref("237600000000"); // Valeur de secours initiale (Cameroun)

// Variables réactives pour l'authentification client
const isClientAuthenticated = ref(false);
const clientEmail = ref('');
const loginDialogVisible = ref(false);
const isLoginFormValid = ref(false);
const isLoginLoading = ref(false);
const loginPayload = ref({ email: '', password: '' });

// Variables réactives pour l'espace commentaires et modales
const comments = ref([]);
const topProduct = ref(null);
const commentDialog = ref(false);
const commentSuccess = ref(true);
const commentMessage = ref('');
const newComment = ref({ author: '', text: '', rating: 5 });


// 4. CALCULATEUR D'URL WHATSAPP DYNAMIQUE ET SÉCURISÉ 🎯
const whatsAppUrl = computed(() => {
  // 🎯 FIX: Changed 'product.value' to 'produit.value' to read your active data
  if (!produit.value) return '#';

  const messageText = "Bonjour ! Je souhaite commander le produit suivant :\n\n" +
                      "📝 *Produit :* " + produit.value.title + "\n" +
                      "💰 *Prix :* " + produit.value.price + " CFA";

  const encodedMessage = encodeURIComponent(messageText);
  const encodedUrl = encodeURIComponent(window.location.href);

  // 🎯 FIX: Ensuring the slash '/' is present after wa.me
  return "https://wa.me" + adminPhone.value + "?text=" + encodedMessage + "%0A%0A🔗 *Lien :* " + encodedUrl;
});

// On charge le vrai numéro configuré par l'admin au chargement de la fiche produit
onMounted(() => {
  fetchProductDetails();
  
  axios.get('http://localhost:3000/api/admin/settings')
    .then(res => {
      if (res.data.whatsappNumber) {
        adminPhone.value = res.data.whatsappNumber; // 🎯 Le numéro devient dynamique !
        console.log(adminPhone.value)
      }
    });
});

// 5. FONCTIONS DE CHARGEMENT DES DONNÉES (API BACKEND)

// Récupérer le numéro WhatsApp de l'administrateur depuis la base de données
const loadWhatsAppNumber = () => {
  axios.get('http://localhost:3000/api/admin/settings')
    .then(res => {
      if (res.data && res.data.whatsappNumber) {
        adminPhone.value = res.data.whatsappNumber;
        console.log("Numéro de l'administrateur synchronisé :", adminPhone.value);
      }
    })
    .catch(err => console.warn("Utilisation du numéro WhatsApp par défaut :", err));
};

// Récupérer les détails complets du produit
const fetchProductDetails = () => {
  //🎯 On récupère l'id de l'URL : route.params.id
  const productId = route.params.id;
  console.log("Tentative d'appel de l'ID :", productId);

  // On appelle la route GET unique de votre backend Express
  produitService.getProduit(productId)
 // axios.get(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      produit.value = response.data;
       console.log(produit.value)
    })
    .catch((error) => {
      console.error("Impossible de charger les détails du produit :", error);
    });
};


// Permet d'accéder aux paramètres de l'URL
const produit = ref(null);


// Récupérer les commentaires publics associés au produit
const fetchComments = () => {
  axios.get(`http://localhost:3000/api/comments/public/${route.params.id}`)
    .then((response) => {
      comments.value = response.data || []; 
    })
    .catch((error) => console.error("Erreur de chargement des commentaires :", error));
};



// Récupérer le produit star de la page d'accueil
const fetchTopProduct = () => {
  axios.get('http://localhost:3000/api/highlight/top')
    .then(response => {
      topProduct.value = response.data;
    })
    .catch(error => console.error("Erreur récupération produit populaire :", error));
};

// Soumettre un avis utilisateur
const submitComment = () => {
  const payload = {
    productId: route.params.id,
    author: newComment.value.author,
    text: newComment.value.text,
    rating: newComment.value.rating
  };

  axios.post('http://localhost:3000/api/comments', payload)
    .then((response) => {
      commentSuccess.value = true;
      commentDialog.value = true;
      newComment.value = { author: '', text: '', rating: 5 };
      fetchComments();
      fetchProductDetails(); 
    })
    .catch((error) => {
      commentSuccess.value = false;
      commentMessage.value = error.response?.data?.error || "Impossible d'enregistrer votre avis.";
      commentDialog.value = true;
    });
};



// 6. LOGIQUE DE NAVIGATION ET SESSIONS CLIENTS

const checkClientSession = () => {
  const token = localStorage.getItem('client_token');
  const email = localStorage.getItem('client_email');

  if (token && email) {
    isClientAuthenticated.value = true;
    clientEmail.value = email;
  } else {
    isClientAuthenticated.value = false;
    clientEmail.value = '';
  }
};

const handleModalLogin = () => {
  if (!isLoginFormValid.value) return;
  isLoginLoading.value = true;

  axios.post('http://localhost:3000/api/auth/login', loginPayload.value)
    .then((response) => {
      localStorage.setItem('client_token', response.data.token);
      localStorage.setItem('client_email', loginPayload.value.email);
      checkClientSession();
      closeLoginModal();
      alert("Connexion réussie !");
    })
    .catch((error) => {
      alert(error.response?.data?.error || "Identifiants invalides.");
    })
    .finally(() => {
      isLoginLoading.value = false;
    });
};

const closeLoginModal = () => {
  loginDialogVisible.value = false;
  loginPayload.value = { email: '', password: '' };
};



const handleLogout = () => {
  localStorage.removeItem('client_token');
  localStorage.removeItem('client_email');
  checkClientSession();
  alert("Vous avez été déconnecté.");
  router.push('/');
};
//navigation
const goTo = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleMobileGoTo = (selector) => {
  mobileDrawerVisible.value = false;
  goTo(selector);
};

const ensureArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try { const parsed = JSON.parse(data); if (Array.isArray(parsed)) return parsed; } 
    catch (e) { return data.split(',').map(item => item.trim()).filter(Boolean); }
  }
  return [];
};


// 7. SURVEILLANCE ET INITIALISATION DE LA PAGE 🎯
watch(
  () => route?.path,
  (newPath) => {
    if (newPath) {
      checkClientSession();
    }
  },
  { immediate: true }
);



onMounted(() => {
  checkClientSession();
  fetchProductDetails();
  loadWhatsAppNumber();
  fetchComments();
  fetchTopProduct();
});

  
</script>
