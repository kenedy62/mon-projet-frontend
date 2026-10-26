<template>
  <v-app>
    <div class="login">
      <!-- py-12 supprime les marges forcées ma-9 et rend la page responsive sur mobile -->
      <v-container class="py-12" fluid>
        <v-row align="center" justify="center" class="ma-0">
          <v-sheet class="bg-orange-lighten-5 pa-4 pa-sm-12 rounded-xl" width="100%" max-width="500">
            <v-card class="mx-auto px-4 py-6 rounded-xl" elevation="12">
              
              <v-card-item class="text-center mb-4">
                <v-card-title class="text-h5 font-weight-black text-orange-darken-4">Espace Connexion</v-card-title>
                <v-card-subtitle>Accédez à votre tableau de bord d'administration</v-card-subtitle>
              </v-card-item>

              <v-form v-model="formValid" @submit.prevent="login">
                <!-- Champ E-mail -->
                <v-text-field
                  v-model="user.email"
                  :readonly="loading"
                  :rules="[v => !!v || 'E-mail requis']"
                  variant="outlined"
                  label="Email"
                  prepend-inner-icon="mdi-email-outline"
                  clearable
                  class="mb-2"
                ></v-text-field>

                <!-- Champ Mot de passe -->
                <v-text-field
                  v-model="user.password"
                  :readonly="loading"
                  :rules="[v => !!v || 'Mot de passe requis']"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  variant="outlined"
                  label="Password"
                  placeholder="Entrez votre mot de passe"
                  prepend-inner-icon="mdi-lock-outline"
                  clearable
                  @click:append-inner="visible = !visible"
                  class="mb-4"
                ></v-text-field>

                <!-- Bouton Connexion -->
                <v-btn
                  :disabled="!formValid"
                  :loading="loading"
                  color="orange-darken-4"
                  size="large"
                  type="submit"
                  variant="flat"
                  block
                  class="text-none font-weight-bold rounded-lg py-3"
                >
                  Se Connecter
                </v-btn>
              </v-form>

            </v-card>
          </v-sheet>
        </v-row>
      </v-container>
    </div>

    <!-- ========================================================= -->
    <!-- 🚨 MODALE D'ALERTE : PLACÉE PROPREMENT AU NIVEAU DE V-APP  -->
    <!-- ========================================================= -->
    <v-dialog v-model="errorDialog" max-width="400px" transition="dialog-transition">
      <v-card class="rounded-xl pa-4 text-center border" flat>
        <v-card-text class="pt-4">
          <v-avatar color="red-lighten-5" size="70" class="mb-4">
            <v-icon color="red-darken-2" size="40">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Connexion Échouée</h3>
          <p class="text-body-2 text-grey-darken-1 px-2">{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions class="justify-center pb-2">
          <v-btn color="red-darken-2" variant="flat" class="text-none font-weight-bold px-8 rounded-lg" @click="errorDialog = false">
            Réessayer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { accountService } from '@/_services';

export default {
  name: 'LoginView',
  data() {
    return {
      // 1. Les inputs du formulaire restent groupés pour le service
      user: {
        email: '',
        password: ''
      },
      // 2. Les variables d'état de l'interface sont sorties à la racine de data 🎯
      formValid: false,
      loading: false,
      visible: false,
      errorDialog: false,
      errorMessage: ''
    };
  },
  methods: {
    login() {
      if (!this.formValid) return;
      
      this.loading = true;
      
      accountService.login(this.user)   
        .then(response => { 
          console.log("Données de connexion reçues :", response.data);
          
          // Extraction adaptative du token (selon vos deux lignes de test de votre ancien code)
          const token = response.data.token || response.data.access_token;
          
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('auth_token', token);
            accountService.saveToken(token);
          }

          // Redirection vers la page de gestion
          // Correction de ./gestion en /admin/produits ou votre route absolue
          this.$router.push('/gestion'); 
        })
        .catch((error) => {
          console.error("Détails du rejet dans le composant :", error.response?.data);
          
          // 🎯 FONCTIONNE ENFIN : Les variables sont lues car situées à la racine de data()
          this.errorMessage = error.response?.data?.error || "Adresse e-mail ou mot de passe incorrect. Veuillez vérifier vos accès.";
          this.errorDialog = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-center: center;
  justify-content: center;
  background-color: #fafafa;
}
</style>
