
    <template>
        <v-app>
        <div class='Produit'>
            <v-responsive class="rounded">
                <AppbarView></AppbarView>
                <MenueView></MenueView>
            <v-main> 
           <v-container class="py-6 px-4">
  
  <!-- RESPONSIVE PANEL TITLE & ACTION TRIGGER BAR 🎯 -->
  <v-row align="center" justify="space-between" class="mb-6 no-gutters">
    <!-- Title Section -->
    <v-col cols="12" sm="7" class="text-left mb-4 mb-sm-0">
      <h1  class="text-h4 font-weight-black text-grey-darken-3 mb-1">Gestion de produit</h1>   
      <p class="text-body-2 text-grey">Gérez le catalogue de votre site</p> 
    </v-col>

    <!-- Modal Button Section (Toggles full width on mobile instantly) -->
    <v-col cols="12" sm="4" md="3" class="d-flex justify-end">
      <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            color="orange-darken-4"
            size="large"
            variant="flat"
            block
            prepend-icon="mdi-plus"
            class="text-none font-weight-bold rounded-lg py-3"
            v-bind="activatorProps"
          >
            Ajouter un Produit
          </v-btn>
        </template>

        <!-- FORM MODAL SECTION (Cleaned and scaled for mobile screens) -->
        <v-form v-model="formValid" @submit.prevent="validate" ref="form">
          <v-card prepend-icon="mdi-package-variant-closed" class="rounded-xl overflow-hidden">
            <template v-slot:title>
              <span class="font-weight-bold text-grey-darken-3">
                {{ isEditing ? 'Modification du Produit' : 'Création d\'un Produit' }}
              </span>
            </template>
            <template v-slot:subtitle>
              <span>{{ isEditing ? 'Modifier' : 'Enregistrer' }} les détails du catalogue</span>
            </template>

            <v-card-text class="pa-4 pa-sm-6">
              <v-row density="comfortable">
                
                <!-- Titre -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="produit.titre" label="Titre" :rules="titreRules" required variant="outlined" hide-details="auto"></v-text-field>
                </v-col>
                
                <!-- Nom -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="produit.nom" :readonly="loading" :rules="nomRules" variant="outlined" label="Nom du produit" required hide-details="auto"></v-text-field>
                </v-col>
                
                <!-- Prix -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model.number="produit.price" type="number" :rules="prixRules" variant="outlined" label="Prix (CFA)" required hide-details="auto"></v-text-field>
                </v-col>

                <!-- Note (sur 5) -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model.number="produit.rating" type="number" label="Note (sur 5)" step="0.1" min="0" max="5" variant="outlined" hide-details="auto"></v-text-field>
                </v-col>

                <!-- Nombre d'avis -->
                <v-col cols="12" sm="12" md="6">
                  <v-text-field v-model.number="produit.commentCount" type="number" label="Nombre d'avis" variant="outlined" hide-details="auto"></v-text-field>
                </v-col>
                
                <!-- Ingrédients -->
                <v-col cols="12">
                  <v-autocomplete v-model="produit.selectedIngredients" :items="defaultIngredients" label="Choisir les ingrédients" multiple chips closable-chips variant="outlined" :rules="ingredientRules" required hide-details="auto"></v-autocomplete>
                </v-col>
                
                <!-- Bienfaits -->
                <v-col cols="12">
                  <v-autocomplete v-model="produit.selectedBienfaits" :items="defaultBienfaits" label="Choisir les bienfaits" multiple chips closable-chips variant="outlined" :rules="bienfaitsRules" required hide-details="auto"></v-autocomplete>
                </v-col>
                
                <!-- Description / Commentaire -->
                <v-col cols="12" sm="7" md="8">
                  <v-textarea v-model="produit.description" label="Description du produit..." variant="outlined" :counter="50" bg-color="white" :rules="commantaireRules" hide-details="auto" rows="3"></v-textarea>
                </v-col>
                
                <!-- Image Fichier -->
                <v-col cols="12" sm="5" md="4">
                  <v-file-input type="file" accept="image/*" @change="onFileSelected" :rules="rules" label="Image produit" prepend-icon="mdi-camera" variant="outlined" hide-details="auto"></v-file-input>
                </v-col>

              </v-row>
              <div class="text-caption text-medium-emphasis mt-4">* Tous les champs marqués sont requis</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn class="text-none font-weight-bold" variant="plain" color="grey-darken-1" @click="fermer">Fermer</v-btn>
              <v-btn :disabled="!formValid" :loading="loading" type="submit" color="orange-darken-4" variant="flat" class="text-none font-weight-bold px-6 rounded-lg">Enregistrer</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-col>
  </v-row>

  <!-- SEARCH INPUT CONTAINER PANEL -->
  <v-card flat class="mb-4 rounded-xl border">
    <v-card-title class="pa-3">
      <v-text-field
        v-model="search"
        density="compact"
        label="Rechercher un produit dans le catalogue..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined" 
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>
  </v-card>

  <!-- DATA TABLE LAYER CONTAINER (Wrapped inside a responsive shell box wrapper) 🎯 -->
  <v-card border flat class="rounded-xl overflow-hidden shadow-1">
    <v-data-table
      v-model:search="search"
      :headers="headers"
      :hide-default-footer="produits.length < 11"
      :items="produits"
      class="text-body-2"
    >
      <!-- Image Rendering Column Slot -->
      <template #[`item.imageUrl`]="{ value }">
        <v-img :src="value" height="44px" width="44px" cover class="rounded-lg bg-grey-lighten-2 my-1 border"></v-img>
      </template>

      <!-- Ingredients Layout Render Slot -->
      <template #[`item.ingredient`]="{ value }">
        <div class="d-flex flex-wrap align-center">
          <v-chip v-for="(ing, index) in (value || [])" :key="index" size="small" color="primary" variant="tonal" class="ma-1">
            {{ ing }}
          </v-chip>
        </div>
      </template>

      <!-- Benefits Layout Render Slot -->
      <template #[`item.bienfaits`]="{ value }">
        <div class="d-flex flex-wrap align-center">
          <v-chip v-for="(bienfait, index) in (value || [])" :key="index" size="small" color="success" variant="tonal" class="ma-1">
            {{ bienfait }}
          </v-chip>
        </div>
      </template>

      <!-- Actions Shortcut Menu Drawer Trigger Slots -->
      <template #[`item.actions`]="{ item }">
        <div class="d-flex ga-3 justify-end align-center px-2">
          <v-btn icon="mdi-pencil" size="large" color="green" variant="text" @click="edit(item)"></v-btn>
          <v-btn icon="mdi-delete" size="large" color="red" variant="text" @click="remove(item)"></v-btn>
        </div>
      </template>

      <!-- Fallback Data Recovery Reset Button Link -->
      <template v-slot:no-data>
        <div class="py-6">
          <p class="text-body-1 text-grey mb-3">Aucun produit ne correspond à vos critères.</p>
          <v-btn prepend-icon="mdi-backup-restore" rounded="lg" class="text-none font-weight-bold" variant="outlined" color="orange-darken-4" @click="reset">
            Réinitialiser le catalogue
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>

</v-container>

        </v-main>
    </v-responsive>
        </div>
        </v-app>
        <!-- ========================================================= -->
<!-- 🛡️ MODALE DE CONFIRMATION DES ACTIONS ACTIONS CATALOGUE  -->
<!-- ========================================================= -->
<v-dialog v-model="adminActionDialog" max-width="450px" transition="dialog-transition">
  <v-card class="rounded-xl pa-4 text-center border" flat>
    <v-card-text class="pt-4">
      
      <!-- Avatar coloré réactif selon le statut Succès/Erreur -->
      <v-avatar 
        :color="adminActionSuccess ? 'green-lighten-5' : 'red-lighten-5'" 
        size="70" 
        class="mb-4"
      >
        <v-icon 
          :color="adminActionSuccess ? 'green-darken-2' : 'red-darken-2'" 
          size="40"
        >
          {{ adminActionIcon }}
        </v-icon>
      </v-avatar>
      
      <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">
        {{ adminActionSuccess ? 'Opération réussie' : 'Échec de l\'action' }}
      </h3>
      
      <!-- Message dynamique -->
      <p class="text-body-2 text-grey-darken-1 px-2">
        {{ adminActionMessage }}
      </p>

    </v-card-text>

    <v-card-actions class="justify-center pb-2">
      <v-btn
        :color="adminActionSuccess ? 'green-darken-2' : 'red-darken-2'"
        variant="flat"
        class="text-none font-weight-bold px-8 rounded-lg"
        size="large"
        @click="adminActionDialog = false"
      >
        Fermer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
<!-- ========================================================= -->
<!-- ⚠️ MODALE DE QUESTION : CONFIRMATION DE SUPPRESSION        -->
<!-- ========================================================= -->
<v-dialog v-model="deleteConfirmDialog" max-width="450px" persistent>
  <v-card class="rounded-xl pa-4 text-center border" flat>
    <v-card-text class="pt-4">
      
      <!-- Icône d'avertissement rouge -->
      <v-avatar color="red-lighten-5" size="70" class="mb-4">
        <v-icon color="red-darken-2" size="40">mdi-alert-outline</v-icon>
      </v-avatar>
      
      <h3 class="text-h5 font-weight-black text-grey-darken-3 mb-2">
        Confirmer la suppression ?
      </h3>
      
      <!-- Affichage dynamique du nom du produit ciblé -->
      <p class="text-body-2 text-grey-darken-1 px-2" v-if="productToDelete">
        Êtes-vous sûr de vouloir supprimer définitivement le produit 
        <strong class="text-red-darken-2">"{{ productToDelete.titre }}"</strong> ? 
        Cette action est irréversible et supprimera également ses données associées.
      </p>

    </v-card-text>

    <!-- BOUTONS D'ACTIONS DOUBLE OPTION -->
    <v-card-actions class="justify-center ga-3 pb-2">
      <!-- Bouton Annuler (Ferme la modale sans rien faire) -->
      <v-btn
        variant="outlined"
        color="grey-darken-1"
        class="text-none font-weight-bold px-6 rounded-lg"
        size="large"
        @click="deleteConfirmDialog = false"
      >
        Annuler
      </v-btn>

      <!-- Bouton Confirmer (Déclenche la suppression en BDD) -->
      <v-btn
        color="red-darken-2"
        variant="flat"
        class="text-none font-weight-bold px-6 rounded-lg text-white"
        size="large"
        @click="executeDelete"
      >
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    </template>

 <script>
    import { ref } from 'vue'
    import AppbarView from '@/components/AppbarView.vue';
    import MenueView from '@/components/MenueView.vue';
    
    //import { accountService } from '@/_services';
    //import axios from 'axios';

    export default {
        name:'ProduitView',
//         data (){
//             return{
//                 produit:{
//                     titre:'',
//                     nom:'',
//                     price:'',
//                     bienfaits:'',
//                     description:'',
//                     imageUrl:'',

//                 },
             
//                      // 1. Tableau des ingrédients sélectionnés par l'utilisateur
//       selectedIngredients: [], 
//        selectedBienfaits: [],
//       // 2. Votre liste d'ingrédients par défaut pour le v-autocomplete
//       defaultIngredients: ['Farine', 'Sucre', 'Œufs', 'Chocolat', 'Lait', 'Beurre', 'Miel'],
//        defaultBienfaits: ['Énergie', 'Digestion', 'Antioxydant', 'Riche en Vitamine C', 'Relaxant']
       
//             }

//         },
        
//         methods: {
//            onFileSelected(event) {
//   const files = event.target.files || event.currentTarget.files;
//   if (files && files.length > 0) {
//     this.selectedFile = files[0]; // Stocke le fichier JavaScript brut, pas la liste FileList
//   }
// },

//             validate(){
//                   const formData = new FormData();
      
//       // Injection des champs de texte de "data" dans le FormData
//       formData.append('titre', this.produit.titre);
//       formData.append('nom', this.produit.nom);
//       formData.append('price', this.produit.price);
//       formData.append('description', this.produit.description);
//       formData.append('ingredient', JSON.stringify(this.selectedIngredients));
//       formData.append('bienfaits', JSON.stringify(this.selectedBienfaits));

//       formData.append('imageUrl', this.selectedFile);
//                 produitService.createThing(formData)
                
//                .then(res => console.log(res))
//                .catch(err => console.log(err))
//                 console.log(formData)
//             },
//         },
        components: {
            AppbarView,
            MenueView
        }
    }



    </script>
<script setup>
// ==========================================
// 1. IMPORTS DES MODULES (Toujours en premier)
// ==========================================
import {  onMounted } from 'vue'; // 🎯 FIX : 'ref' ajouté aux imports fondamentaux
import axios from 'axios';
import { produitService } from '@/_services/produit.service'; // Assurez-vous que le chemin est exact



const adminActionDialog = ref(false);  // Ouvre/ferme la modale (true/false)
const adminActionSuccess = ref(true);  // Style Vert (Succès) ou Rouge (Échec)
const adminActionMessage = ref('');    // Texte dynamique affiché dans la modale
const adminActionIcon = ref('mdi-check-circle-outline'); // Icône dynamique
const deleteConfirmDialog = ref(false); // Ouvre/ferme la modale de question (true/false)
const productToDelete = ref(null);      // Stocke temporairement le produit ciblé

// Fonction utilitaire pour déclencher la modale proprement
const triggerAdminModal = (message, isSuccess = true, icon = 'mdi-check-circle-outline') => {
  adminActionMessage.value = message;
  adminActionSuccess.value = isSuccess;
  adminActionIcon.value = icon;
  adminActionDialog.value = true;
};

// ==========================================
// 2. RECONSTITUTION DE LA STRUCTURE INITIALE (Factory Pattern)
// ==========================================
function createNewRecord() {
  return {
    titre: '',
    nom: '',
    price: 0,
    description: '',
    selectedIngredients: [],
    selectedBienfaits: [], 
    rating: 4.5,
    commentCount: 0
  };
}

// ==========================================
// 3. TOUTES LES VARIABLES RÉACTIVES (REF)
// ==========================================
// Variables d'état d'interface (UI)
const search = ref('');
const dialog = ref(false); // 🎯 FIX : Remplacement de shallowRef par ref pour éviter les freezes graphiques
const loading = ref(false);
const isEditing = ref(false);
const formValid = ref(false); 

// Données du catalogue et formulaires
const produits = ref([]);
const produit = ref(createNewRecord()); // Initialisation sécurisée par défaut

// Gestion des fichiers d'images
const selectedFile = ref('');

// Options des listes d'autocomplétion (Chargées dynamiquement)
const defaultIngredients = ref([]);
const defaultBienfaits = ref([]);

// Configuration des en-têtes du tableau Vuetify v-data-table
const headers = [
  { title: 'Images', key: 'imageUrl', sortable: false },
  { title: 'Noms', key: 'nom', align: 'start' },
  { title: 'Titre', key: 'titre' },
  { title: 'Prix', key: 'price' },
  { title: 'Ingredients', key: 'ingredient', sortable: false },
  { title: 'Bienfaits', key: 'bienfaits', sortable: false },
  { title: 'Description', key: 'description', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
];

// ==========================================
// 4. LOGIQUE DE CHARGEMENT ET RÉINITIALISATION (API)
// ==========================================

// Récupérer le catalogue pour le v-data-table admin
const reset = () => {
  loading.value = true;
  produitService.getAllProduits()
    .then((response) => {
      produits.value = response.data || [];
    })
    .catch((error) => console.error("Erreur de rechargement du tableau :", error))
    .finally(() => {
      loading.value = false;
    });
};

// Charger les options d'ingrédients et bienfaits configurés par l'admin
const loadAutocompleteOptions = () => {
  axios.get('http://localhost:3000/api/options')
    .then(response => {
      const allOptions = response.data || [];
      defaultIngredients.value = allOptions.filter(o => o.type === 'ingredient').map(o => o.name);
      defaultBienfaits.value = allOptions.filter(o => o.type === 'bienfait').map(o => o.name);
    })
    .catch(error => console.error("Erreur d'alimentation des autocomplètes :", error));
};

// Vider proprement l'objet formulaire pour la prochaine saisie
const resetForm = () => {
  produit.value = createNewRecord();
  selectedFile.value = '';
  isEditing.value = false;
};

// Action déclenchée à la sélection d'une photo de produit
const onFileSelected = (event) => {
  const files = event.target.files || event.currentTarget.files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

// ==========================================
// 5. FONCTIONS CRUD (CREATION, EDITION, SUPPRESSION)
// ==========================================

// Ouvrir le formulaire en mode modification (Édition)
function edit(item) {
  if (!item) {
    console.error("L'élément transmis au bouton d'édition est indéfini.");
    return;
  }

  isEditing.value = true; 
  const dataBrute = item.raw || item;

  produit.value = {
    _id: dataBrute._id, 
    imageUrl: dataBrute.imageUrl,
    titre: dataBrute.titre,        
    nom: dataBrute.nom,          
    price: dataBrute.price,
    selectedIngredients: dataBrute.ingredient || [],
    selectedBienfaits: dataBrute.bienfaits || [],
    description: dataBrute.description,
    rating: dataBrute.rating || 4.5,
    commentCount: dataBrute.commentCount || 0
  };
  
  console.log("ID MongoDB chargé avec succès au clic :", produit.value._id);
  dialog.value = true;
}

// Action de fermeture de la modale
function fermer() {
  resetForm(); // 🎯 FIX : Réinitialisation propre de l'objet au lieu du crash 'ref()'
  dialog.value = false;
}

// Validation générale et soumission du formulaire d'envoi (POST/PUT via FormData)
function validate() {
   const formData = new FormData();
  formData.append('titre', produit.value.titre); 
  formData.append('nom', produit.value.nom);
  formData.append('price', produit.value.price);
  formData.append('description', produit.value.description);
  formData.append('rating', produit.value.rating);
  formData.append('commentCount', produit.value.commentCount);
  formData.append('ingredient', JSON.stringify(produit.value.selectedIngredients || []));
  formData.append('bienfaits', JSON.stringify(produit.value.selectedBienfaits || []));

  if (selectedFile.value) {
    formData.append('imageUrl', selectedFile.value);
  }

  loading.value = true;

  if (isEditing.value) {
    // 🔄 SUCCÈS MODE ÉDITION (PUT)
    produitService.updateProduit(produit.value._id, formData)
      .then(() => {
        dialog.value = false;
        resetForm();
        reset(); 
        
        // 🎯 Remplacement de l'alerte par la modale Vuetify
        triggerAdminModal(
          `Le produit "${produit.value.titre}" a été mis à jour avec succès dans votre catalogue !`, 
          true, 
          'mdi-package-variant-closed-check'
        );
      })
      .catch((error) => {
        console.error(error);
        triggerAdminModal("Une erreur est survenue lors de la modification du produit.", false, 'mdi-alert-octagon-outline');
      })
      .finally(() => { loading.value = false; });
  } else {
    // 🔄 SUCCÈS MODE CRÉATION (POST)
    if (!selectedFile.value) {
      alert("Veuillez sélectionner une image pour le produit.");
      loading.value = false;
      return;
    }
    
    produitService.createThing(formData)
      .then(() => {
        dialog.value = false;
        
        // 🎯 Remplacement de l'alerte par la modale Vuetify
        triggerAdminModal(
          `Le nouveau produit a bien été enregistré et ajouté au catalogue public !`, 
          true, 
          'mdi-plus-box-outline'
        );
        
        resetForm();
        reset(); 
      })
      .catch((error) => {
        console.error(error);
        triggerAdminModal("Impossible d'enregistrer le produit en base de données.", false, 'mdi-alert-octagon-outline');
      })
      .finally(() => { loading.value = false; });
  }}

// Action finale de suppression d'un produit 🎯 (Réparée et finalisée !)
// Étape A : La fonction appelée par le bouton rouge du tableau (Poubelle) 🗑️
const remove = (item) => {
  const dataBrute = item.raw || item;
  
  if (!dataBrute) return;

  // 1. On mémorise le produit à supprimer dans notre variable réactive
  productToDelete.value = dataBrute;
  
  // 2. On ouvre la modale de confirmation à l'écran
  deleteConfirmDialog.value = true;
};

// Étape B : La fonction actionnée UNIQUEMENT si l'admin clique sur "Confirmer" 🔴
const executeDelete = () => {
  if (!productToDelete.value) return;

  loading.value = true;
  deleteConfirmDialog.value = false; // Ferme la modale de question

  produitService.deleteProduit(productToDelete.value._id)
    .then(() => {
      reset(); // Recharge immédiatement la liste du tableau à l'écran
      
      // On déclenche votre modale de confirmation de succès que nous avons créée à la phase précédente !
      triggerAdminModal(
        `Le produit "${productToDelete.value.titre}" a été définitivement supprimé de la base de données.`, 
        true, 
        'mdi-delete-empty-outline'
      );
    })
    .catch((error) => {
      console.error(error);
      triggerAdminModal("Une erreur est survenue. Le produit n'a pas pu être supprimé.", false, 'mdi-alert-octagon-outline');
    })
    .finally(() => {
      loading.value = false;
      productToDelete.value = null; // Libère la mémoire
    });
};

// ==========================================
// 6. CYCLES DE VIE UNIQUE DE LA PAGE (onMounted)
// ==========================================
onMounted(() => {
  reset();                    // Remplit le v-data-table principal
  loadAutocompleteOptions();  // Remplit les v-autocomplete du formulaire
});
</script>


   