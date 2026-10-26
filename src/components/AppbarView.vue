<template>
  <!-- Fixed top bar with a modern bottom border sheet line -->
  <v-app-bar class="border-b px-2 px-sm-4" flat color="white">
    
    <!-- 📱 MOBILE MENU TRIGGER -->
    <v-app-bar-nav-icon 
      class="d-flex d-sm-none text-grey-darken-2"
      @click="toggleMobileMenu"
    ></v-app-bar-nav-icon>

    <!-- RESPONSIVE TITLE CONTAINER -->
    <v-app-bar-title class="ms-1 ms-sm-2">
      <div class="text-subtitle-1 text-sm-h6 font-weight-black text-orange-darken-4 text-truncate">
        Chermical promotion SSD
        <span class="text-body-2 text-grey-darken-1 font-weight-regular d-none d-sm-inline ms-2">
          | Gérer l'intégralité de votre Site
        </span>
      </div>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- ACTION BUTTON GROUP CONTAINER -->
    <div class="d-flex align-center ga-1 ga-sm-2">
      
      <!-- 🌐 View Site Button -->
      <v-btn 
        color="grey-darken-3"
        variant="outlined" 
        class="text-none font-weight-bold rounded-lg d-none d-sm-inline-flex" 
        prepend-icon="mdi-earth"
        @click="site"
      >
        Voir le site
      </v-btn>
      <v-btn 
        icon="mdi-earth" 
        color="grey-darken-3" 
        variant="text" 
        class="d-inline-flex d-sm-none" 
        title="Voir le site"
        @click="site"
      ></v-btn>

      <!-- 🚪 Logout Action Button (Triggers the custom modal dialog) -->
      <v-btn 
        color="red-darken-1"
        variant="text"
        class="text-none font-weight-bold rounded-lg d-none d-sm-inline-flex" 
        prepend-icon="mdi-logout" 
        @click="logoutConfirmDialog = true"
      >
        Déconnexion
      </v-btn>
      <v-btn 
        icon="mdi-logout" 
        color="red-darken-1" 
        variant="text" 
        class="d-inline-flex d-sm-none" 
        title="Déconnexion"
        @click="logoutConfirmDialog = true"
      ></v-btn>

    </div>
  </v-app-bar>

  <!-- ========================================================= -->
  <!-- ⚠️ NOUVEAU : MODALE DE CONFIRMATION DE DÉCONNEXION (V-DIALOG) -->
  <!-- ========================================================= -->
  <v-dialog v-model="logoutConfirmDialog" max-width="420px" persistent>
    <v-card class="rounded-xl pa-4 text-center border" flat>
      <v-card-text class="pt-4">
        
        <!-- Warning Icon Avatar -->
        <v-avatar color="orange-lighten-5" size="70" class="mb-4">
          <v-icon color="orange-darken-4" size="40">mdi-logout-variant</v-icon>
        </v-avatar>
        
        <h3 class="text-h5 font-weight-black text-grey-darken-3 mb-2">
          Se déconnecter ?
        </h3>
        
        <p class="text-body-2 text-grey-darken-1 px-2">
          Êtes-vous sûr de vouloir fermer votre session administrateur ? Vous devrez ressaisir vos identifiants pour accéder de nouveau à la gestion du catalogue.
        </p>
      </v-card-text>

      <!-- MODAL ACTION BUTTONS -->
      <v-card-actions class="justify-center ga-3 pb-2">
        <v-btn
          variant="outlined"
          color="grey-darken-1"
          class="text-none font-weight-bold px-6 rounded-lg"
          size="large"
          @click="logoutConfirmDialog = false"
        >
          Annuler
        </v-btn>

        <v-btn
          color="red-darken-1"
          variant="flat"
          class="text-none font-weight-bold px-6 rounded-lg text-white"
          size="large"
          @click="executeLogout"
        >
          Déconnexion
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { accountService } from '@/_services';
export default {
  name: 'AppbarView',
  data() {
    return {
      // 🎯 Reactive variable controlling the question modal visibility status
      logoutConfirmDialog: false
    };
  },
  methods: {
    toggleMobileMenu() {
      window.dispatchEvent(new CustomEvent('toggle-admin-drawer'));
    },
    
    site() {
       accountService.lagout()
        this.$router.push('/') 
    },
    
    // 🎯 Fires when user confirms the modal prompt action
    executeLogout() {
      this.logoutConfirmDialog = false; // Closes out the view cleanly
      
      // Clear security active cache keys out of browser memory storage threads
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('admin_email');
      
      this.$router.push('/admin'); // Sends manager back out to login view index paths
    }
  }
};
</script>

<style scoped>
.ga-1 { gap: 4px; }
.ga-sm-2 { gap: 8px; }
.ga-3 { gap: 12px; }
</style>


  <!-- <script>
import { accountService } from '@/_services';

  export default {
    name: 'AppbarView',
    methods:{
      lagout(){
        console.log('retour')
        accountService.lagout()
        this.$router.push('../admin') 
      },
      site(){
        console.log('revenir sur site')
        accountService.lagout()
        this.$router.push('/') 
      }
    },
  }
  </script> -->