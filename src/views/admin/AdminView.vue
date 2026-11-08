
<template>
  <v-app>
    <div class="AdminView">
      <v-responsive class="rounded">
        <AppbarView></AppbarView>
        <MenueView></MenueView>
        
        <v-main>
          <!-- Utilisation d'un v-container fluide bien proportionné -->
          <v-container class="py-6 px-4">
            
            <!-- EN-TÊTE DE LA PAGE CORRIGÉ ET RESPONSIVE 🎯 -->
            <v-row class="mb-4">
              <v-col cols="12">
                <h1 class="text-h4 font-weight-black text-grey-darken-3 mb-1">
                  Mon Profil Administrateur
                </h1>
                <p class="text-body-2 text-medium-emphasis">
                  Gérer vos accès de connexion sécurisés et vos coordonnées de réception de commandes WhatsApp.
                </p>
              </v-col>
            </v-row>

            <!-- GRILLE DE FORMULAIRES ADAPTATIVE -->
            <v-row>
              <!-- COMPOSANT 1 : INFORMATIONS DE CONTACT (EMAIL & WHATSAPP) -->
              <!-- cols="12" (mobile) | md="6" (ordinateur) -->
              <v-col cols="12" md="6" class="d-flex">
                <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
                  <v-card-title class="px-0 font-weight-bold text-h6 text-grey-darken-3 mb-2">
                    Coordonnées professionnelles
                  </v-card-title>
                  
                  <v-card-text class="px-0 pt-0 flex-grow-1 d-flex flex-column">
                    <v-form @submit.prevent="saveContactInfo" class="d-flex flex-column flex-grow-1">
                      <!-- Adresse E-mail -->
                      <v-text-field
                        v-model="profileForm.email"
                        label="Adresse e-mail de connexion"
                        variant="outlined"
                        prepend-inner-icon="mdi-email-outline"
                        type="email"
                        required
                        hide-details="auto"
                        class="mb-4"
                      ></v-text-field>

                      <!-- Numéro WhatsApp -->
                      <v-text-field
                        v-model="profileForm.whatsappNumber"
                        label="Numéro WhatsApp (Ex: 237699999999)"
                        variant="outlined"
                        prepend-inner-icon="mdi-whatsapp"
                        placeholder="2376xxxxxxxx"
                        required
                        hide-details="auto"
                        class="mb-4"
                      ></v-text-field>

                      <!-- Lien Facebook -->
                      <v-text-field
                        v-model="profileForm.facebookUrl"
                        label="Lien complet de votre page Facebook"
                        variant="outlined"
                        prepend-inner-icon="mdi-facebook"
                        placeholder="https://facebook.com"
                        required
                        hide-details="auto"
                        class="mb-6"
                      ></v-text-field>

                      <!-- Le mt-auto force le bouton à rester parfaitement aligné en bas de la carte -->
                      <v-btn type="submit" color="success" block class="text-none font-weight-bold mt-auto" size="large">
                        Enregistrer les coordonnées
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- COMPOSANT 2 : CHANGEMENT DE MOT DE PASSE -->
              <v-col cols="12" md="6" class="d-flex">
                <v-card border flat class="rounded-xl pa-4 w-100 d-flex flex-column elevation-1">
                  <v-card-title class="px-0 font-weight-bold text-h6 text-grey-darken-3 mb-2">
                    Sécurité du compte
                  </v-card-title>
                  
                  <v-card-text class="px-0 pt-0 flex-grow-1 d-flex flex-column">
                    <v-form @submit.prevent="savePassword" class="d-flex flex-column flex-grow-1">
                      <!-- Mot de passe actuel -->
                      <v-text-field
                        v-model="passwordForm.current"
                        label="Mot de passe actuel"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                         @click:append-inner="visible = !visible"
                  
                        variant="outlined"
                        required
                        hide-details="auto"
                        class="mb-4"
                      ></v-text-field>

                      <!-- Nouveau mot de passe -->
                      <v-text-field
                        v-model="passwordForm.new"
                        label="Nouveau mot de passe"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                       
                        variant="outlined"
                        required
                         @click:append-inner="visible = !visible"
                        hide-details="auto"
                        class="mb-6"
                      ></v-text-field>

                      <v-btn type="submit" color="orange-darken-4" block class="text-none font-weight-bold mt-auto" size="large">
                        Changer le mot de passe
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-responsive>
    </div>

    <!-- ========================================================= -->
    <!-- 🛡️ MODALE DE CONFIRMATION DU PROFIL ADMIN (V-DIALOG)       -->
    <!-- ========================================================= -->
    <v-dialog v-model="profileModalDialog" max-width="450px" persistent>
      <v-card class="rounded-xl pa-4 text-center border" flat>
        <v-card-text class="pt-4">
          <v-avatar :color="profileModalSuccess ? 'green-lighten-5' : 'red-lighten-5'" size="70" class="mb-4">
            <v-icon :color="profileModalSuccess ? 'green-darken-2' : 'red-darken-2'" size="40">
              {{ profileModalIcon }}
            </v-icon>
          </v-avatar>
          
          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">
            {{ profileModalSuccess ? 'Profil mis à jour' : 'Action refusée' }}
          </h3>
          
          <p class="text-body-2 text-grey-darken-1 px-2">
            {{ profileModalMessage }}
          </p>
        </v-card-text>

        <v-card-actions class="justify-center pb-2">
          <v-btn
            :color="profileModalSuccess ? 'green-darken-2' : 'red-darken-2'"
            variant="flat"
            class="text-none font-weight-bold px-8 rounded-lg"
            size="large"
            @click="handleModalClose"
          >
            {{ isPasswordChange && profileModalSuccess ? 'Se reconnecter' : 'Continuer' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>


 <script>
    import AppbarView from '@/components/AppbarView.vue';
    import MenueView from '@/components/MenueView.vue';
    
    //import { accountService } from '@/_services';
    //import axios from 'axios';

    export default {
      data() {
    return {

      visible: false,
   
    };
  },
        name:'profilAdmin',
        components: {
            AppbarView,
            MenueView
        },
    }

    </script>
    
<script setup>
import { accountService } from '@/_services';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
// 🎯 Importation alignée avec votre instance centrale d'API
import Axios from '@/_services/caller.service';



// Initialisation du routeur pour les redirections
const router = useRouter(); 

// États des formulaires et de la modale
const profileForm = ref({ email: '', whatsappNumber: '', facebookUrl: '' });
const passwordForm = ref({ current: '', new: '' });

const profileModalDialog = ref(false);
const profileModalSuccess = ref(true);
const profileModalIcon = ref('mdi-check-circle-outline');
const profileModalMessage = ref('');
const isPasswordChange = ref(false);

// Récupération des paramètres au chargement
const loadAdminProfile = () => {
  Axios.get('/api/admin/settings')
    .then(response => {
      if (response.data) {
        // Adaptation si MongoDB renvoie un tableau ou un objet direct
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        profileForm.value.email = data.email || '';
        profileForm.value.whatsappNumber = data.whatsappNumber || '';
        profileForm.value.facebookUrl = data.facebookUrl || '';
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement du profil admin :", error);
    });
};

// Sauvegarde des coordonnées professionnelles
const saveContactInfo = () => {
  isPasswordChange.value = false;
  Axios.post('/api/admin/settings', profileForm.value)
    .then(() => {
      profileModalSuccess.value = true;
      profileModalIcon.value = 'mdi-check-circle-outline';
      profileModalMessage.value = "Vos coordonnées professionnelles ont été enregistrées avec succès.";
      profileModalDialog.value = true;
    })
    .catch(error => {
      profileModalSuccess.value = false;
      profileModalIcon.value = 'mdi-alert-circle-outline';
      profileModalMessage.value = "Impossible d'enregistrer les coordonnées. Veuillez réessayer.";
      profileModalDialog.value = true;
      console.error(error);
    });
};

// Modification du mot de passe
const savePassword = () => {
  isPasswordChange.value = true;
  Axios.post('/api/admin/update-password', passwordForm.value)
    .then(() => {
      profileModalSuccess.value = true;
      profileModalIcon.value = 'mdi-lock-check-outline';
      profileModalMessage.value = "Votre mot de passe a été modifié. Vous devez vous reconnecter.";
      profileModalDialog.value = true;
    })
    .catch(error => {
      profileModalSuccess.value = false;
      profileModalIcon.value = 'mdi-lock-alert-outline';
      profileModalMessage.value = "Le mot de passe actuel est incorrect ou invalide.";
      profileModalDialog.value = true;
      console.error(error);
    });
};

// Gestion de la fermeture de la modale
const handleModalClose = () => {
  profileModalDialog.value = false;
  if (isPasswordChange.value && profileModalSuccess.value) {
    localStorage.removeItem('auth_token');
    router.push('/admin'); // Redirection vers l'interface de connexion
  }
};

onMounted(() => {
  loadAdminProfile();
});
</script>
