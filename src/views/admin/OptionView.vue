 <template>
  <v-app>
    <div class="option">
      <v-responsive>
        <AppbarView></AppbarView>
        <MenueView></MenueView>
        
        <v-main>
          <!-- Utilisation d'un v-container fluide avec padding adapté -->
          <v-container class="py-6 px-4">
            
            <!-- EN-TÊTE DE LA PAGE RESPONSIVE -->
            <v-row class="mb-4 no-gutters">
              <v-col cols="12">
                <h1 class="text-h4 font-weight-black text-grey-darken-3 mb-1">Configuration du Catalogue</h1>
                <p class="text-body-2 text-grey">Gerez les choix disponibles pour les formulaires de produits</p>
              </v-col>
            </v-row>

            <!-- ZONE DE FORMULAIRE RAPIDE ENTIÈREMENT RESPONSIVE 🎯 -->
            <v-card class="pa-4 mb-6 rounded-xl border shadow-1" flat>
              <v-form @submit.prevent="submitOption">
                <v-row density="comfortable" align="center">
                  
                  <!-- Champ Nom (Prend 100% de la largeur sur mobile, s'adapte sur PC) -->
                  <v-col cols="12" :sm="isEditing ? 8 : 5">
                    <v-text-field 
                      v-model="newOption.name" 
                      :label="isEditing ? 'Modifier le nom' : 'Nouveau choix (Ex: Gingembre)'" 
                      variant="outlined" 
                      hide-details="auto" 
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Champ Type (Masqué automatiquement en mode édition) -->
                  <v-col cols="12" sm="4" v-if="!isEditing">
                    <v-select 
                      v-model="newOption.type" 
                      :items="[{title:'Ingrédient', value:'ingredient'}, {title:'Bienfait', value:'bienfait'}]" 
                      label="Type de donnée" 
                      variant="outlined" 
                      hide-details="auto" 
                      required
                    ></v-select>
                  </v-col>
                  
                  <!-- Boutons d'Action (S'empilent sur mobile, hauteur auto fluide) -->
                  <v-col cols="12" :sm="isEditing ? 4 : 3" class="d-flex align-center ga-2">
                    <v-btn 
                      type="submit" 
                      color="orange-darken-4" 
                      block 
                      size="large" 
                      variant="flat"
                      class="text-none font-weight-bold rounded-lg flex-grow-1"
                    >
                      {{ isEditing ? 'Mettre à jour' : 'Ajouter à la liste' }}
                    </v-btn>
                    
                    <v-btn 
                      v-if="isEditing" 
                      icon="mdi-close" 
                      variant="outlined" 
                      color="grey-darken-1" 
                      size="large"
                      class="rounded-lg"
                      @click="cancelEdit"
                    ></v-btn>
                  </v-col>

                </v-row>
              </v-form>
            </v-card>

            <!-- GRILLE DES TABLEAUX ADAPTATIVE (1 colonne sur mobile, 2 sur PC) -->
            <v-row>
              <!-- TABLEAU 1 : LES INGRÉDIENTS -->
              <v-col cols="12" md="6" class="mb-4 mb-md-0">
                <v-card border flat class="rounded-xl pa-2 shadow-1">
                  <v-card-title class="text-subtitle-1 font-weight-bold text-grey-darken-3 px-2 py-3">
                    🌿 Liste des Ingrédients
                  </v-card-title>
                  <v-data-table 
                    :hide-default-footer="ingredientsList.length < 11" 
                    :headers="headers" 
                    :items="ingredientsList" 
                    density="comfortable"
                    class="text-body-2"
                  >
                    <template #[`item.actions`]="{ item }">
                      <div class="d-flex ga-1 justify-end">
                        <v-btn icon="mdi-pencil" size="small" variant="text" color="green" @click="startEdit(item)"></v-btn>
                        <v-btn icon="mdi-delete" size="small" variant="text" color="red" @click="deleteOption(item.raw?._id || item._id)"></v-btn>
                      </div>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>

              <!-- TABLEAU 2 : LES BIENFAITS -->
              <v-col cols="12" md="6">
                <v-card border flat class="rounded-xl pa-2 shadow-1">
                  <v-card-title class="text-subtitle-1 font-weight-bold text-grey-darken-3 px-2 py-3">
                    ✨ Liste des Bienfaits
                  </v-card-title>
                  <v-data-table 
                    :hide-default-footer="bienfaitsList.length < 11" 
                    :headers="headers" 
                    :items="bienfaitsList" 
                    density="comfortable"
                    class="text-body-2"
                  >
                    <template #[`item.actions`]="{ item }">
                      <div class="d-flex ga-1 justify-end">
                        <v-btn icon="mdi-pencil" size="small" variant="text" color="green" @click="startEdit(item)"></v-btn>
                        <v-btn icon="mdi-delete" size="small" variant="text" color="red" @click="deleteOption(item.raw?._id || item._id)"></v-btn>
                      </div>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>

          </v-container>
        </v-main>
      </v-responsive>
    </div>

    <!-- MODALE DE CONFIRMATION DES ACTIONS -->
    <v-dialog v-model="optionModalDialog" max-width="450px" transition="dialog-transition">
      <v-card class="rounded-xl pa-4 text-center border" flat>
        <v-card-text class="pt-4">
          <v-avatar :color="optionModalSuccess ? 'green-lighten-5' : 'red-lighten-5'" size="70" class="mb-4">
            <v-icon :color="optionModalSuccess ? 'green-darken-2' : 'red-darken-2'" size="40">
              {{ optionModalIcon }}
            </v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">
            {{ optionModalSuccess ? 'Configuration à jour' : 'Action interrompue' }}
          </h3>
          <p class="text-body-2 text-grey-darken-1 px-2">
            {{ optionModalMessage }}
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-2">
          <v-btn :color="optionModalSuccess ? 'green-darken-2' : 'red-darken-2'" variant="flat" class="text-none font-weight-bold px-8 rounded-lg" size="large" @click="optionModalDialog = false">
            Continuer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- MODALE DE CONFIRMATION DE SUPPRESSION -->
    <v-dialog v-model="optionDeleteDialog" max-width="450px" persistent>
      <v-card class="rounded-xl pa-4 text-center border" flat>
        <v-card-text class="pt-4">
          <v-avatar color="red-lighten-5" size="70" class="mb-4">
            <v-icon color="red-darken-2" size="40">mdi-alert-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-black text-grey-darken-3 mb-2">Supprimer ce choix ?</h3>
          <p class="text-body-2 text-grey-darken-1 px-2" v-if="optionToDelete">
            Êtes-vous sûr de vouloir supprimer définitivement 
            <span class="font-weight-bold">{{ optionToDelete.type === 'ingredient' ? 'l\'ingrédient' : 'le bienfait' }}</span> 
            <strong class="text-red-darken-2">"{{ optionToDelete.name }}"</strong> ? 
            Il ne sera plus disponible dans les menus déroulants lors de la création de vos prochains produits.
          </p>
        </v-card-text>
        <v-card-actions class="justify-center ga-3 pb-2">
          <v-btn variant="outlined" color="grey-darken-1" class="text-none font-weight-bold px-6 rounded-lg" size="large" @click="optionDeleteDialog = false">
            Annuler
          </v-btn>
          <v-btn color="red-darken-2" variant="flat" class="text-none font-weight-bold px-6 rounded-lg text-white" size="large" @click="executeDeleteOption">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
    import AppbarView from '@/components/AppbarView.vue';
    import MenueView from '@/components/MenueView.vue';
    export default {
        name:'OptionView.vue',
        components: {
            AppbarView,
            MenueView
        }
    }
    </script>
<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Variables d'état existantes
const optionDeleteDialog = ref(false); // Ouvre/ferme la modale de question (true/false)
const optionToDelete = ref(null);       // Stocke temporairement l'élément ciblé
const options = ref([]);
const isEditing = ref(false);
const currentId = ref(null);
const newOption = ref({ name: '', type: 'ingredient' });

const headers = [
  { title: 'Nom', key: 'name', align: 'start' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end', width: '110px' }
];

// ==========================================
// 🎯 NOUVELLES VARIABLES DE CONTRÔLE DE LA MODALE OPTIONS
// ==========================================
const optionModalDialog = ref(false);   // Ouvre/ferme la modale (true/false)
const optionModalSuccess = ref(true);   // Vert (Succès) ou Rouge (Échec)
const optionModalMessage = ref('');     // Texte dynamique affiché
const optionModalIcon = ref('mdi-check-circle-outline'); // Icône dynamique

// Fonction utilitaire pour déclencher la modale d'alerte Vuetify
const triggerOptionModal = (message, isSuccess = true, icon = 'mdi-check-circle-outline') => {
  optionModalMessage.value = message;
  optionModalSuccess.value = isSuccess;
  optionModalIcon.value = icon;
  optionModalDialog.value = true;
};

// Séparation des données pour alimenter les deux tableaux distincts
const ingredientsList = computed(() => options.value.filter(o => o.type === 'ingredient'));
const bienfaitsList = computed(() => options.value.filter(o => o.type === 'bienfait'));

// Récupérer toutes les options depuis la base de données
const fetchOptions = () => {
  axios.get('http://localhost:3000/api/options')
    .then(res => { options.value = res.data || []; })
    .catch(err => console.error(err));
};

// Soumettre le formulaire (Ajout ou Modification) - UPGRADED 🎯
const submitOption = () => {
  if (!newOption.value.name.trim()) {
    triggerOptionModal("Le champ texte ne peut pas être vide.", false, 'mdi-alert-circle-outline');
    return;
  }

  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': `Bearer ${token}` } };
  const payload = { name: newOption.value.name.trim(), type: newOption.value.type };

  if (isEditing.value) {
    // 🔄 SUCCÈS MODE MODIFICATION (PUT)
    axios.put(`http://localhost:3000/api/options/${currentId.value}`, { name: newOption.value.name }, config)
      .then(() => {
        const typeLabel = newOption.value.type === 'ingredient' ? 'L\'ingrédient' : 'Le bienfait';
        cancelEdit();
        fetchOptions();
        
        // 🎯 Déclenchement de la modale Vuetify
        triggerOptionModal(`${typeLabel} a été modifié avec succès !`, true, 'mdi-pencil-box-outline');
      })
      .catch(err => {
        console.error(err);
        triggerOptionModal("Une erreur est survenue lors de la modification.", false, 'mdi-alert-octagon-outline');
      });
  } else {
    // 🔄 SUCCÈS MODE CRÉATION (POST)
    axios.post('http://localhost:3000/api/options', payload, config)
      .then(() => {
        const typeLabel = newOption.value.type === 'ingredient' ? 'Nouvel ingrédient' : 'Nouveau bienfait';
        const savedName = newOption.value.name;
        newOption.value.name = ''; 
        fetchOptions();
        
        // 🎯 Déclenchement de la modale Vuetify
        triggerOptionModal(`${typeLabel} "${savedName}" ajouté avec succès à vos formulaires !`, true, 'mdi-plus-box-outline');
      })
      .catch(err => {
        console.error(err);
        triggerOptionModal("Impossible d'enregistrer ce choix. Il existe peut-être déjà.", false, 'mdi-alert-octagon-outline');
      });
  }
};

const startEdit = (item) => {
  const raw = item.raw || item;
  isEditing.value = true;
  currentId.value = raw._id;
  newOption.value.name = raw.name;
  newOption.value.type = raw.type; // On verrouille le type pendant l'édition
};

const cancelEdit = () => {
  isEditing.value = false;
  currentId.value = null;
  newOption.value.name = '';
};

// Supprimer définitivement une option - UPGRADED 🎯
const deleteOption = (id) => {
  // 1. On cherche l'objet complet dans notre tableau d'options pour récupérer son nom
  const found = options.value.find(o => o._id === id);
  if (!found) return;

  // 2. On mémorise l'objet ciblé dans notre variable réactive
  optionToDelete.value = found;

  // 3. On ouvre la modale rouge de question à l'écran
  optionDeleteDialog.value = true;
};

// Étape B : Cette fonction s'exécute UNIQUEMENT si l'administrateur clique sur "Supprimer" 🔴
const executeDeleteOption = () => {
  if (!optionToDelete.value) return;

  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': `Bearer ${token}` } };
  
  const idToDelete = optionToDelete.value._id;
  const nameToDelete = optionToDelete.value.name;
  const typeLabel = optionToDelete.value.type === 'ingredient' ? 'L\'ingrédient' : 'Le bienfait';

  optionDeleteDialog.value = false; // Ferme la boîte de question rouge

  // Appel de votre API de suppression existante
  axios.delete(`http://localhost:3000/api/options/${idToDelete}`, config)
    .then(() => {
      fetchOptions(); // Recharge les deux listes dynamiquement à l'écran
      
      // On déclenche votre modale verte de succès que nous avons créée à l'étape précédente !
      triggerOptionModal(
        `${typeLabel} "${nameToDelete}" a été définitivement retiré des configurations de vos formulaires.`, 
        true, 
        'mdi-delete-empty-outline'
      );
    })
    .catch(err => {
      console.error(err);
      triggerOptionModal("Une erreur réseau est survenue. Impossible de supprimer cet élément.", false, 'mdi-alert-octagon-outline');
    })
    .finally(() => {
      optionToDelete.value = null; // Libère la mémoire
    });
};

onMounted(() => {
  fetchOptions();
});
</script>
