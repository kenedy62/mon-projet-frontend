<template>
  <!-- 
    🎯 RESPONSIVE PROPERTIES ADDED:
    - v-model="drawer": Controls open/close states dynamically on mobile viewports
    - :permanent="smAndUp": Stays permanently open on tablet/desktop, but floating on mobile
    - color="#0f172a": Dark elegant premium backdrop matching high-end dashboards
  -->
  <v-navigation-drawer 
    v-model="drawer" 
    :permanent="$vuetify.display.smAndUp"
    color="#0f172a" 
    class="text-white pa-2"
    elevation="1"
  >
    <v-list nav class="bg-transparent">
      
      <!-- Premium Admin Sidebar Brand Header Branding Panel -->
      <v-list-item class="mb-4 px-2 text-left">
        <div class="text-subtitle-1 font-weight-black text-orange-darken-4">SSD Dashboard</div>
        <div class="text-caption text-grey-lighten-1">Espace Administration</div>
      </v-list-item>
      
      <v-divider class="mb-4 bg-grey-darken-2"></v-divider>

      <!-- NAVIGATION LINK LOOP LIST -->
      <v-list-item 
        prepend-icon="mdi-view-dashboard-outline" 
        active-color="orange-darken-4" 
        title="Tableau de bord" 
        value="tableau" 
        to="/gestion"
        class="rounded-lg text-white mb-1"
      ></v-list-item>

      <v-list-item 
        prepend-icon="mdi-package-variant-closed" 
        active-color="orange-darken-4" 
        title="Produits" 
        value="produits" 
        to="/produits"
        class="rounded-lg text-white mb-1"
      ></v-list-item>

      <v-list-item 
        prepend-icon="mdi-message-outline" 
        active-color="orange-darken-4" 
        title="Commentaires" 
        value="commentaires" 
        to="/commentaires"
        class="rounded-lg text-white mb-1"
      ></v-list-item>

      <v-list-item 
        prepend-icon="mdi-cog" 
        active-color="orange-darken-4" 
        title="Options / Configurations" 
        value="option" 
        to="/option"
        class="rounded-lg text-white mb-1"
      ></v-list-item>

      <v-list-item 
        prepend-icon="mdi-account" 
        active-color="orange-darken-4" 
        title="Mon Profil" 
        value="Profil" 
        to="/profilAdmin"
        class="rounded-lg text-white mb-1"
      ></v-list-item>
    </v-list>

    <!-- Global Administration Fast Action Logout Triggers Placement -->
    <!-- <template v-slot:append>
      <div class="pa-2">
        <v-btn 
          color="red-darken-2" 
          block 
          prepend-icon="mdi-logout" 
          class="text-none font-weight-bold rounded-lg"
          variant="flat"
          @click="handleLogout"
        >
          Déconnexion
        </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// import { useRouter } from 'vue-router';

//const router = useRouter();

// 🎯 Controls structural view visible state configurations on mobile views
const drawer = ref(true);

// Global custom layout event listener callback
const toggleDrawerListener = () => {
  drawer.value = !drawer.value;
};

// Lifecycle listeners hook mapping to sync actions cleanly across independent component views
onMounted(() => {
  window.addEventListener('toggle-admin-drawer', toggleDrawerListener);
});

onUnmounted(() => {
  window.removeEventListener('toggle-admin-drawer', toggleDrawerListener);
});

// const handleLogout = () => {
//   if (confirm("Voulez-vous déconnecter votre session administrateur ?")) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('auth_token');
//     alert("Session admin déconnectée.");
//     router.push('/admin'); // Returns administrator clean back to home landing index page
//   }
// };
</script>



<script>
export default {
  name: 'MenueView',

  data: () => ({
   
  }),
}
</script>