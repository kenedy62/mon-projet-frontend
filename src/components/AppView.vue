<template>
<v-app-bar    color="white" flat scroll-target="#scrolling-techniques-7">
  <v-container fluid class="pa-0">
    <v-row no-gutters align="center">
      
      <!-- 1. Left Side: Brand Title -->
      <v-col class="order-1" cols="12" sm="4" md="3">
        <v-sheet class="pa-2 bg-transparent">
          <v-app-bar-title class="text-h5 font-weight-bold text-orange-darken-4 mt-0 clickable" @click="router.push('/')">
            Chermical promotion SSD
          </v-app-bar-title>
        </v-sheet>
      </v-col>

      <!-- 2. Center Side: Scrolling Anchor Navigation Links -->
      <v-col class="order-6" cols="12" sm="5" md="6">
        <v-sheet class="pa-0 bg-transparent">
          <v-layout style="height: 50px;">
            <v-row no-gutters justify="center">
              <v-bottom-navigation bg-color="white" active color="orange-darken-4" flat>
                <v-btn text="Produits" value="Produits" @click="goTo('#produit')"></v-btn>
                <v-btn text="Avantages" value="Avantages" @click="goTo('#avantage')"></v-btn>
                <v-btn text="Ingrédients" value="Ingrédients" @click="goTo('#ingredient')"></v-btn>
                <v-btn text="Contact" value="Contact" @click="goTo('#contact')"></v-btn>
              </v-bottom-navigation>
            </v-row>
          </v-layout>
        </v-sheet>
      </v-col> 

      <!-- 3. Right Side: Dynamic Authentication Action Panel 🎯 -->
     <v-col class="order-12 d-flex justify-end" cols="12" sm="3" md="3">
  <v-sheet class="pa-2 bg-transparent me-4">
    
    <v-menu min-width="220px" rounded="lg" transition="scale-transition">
      <!-- Profile Icon Trigger -->
      <template v-slot:activator="{ props }">
        <v-btn 
          icon 
          v-bind="props" 
          :color="isClientAuthenticated ? 'orange-darken-4' : 'grey-darken-1'"
          variant="tonal"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <!-- Dropdown Card -->
      <v-card class="pa-2 border" flat>
        <v-card-text class="pa-2">
          
          <!-- CASE A: USER IS AUTHENTICATED -->
          <div v-if="isClientAuthenticated" class="text-center">
            <v-avatar color="orange-darken-4" class="mb-2" size="40">
              <span class="text-white text-h6">{{ clientEmail.charAt(0).toUpperCase() }}</span>
            </v-avatar>
            <p class="text-subtitle-2 font-weight-bold text-truncate mb-4" style="max-width: 180px;">
              {{ clientEmail }}
            </p>
            <v-divider class="my-2"></v-divider>
            <v-btn 
              color="red-darken-1" 
              variant="flat" 
              block 
              class="text-none font-weight-bold rounded-md"
              prepend-icon="mdi-logout"
              @click="handleLogout"
            >
              Déconnexion
            </v-btn>
          </div>

          <!-- CASE B: USER IS ANONYMOUS -->
          <div v-else class="text-center py-2">
            <p class="text-caption text-grey-darken-1 mb-3">Espace Client Privé</p>
            <!-- 🎯 MODIFIED: Toggles the dynamic login modal visible status state variable -->
            <v-btn 
              color="orange-darken-4" 
              variant="flat" 
              block 
              class="text-none font-weight-bold rounded-md mb-2"
              prepend-icon="mdi-login"
              @click="loginDialogVisible = true"
            >
              Se connecter
            </v-btn>
          </div>

        </v-card-text>
      </v-card>
    </v-menu>

    <!-- ========================================================= -->
    <!-- 🎯 NOUVEAU : LA MODALE DE CONNEXION CLIENT (V-DIALOG)  -->
    <!-- ========================================================= -->
    <v-dialog v-model="loginDialogVisible" max-width="450px" transition="dialog-bottom-transition">
      <v-card class="rounded-xl pa-4 border shadow-2">
        <v-card-title class="d-flex align-center px-2">
          <span class="text-h5 font-weight-bold text-orange-darken-4">Connexion Client</span>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" color="grey" @click="closeLoginModal"></v-btn>
        </v-card-title>

        <v-card-text class="px-2 pt-4">
          <v-form v-model="isLoginFormValid" @submit.prevent="handleModalLogin">
            <!-- Email Field -->
            <v-text-field
              v-model="loginPayload.email"
              label="Adresse e-mail"
              type="email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-email-outline"
              :rules="[v => !!v || 'E-mail requis']"
              required
              class="mb-2"
            ></v-text-field>

            <!-- Password Field -->
            <v-text-field
              v-model="loginPayload.password"
              label="Mot de passe"
              type="password"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              :rules="[v => !!v || 'Mot de passe requis']"
              required
              class="mb-6"
            ></v-text-field>

            <!-- Submit Action Buttons -->
            <v-btn
              type="submit"
              color="orange-darken-4"
              block
              size="large"
              :disabled="!isLoginFormValid"
              :loading="isLoginLoading"
              class="text-none font-weight-bold rounded-lg"
            >
              Me connecter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-sheet>
</v-col>
    </v-row>
  </v-container>
</v-app-bar>
</template>

<script>
 import { ref, onMounted, watch } from 'vue';
export default {
  name: 'AppView',

  data: () => ({
   
  }),
}
</script>
<script setup>
import { useGoTo } from 'vuetify'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios'
const goTo = useGoTo()
// function valide () {

// }


// 2. INITIALIZE INSTANCES IMMEDIATELY (Fixes 'router' and 'route' no-undef) 🎯
const router = useRouter();
const route = useRoute();

// 3. REACTIVE STATE VARIABLES
const isClientAuthenticated = ref(false);
const clientEmail = ref('');
const loginDialogVisible = ref(false);
const isLoginFormValid = ref(false);
const isLoginLoading = ref(false);
const loginPayload = ref({ email: '', password: '' });

// 4. BUSINESS LOGIC FUNCTIONS
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
      console.error("Login error:", error.response?.data);
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
  router.push('/'); // 👈 Uses 'router' safely down here
};

// 5. LIFECYCLE HOOKS & WATCHERS (Placed safely below variable creation) 🎯
onMounted(() => {
  checkClientSession();
});

watch(
  () => route?.path, // 👈 Uses 'route' safely down here
  (newPath) => {
    if (newPath) {
      checkClientSession();
    }
  },
  { immediate: true }
);




// Chargement dès l'ouverture de la page

</script>
