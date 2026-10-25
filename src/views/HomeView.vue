  <template>
  <v-app>
  <div class="HomeView">
<!-- Main responsive navigation structure bar wrapper -->
<v-app-bar color="white" flat scroll-target="#scrolling-techniques-7" class="border-b">
  
  <!-- 📱 MOBILE MENU TRIGGER: Visible ONLY on mobile view screens (xs screens) -->
  <v-app-bar-nav-icon 
    class="d-flex d-sm-none text-grey-darken-2" 
    @click="mobileDrawerVisible = !mobileDrawerVisible"
  ></v-app-bar-nav-icon>

  <!-- Left Side: Brand Title Brand (Pushed nicely using margin auto parameters) -->
  <v-app-bar-title 
    class="text-h6 font-weight-black text-orange-darken-4 clickable ms-2 ms-sm-4" 
    @click="router.push('/')"
  >
    Chermical promotion SSD
  </v-app-bar-title>

  

  <!-- 💻 DESKTOP LINK SYSTEM: Hidden completely on small view mobile dimensions -->
  <div class="d-none d-sm-flex align-center fill-height">
    <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#produit')">Produits</v-btn>
    <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#avantage')">Avantages</v-btn>
    <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#ingredient')">Ingrédients</v-btn>
    <v-btn variant="text" color="grey-darken-3" class="text-none font-weight-medium mx-1" @click="goTo('#contact')">Contact</v-btn>
  </div>

  <v-spacer class="d-none d-sm-flex"></v-spacer>

  <!-- Right Side: Clean Profile Dropdown Interface Context Shell Area Menu -->
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

      <!-- Dropdown Card Menu Profile Wrapper -->
      <v-card class="pa-2 border" flat>
        <v-card-text class="pa-2">
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

<!-- ========================================================= -->
<!-- 📱 MOBILE NAVIGATION DRAWER OVERLAY WRAPPER LAYOUT        -->
<!-- ========================================================= -->
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

<!-- Keeping your user dynamic login popup dialog operational -->
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

  <!--AppView></AppView-->
 <v-carousel :show-arrows="false" hide-delimiters height="auto">
  <v-carousel-item>
    <!-- py-12 and py-sm-16 dynamically adds clean vertical padding based on device size -->
    <v-sheet color="orange-lighten-5" class="py-12 py-sm-16 d-flex align-center" min-height="450">
      
      <!-- Safe responsive container width to hold text centered on screens -->
      <v-container class="px-4 text-center">
        <v-row justify="center" no-gutters>
          <v-col cols="12" sm="10" md="8" lg="7">
            
            <!-- Dynamic Badging Wrapper Block -->
            <div class="d-flex justify-center mb-4">
              <v-chip 
                class="font-weight-bold text-orange-darken-4 px-4 py-2" 
                color="white" 
                variant="flat"
                size="comfortable"
              >
                ✨ Nouvelle collection
              </v-chip>
            </div>

            <!-- RESPONSIVE TYPOGRAPHY HEADINGS 🎯 -->
            <!-- text-h4 (Mobile) | text-sm-h3 (Tablet) | text-md-h2 (Desktop) -->
            <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-black text-grey-darken-3 mb-1">
              Cosmétiques
            </h1>
            <h2 class="text-h4 text-sm-h3 text-md-h2 font-weight-black text-orange-darken-4 mb-6">
              d'exception
            </h2>

            <!-- RESPONSIVE DESCRIPTION LAYOUT BLOCK -->
            <div class="text-body-1 text-sm-h6 font-weight-light text-grey-darken-2 px-2 px-sm-6 mb-2">
              Découvrez notre sélection de produits de luxe aux ingrédients naturels, 
              pensés pour révéler votre beauté authentique.
            </div>

          </v-col>
        </v-row>
      </v-container>

    </v-sheet>
  </v-carousel-item>
</v-carousel>

    <v-container  class="ma-2"></v-container>
    <div id="produit" class="py-12">
      <v-container fluid class="mb-6">
         <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-black text-grey-darken-3">
          Nos produits phares
        </h2>
        <div class="text-h6 font-weight-light text-grey-darken-1 mb-6">
              Cliquer sur un produit pour voir tous ses bienfaits et lire les avis de nos clients
          </div>
        
      </v-col>
    </v-row>
      <v-container  class="ma-2"></v-container>
      <v-container fluid>
      <v-row density="comfortable">
         

<!-- On remplace "cards" par "products" et on utilise l'ID unique de MongoDB (_id) -->
<v-col v-for="card in produits" :key="card._id" cols="12" md="3" lg="3">
  <v-hover v-slot="{ isHovering, props }" open-delay="200">
    
    <!-- Remplacement de "to='/about'" par une fonction ou une route dynamique si nécessaire -->
    <v-card 
      max-width="370" 
      v-bind="props" 
      :class="{ 'on-hover': isHovering }"
      :elevation="isHovering ? 4 : 1" 
      flat 
      hover  
      height="560"
     :to="`about/${card._id}`" 
    >
  
      <!-- L'image utilise désormais "card.imageUrl" -->
      <v-img :src="card.imageUrl" class="align-end text-right pa-1" height="270" cover>
        <div class="d-flex justify-center ga-2">
          <v-chip class="fill-height" color="orange-darken-4" variant="flat">Nouveau</v-chip>
        </div>    
      </v-img>

      
      <v-row class="ms-2 ma-2">
        <div class="text-orange-darken-4 ms-3 font-weight-bold" v-text="card.titre"></div>
      </v-row>
  <!-- Clé corrigée : card.name au lieu de card.nom -->
      <v-row class="ms-2 ma-2"> 
        <div class="text-h5 text--primary ms-3 font-weight-bold" v-text="card.nom"></div>
      </v-row>

      <!-- Section Note / Étoiles -->
      <v-card-text class="pt-0">
        <v-row align="center" no-gutters>
    <!-- 💡 Liaison dynamique avec card.rating -->
    <v-rating 
      :model-value="card.rating || 4.5" 
      color="amber" 
      density="compact" 
      size="small" 
      half-increments 
      readonly
    ></v-rating>
    
    <!-- 💡 Liaison dynamique avec card.commentCount -->
    <div class="text-grey ms-4 text-caption">
      {{ card.rating || 4.5 }} ({{ card.commentCount || 0 }})
    </div>
  </v-row>
      </v-card-text>

      <!-- Description -->
      <v-row class="ms-2 ma-2">
        <div class="font-weight-light text-grey text-body-2 mb-2 line-clamp-2" v-text="card.description"></div>
      </v-row>

      <!-- Prix -->
      <v-row class="ms-2 ma-2 mt-auto">
        <div class="text-h6 font-weight-black text-orange-darken-4" v-text="`${card.price} CFA`"></div>
      </v-row>

    </v-card>
  </v-hover>
</v-col>


        </v-row>
    </v-container>
    </v-container>
    </div>
    <v-container  class="ma-2"></v-container>
    <div id="avantage" class="py-12 bg-grey-lighten-5">
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
<v-container class="py-12"></v-container>

<div id="ingredient"  class="py-12">
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

    <v-row class="ma-0">
  <v-col cols="12" md="10" lg="8" class="pa-2">
    <!-- Suppression de la hauteur fixe et arrondi moderne rounded-xl -->
    <v-card class="rounded-xl elevation-1 border" flat color="green-lighten-5">
      <v-card-text class="pa-6">
        
        <!-- Aligner l'icône et le titre horizontalement de manière responsive -->
        <div class="d-flex align-center flex-wrap ga-2 mb-3">
          <v-icon 
            color="green-darken-2" 
            size="x-large"
            class="me-2"
          >
            mdi-flower-tulip-outline
          </v-icon>
          
          <h3 class="text-h5 font-weight-bold text-green-darken-4">
            Certificat biologique
          </h3>
        </div>

        <!-- Paragraphe de description nettoyé et aéré -->
        <!-- Correction de "calss" en "class" et des fautes d'orthographe -->
        <div class="text-body-1 text-grey-darken-2 ms-1">
          <p style="line-height: 1.6;">
            Tous nos produits sont <strong>certifiés bio et cruelty-free</strong>. 
            Nous nous engageons au quotidien pour vous offrir une beauté responsable, éthique et durable.
          </p>
        </div>

      </v-card-text>
    </v-card>
  </v-col>
</v-row>

    
    <div id="contact" class="py-12 bg-grey-lighten-5" >
      <v-carousel :show-arrows="false" hide-delimiters>
    <v-sheet color="orange-darken-4" height="100%" tile>
        <v-row class="fill-height"  align="center" justify="center">
          <v-card color="#E65100" fluid flat>
            <div class="d-flex justify-center ga-2">
              <p class="green-lighten-5 text-h3 text--primary text-title-large" :style="{ fontWeight: 'bold' }" variant="flat">Commencez votre transformation</p></div>
            <v-card  class="mx-auto" max-width="550" color="#E65100"  flat>
            <v-card-text align="center">
              <div calss="text-headline-small ms-1"><p class="">Inscrivez vous sur notre plate forme et recevez des réductions dès votre première commande ainsi nos conseils de beauté </p></div>
            </v-card-text>
           <!-- 🎯 LA BALISE V-FORM DOIT UTILISER formValid -->
<v-form v-model="formValid" @submit.prevent="onSubmit">
  <v-row class="ma-0 align-center">
    
    <!-- Champ E-mail -->
    <v-col cols="12" md="5">
      <v-text-field 
        v-model="email"
        :readonly="loading"
        :rules="emailRules" 
        clearable
        label="E-mail"  
        prepend-inner-icon="mdi-email-outline"  
        variant="outlined" 
        density="compact"
      ></v-text-field>
    </v-col>

    <!-- Champ Mot de Passe -->
    <v-col cols="12" md="5">
      <v-text-field 
        v-model="password"
        :readonly="loading"
        :rules="passwordRules" 
        clearable
        label="Mot de passe"  
        type="password"
        prepend-inner-icon="mdi-lock-outline"  
        variant="outlined" 
        density="compact"
      ></v-text-field>
    </v-col>
    
    <!-- Bouton Soumettre -->
    <v-col cols="12" md="2">
      <!-- Le bouton reste désactivé TANT QUE les règles ne sont pas au vert -->
      <v-btn 
        :disabled="!formValid"
        :loading="loading" 
        type="submit" 
        color="orange-darken-4"
        block
        class="text-none font-weight-bold"
      >
        S'inscrire
      </v-btn>
    </v-col>

  </v-row>
</v-form>



          </v-card>
        </v-card>
        </v-row>
        </v-sheet>  
    </v-carousel>
     <HelloWorld></HelloWorld>
    </div>
  </div>
  <!-- ========================================================= -->
<!-- 🎯 THE UNIVERSAL V-DIALOG POP-UP MESSAGE BOX CONTAINER     -->
<!-- ========================================================= -->
<v-dialog v-model="publicActionDialog" max-width="450px" transition="dialog-transition">
  <v-card class="rounded-xl pa-4 text-center border" flat>
    <v-card-text class="pt-4">
      
      <!-- 1. DYNAMIC COLOR & ICON: Shifts layout dynamically depending on Success or Failure -->
      <v-avatar 
        :color="publicActionSuccess ? 'orange-lighten-5' : 'red-lighten-5'" 
        size="70" 
        class="mb-4"
      >
        <v-icon 
          :color="publicActionSuccess ? 'orange-darken-4' : 'red-darken-2'" 
          size="40"
        >
          {{ publicActionIcon }}
        </v-icon>
      </v-avatar>
      
      <!-- 2. DYNAMIC TITLE: Renders 'Connexion Réussie', 'Session Fermée', etc. -->
      <h3 class="text-h5 font-weight-black text-grey-darken-3 mb-2">
        {{ publicActionTitle }}
      </h3>
      
      <!-- 3. DYNAMIC MESSAGE: Renders the custom text or your backend validation error strings 🎯 -->
      <p class="text-body-2 text-grey-darken-1 px-2">
        {{ publicActionMessage }}
      </p>

    </v-card-text>

    <!-- ACTION DISMISS BUTTON -->
    <v-card-actions class="justify-center pb-2">
      <v-btn
        :color="publicActionSuccess ? 'orange-darken-4' : 'red-darken-2'"
        variant="flat"
        class="text-none font-weight-bold px-8 rounded-lg"
        size="large"
        @click="publicActionDialog = false"
      >
        Continuer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  </v-app>
    
  </template>

  <script>

  import HelloWorld from '../components/HelloWorld.vue'
  import { ref, onMounted, watch } from 'vue';
  //import axios from 'axios';

  //import AppView from'../components/AppView.vue'

  export default {
    name: 'HomeView',
    components: {
      HelloWorld,
      //AppView
    },
    methods:{

}
  }

  </script>
<script setup>
// ==========================================
// 1. IMPORTS DES MODULES (Toujours en premier)
// ==========================================
import { useRouter, useRoute } from 'vue-router';
import { produitService } from '@/_services/produit.service';
import axios from 'axios';

// ==========================================
// 2. INITIALISATION DES INSTANCES DE ROUTAGE
// ==========================================
const router = useRouter();
const route = useRoute();

// ==========================================
// 3. TOUTES LES VARIABLES RÉACTIVES (REF)
// ==========================================
// Interface et Navigation
const mobileDrawerVisible = ref(false);

// Gestion des listes de données
const produits = ref([]);
const topProduct = ref(null);

// Formulaire Inscription Publique (Champs et Règles)
const formValid = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');

const emailRules = [
  v => !!v || 'E-mail requis',
  v => /.+@.+\..+/.test(v) || 'E-mail valide requis'
];

const passwordRules = [
  v => !!v || 'Mot de passe requis',
  v => (v && v.length >= 6) || 'Minimum 6 caractères'
];

// Session Client et Modale Connexion
const isClientAuthenticated = ref(false);
const clientEmail = ref('');
const loginDialogVisible = ref(false);
const isLoginFormValid = ref(false);
const isLoginLoading = ref(false);
const loginPayload = ref({ email: '', password: '' });

// ==========================================
// 4. FONCTIONS DE CHARGEMENT (API BACKEND)
// ==========================================

// Récupérer tous les produits de la base de données
const fetchPublicProduits = () => {
  produitService.getAllProduits()
    .then((response) => {
      produits.value = response.data;
    })
    .catch((error) => {
      console.error("Erreur d'affichage du catalogue public :", error);
    });
};

// Récupérer le produit le plus populaire (Star Product)
const fetchTopProduct = () => {
  axios.get('http://localhost:3000/api/highlight/top')
    .then(response => {
      console.log("Produit le plus populaire reçu :", response.data);
      topProduct.value = response.data;
    })
    .catch(error => {
      console.error("Erreur lors de la récupération du produit star :", error);
    });
};

// ==========================================
// 5. ENREGISTREMENT ET INSCRIPTION CLIENT
// ==========================================
const onSubmit = () => {
  if (!formValid.value) return;

  loading.value = true;

  const payload = {
    email: email.value,
    password: password.value
  };

  // Étape 1 : Création du compte client
  axios.post('http://localhost:3000/api/public/signup', payload)
    .then((signupResponse) => {
      console.log("Compte créé avec succès, lancement de la connexion automatique...");
      
      // Étape 2 : Lancement immédiat de l'Auto-Login avec le même payload
      return axios.post('http://localhost:3000/api/public/login', payload);
    })
    .then((loginResponse) => {
      // Étape 3 : Stockage sécurisé des identifiants clients
      localStorage.setItem('client_token', loginResponse.data.token);
      localStorage.setItem('client_email', email.value);

      alert("Votre compte a été créé et vous êtes maintenant connecté !");
      
      // Réinitialisation du formulaire d'inscription
      email.value = '';
      password.value = '';

      // Étape 4 : Redirection vers la page d'accueil avec affichage connecté actif
      router.push('/'); 
    })
    .catch((error) => {
      console.error("Erreur durant le processus d'inscription/connexion :", error.response?.data);
      alert(error.response?.data?.error || "Une erreur est survenue lors de l'inscription.");
    })
    .finally(() => {
      loading.value = false;
    });
};

const publicActionDialog = ref(false);
const publicActionSuccess = ref(true);
const publicActionTitle = ref('');
const publicActionMessage = ref('');
const publicActionIcon = ref('mdi-check-circle-outline');

// The helper utility that handles the values
const triggerPublicModal = (title, message, isSuccess = true, icon = 'mdi-check-circle-outline') => {
  publicActionTitle.value = title;
  publicActionMessage.value = message;
  publicActionSuccess.value = isSuccess;
  publicActionIcon.value = icon;
  publicActionDialog.value = true;
};
// ==========================================
// 6. GESTION DES SESSIONS ET MODALE LOGIN CLIENT
// ==========================================
const checkClientSession = () => {
  const token = localStorage.getItem('client_token');
  const emailLocal = localStorage.getItem('client_email');

  if (token && emailLocal) {
    isClientAuthenticated.value = true;
    clientEmail.value = emailLocal;
  } else {
    isClientAuthenticated.value = false;
    clientEmail.value = '';
  }
};

// 🔄 UPGRADED : CLIENT LOGIN WITH MODAL HANDLER 🎯
const handleModalLogin = () => {
  if (!isLoginFormValid.value) return;
  isLoginLoading.value = true;

  // Targeting your dedicated split public client endpoint cleanly
  axios.post('http://localhost:3000/api/public/login', loginPayload.value)
    .then((response) => {
      localStorage.setItem('client_token', response.data.token);
      localStorage.setItem('client_email', loginPayload.value.email);
      
      checkClientSession();
      closeLoginModal(); // Drops your credentials form overlay box clean

      // 🎯 MODAL INTERACTION SUBSTITUTION: Success prompt
      triggerPublicModal(
        "Connexion Réussie",
        "Ravi de vous revoir ! Vous êtes maintenant connecté à votre espace client.",
        true,
        'mdi-lock-open-check-outline'
      );
    })
    .catch((error) => {
      console.error("Login error:", error.response?.data);
      
      // 🎯 MODAL INTERACTION SUBSTITUTION: Failure prompt reading your backend response string
      triggerPublicModal(
        "Connexion Impossible",
        error.response?.data?.error || "Identifiants invalides. Veuillez vérifier votre e-mail et mot de passe.",
        false,
        'mdi-shield-alert-outline'
      );
    })
    .finally(() => {
      isLoginLoading.value = false;
    });
};

const closeLoginModal = () => {
  loginDialogVisible.value = false;
  loginPayload.value = { email: '', password: '' };
};

// 🔄 UPGRADED : CLIENT LOGOUT WITH MODAL HANDLER 🎯
const handleLogout = () => {
  localStorage.removeItem('client_token');
  localStorage.removeItem('client_email');
  
  checkClientSession(); // Instantly toggles the navbar avatar display layout changes

  // 🎯 MODAL INTERACTION SUBSTITUTION: Structural informative success window box prompt
  triggerPublicModal(
    "Session Fermée",
    "Vous avez été déconnecté avec succès. À très bientôt sur Chermical promotion SSD !",
    true,
    'mdi-logout-variant'
  );
};


// ==========================================
// 7. UTILITAIRES DE NAVIGATION ET FILTRES
// ==========================================
const goTo = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleMobileGoTo = (selector) => {
  mobileDrawerVisible.value = false; // Ferme le tiroir mobile avant le scroll
  goTo(selector);
};

// Fonction utilitaire de sécurité pour décoder proprement les ingrédients/bienfaits
const ensureArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try { 
      const parsed = JSON.parse(data); 
      if (Array.isArray(parsed)) return parsed; 
    } catch (e) { 
      return data.split(',').map(item => item.trim()).filter(Boolean); 
    }
  }
  return [];
};

// ==========================================
// 8. SURVEILLANCE ET INITIALISATION DE LA PAGE
// ==========================================
// Surveille le changement d'URL pour recalculer l'état utilisateur
watch(
  () => route?.path,
  (newPath) => {
    if (newPath) {
      checkClientSession();
    }
  },
  { immediate: true }
);

// Unique point d'entrée au démarrage du composant (Unifié !) 🎯
onMounted(() => {
  checkClientSession();
  fetchPublicProduits();
  fetchTopProduct();
});
</script>

  <!-- <style  scoped lang="sass">
  .v-card.on-hover.v-theme--dark {
     background-color: rgba(#4f4d4d, 0.9)
    >.v-card__text
      color: #080808
  }
  </style> -->
 <style scoped lang="sass">
.v-card.on-hover.v-theme--dark
  background-color: rgba(79, 77, 77, 0.9)
</style>


  
  <style scoped>
/* Permet de limiter proprement la description à 2 lignes pour garder les cartes alignées */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
