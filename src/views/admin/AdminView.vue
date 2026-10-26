
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
import axios from 'axios';

// Initialisation du routeur pour les redirections
const router = useRouter(); 

// États des formulaires existants
const profileForm = ref({ email: '', whatsappNumber: '', facebookUrl: '' });
const passwordForm = ref({ current: '', new: '' });
// ==========================================
// 🎯 NOUVELLES VARIABLES DE CONTRÔLE DE LA MODALE PROFIL
// ==========================================
const profileModalDialog = ref(false);   // Ouvre/ferme la modale (true/false)
const profileModalSuccess = ref(true);   // Style Vert (Succès) ou Rouge (Échec)
const profileModalMessage = ref('');     // Texte dynamique affiché
const profileModalIcon = ref('mdi-check-circle-outline'); // Icône dynamique
const isPasswordChange = ref(false);     // Détecte s'il faut rediriger vers le login après fermeture

// Fonction utilitaire pour déclencher la modale d'alerte Vuetify
const triggerProfileModal = (message, isSuccess = true, icon = 'mdi-check-circle-outline', forceLogout = false) => {
  profileModalMessage.value = message;
  profileModalSuccess.value = isSuccess;
  profileModalIcon.value = icon;
  isPasswordChange.value = forceLogout;
  profileModalDialog.value = true;
};

// Fonction appelée lors du clic sur le bouton de fermeture de la modale 🎯
const handleModalClose = () => {
  profileModalDialog.value = false;
  
  // 🚀 Si le mot de passe a été changé avec succès, on applique le nettoyage et la redirection absolue
  if (isPasswordChange.value && profileModalSuccess.value) {
    localStorage.removeItem('token'); // Supprime le token administrateur
    localStorage.removeItem('auth_token'); // Supprime l'autre clé si présente
    router.push('/admin'); // Redirection vers votre page de connexion d'origine
  }
};

// Récupérer les informations du profil au chargement
const loadAdminProfile = () => {
  axios.get('http://localhost:3000/api/admin/settings')
    .then(response => {
      profileForm.value.email = response.data.email || '';
      profileForm.value.whatsappNumber = response.data.whatsappNumber || '';
      // 🎯 FIX : Ne pas oublier de charger le lien Facebook existant pour pré-remplir l'input !
      profileForm.value.facebookUrl = response.data.facebookUrl || '';
    })
    .catch(error => console.error("Erreur de chargement du profil :", error));
};

// Enregistrer les coordonnées (Email, WhatsApp, Facebook) 🎯
const saveContactInfo = () => {
  // 🎯 FIX : On passe le facebookUrl au bon endroit, dans les coordonnées de l'admin !
  const payload = { 
    email: profileForm.value.email, 
    whatsappNumber: profileForm.value.whatsappNumber,
    facebookUrl: profileForm.value.facebookUrl 
  };

  accountService.updateSettings(payload)
    .then(() => {
      // 🎯 Remplacement de l'alert() par la modale verte Vuetify
      triggerProfileModal(
        "Vos coordonnées professionnelles (E-mail, numéro WhatsApp et lien Facebook) ont été enregistrées et synchronisées avec succès !",
        true,
        'mdi-card-account-phone-outline',
        false // Pas de déconnexion requise pour cette action
      );
      loadAdminProfile(); // Recharge les données fraîches
    })
    .catch(error => {
      const errorMsg = error.response?.data?.error || "Une erreur est survenue lors de la mise à jour.";
      triggerProfileModal(errorMsg, false, 'mdi-alert-octagon-outline', false);
    });
};

// Sauvegarde du mot de passe sécurisé 🎯
const savePassword = () => {
  const payload = { 
    currentPassword: passwordForm.value.current, 
    newPassword: passwordForm.value.new
  };

  accountService.updateSettings(payload)
    .then(() => {
      // Réinitialisation instantanée des champs de saisie
      passwordForm.value.current = '';
      passwordForm.value.new = '';

      // 🎯 Remplacement de l'alert() par la modale verte Vuetify avec paramètre de déconnexion forcée
      triggerProfileModal(
        "Votre mot de passe a été modifié avec succès ! Pour des raisons de sécurité, votre session va être fermée. Veuillez vous reconnecter avec vos nouveaux accès.",
        true,
        'mdi-lock-check-outline',
        true // Active la déconnexion forcée lors du clic de fermeture de la modale
      );
    })
    .catch(error => {
      const errorMsg = error.response?.data?.error || "Mot de passe actuel incorrect ou validation échouée.";
      triggerProfileModal(errorMsg, false, 'mdi-alert-octagon-outline', false);
    });
};

onMounted(() => {
  loadAdminProfile();
});
</script>
