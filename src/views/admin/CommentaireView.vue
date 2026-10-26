
    <template>
        <v-app>
        <div class='commentaire'>
            <v-responsive class="rounded">
                <AppbarView></AppbarView>
                <MenueView></MenueView>
        <v-main>
 <v-container class="py-6 px-4">
  <v-row class="mb-4">
    <v-col cols="12">
      <h1   class="text-h4 font-weight-black text-grey-darken-3 mb-1">
Gestion des Commentaires
      </h1>
       <p class="text-body-2 text-medium-emphasis">Modérez les avis clients avant publication</p>
    </v-col>
  </v-row> 
    <v-card flat class="mb-4 rounded-xl border">
      <v-card-title  class="pa-3">
        <v-text-field
          v-model="search"
          density="compact"
          label="Recherche"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>
    </v-card>

    <v-card border flat class="rounded-xl pa-2">
      <!-- On lie :items à notre variable réactive 'comments' -->
      <v-data-table
        :headers="headers"
        v-model:search="search"
        :hide-default-footer="comments.length < 11"
        :items="comments"
        item-value="_id"
        show-expand
      >
        <!-- Bouton d'extension de ligne universel -->
        <template #[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
          <v-btn
            :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            :text="isExpanded(internalItem) ? 'Fermer' : 'Voir'"
            class="text-none"
            color="medium-emphasis"
            size="small"
            variant="text"
            width="120"
            border
            slim
            @click="toggleExpand(internalItem)"
          ></v-btn>
        </template>

        <!-- Colonne Statut Visuel rapide -->
        <template #[`item.status`]="{ value }">
          <v-chip
            :color="value === 'approved' ? 'success' : value === 'rejected' ? 'error' : 'warning'"
            size="small"
            variant="tonal"
          >
            {{ value === 'approved' ? 'Approuvé' : value === 'rejected' ? 'Rejeté' : 'En attente' }}
          </v-chip>
        </template>

        <!-- Ligne étendue avec vos détails et boutons d'actions -->
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="py-2">
              <v-sheet rounded="lg" border class="pa-2">
                <v-table density="compact">
                  <tbody class="bg-surface-light">
                    <tr>
                      <th>Note</th>
                      <th>Commentaire d'origine</th>
                      <th>Actions</th>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td class="py-2">
                        <v-rating
                          :model-value="item.rating"
                          color="orange-darken-2"
                          density="comfortable"
                          size="small"
                          readonly
                        ></v-rating>
                      </td>
                      
                      <!-- Le texte du commentaire -->
                      <td class="py-2">{{ item.text }}</td>
                      
                      <td class="py-2">
                        <div class="d-flex ga-2">
                          <!-- Bouton Approuver -->
                          <v-btn
                            prepend-icon="mdi-check-circle"
                            variant="outlined"
                            size="small"
                            color="success"
                            class="text-none"
                            @click="updateStatus(item._id, 'approved')"
                          >
                            Approuver
                          </v-btn>

                          <!-- Bouton Rejeter -->
                          <v-btn
                            prepend-icon="mdi-close-circle-outline"
                            variant="outlined"
                            size="small"
                            color="error"
                            class="text-none"
                            @click="updateStatus(item._id, 'rejected')"
                          >
                            Rejeter
                          </v-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-sheet>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="modDialog" max-width="450px" transition="dialog-transition">
  <v-card class="rounded-xl pa-4 text-center border" flat>
    <v-card-text class="pt-4">
      
      <!-- 🎯 CONDITIONAL LAYOUT VIEW A: SUCCESS (GREEN ACCENTS) -->
      <div v-if="modSuccess">
        <v-avatar color="green-lighten-5" size="70" class="mb-4">
          <v-icon color="green-darken-2" size="40">mdi-shield-check-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Action Confirmée</h3>
        <p class="text-body-2 text-grey-darken-1 px-2">
          {{ modMessage }}
        </p>
      </div>

      <!-- 🎯 CONDITIONAL LAYOUT VIEW B: FAILURE/ERROR (RED ACCENTS) -->
      <div v-else>
        <v-avatar color="red-lighten-5" size="70" class="mb-4">
          <v-icon color="red-darken-2" size="40">mdi-alert-octagon-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-2">Erreur Serveur</h3>
        <p class="text-body-2 text-grey-darken-1 px-2">
          {{ modMessage }}
        </p>
      </div>

    </v-card-text>

    <v-card-actions class="justify-center pb-2">
      <v-btn
        :color="modSuccess ? 'green-darken-2' : 'red-darken-2'"
        variant="flat"
        class="text-none font-weight-bold px-8 rounded-lg"
        size="large"
        @click="modDialog = false"
      >
        Continuer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </v-container>


            <!--v-container>
            <div class="text-h5 text--primary text-title-large" :style="{ fontWeight: 'bold' }"> Gestion de Commentaires</div>
            <p>Moderez les avies clients</p>
            </v-container>
            <v-container fluid>
                <v-card flat>
                    <v-card-title class="d-flex align-center pe-2">
                        <v-text-field
                        v-model="search"
                        density="compact"
                        label="Recherche"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined" 
                        flat
                        hide-details
                        single-line
                    ></v-text-field>
                    </v-card-title>
                </v-card>

    <v-card border rounded flat>
        <v-data-table
        :headers="headers"
        v-model:search="search"
        :items="movies"
        item-value="director"
        hide-default-footer
        show-expand
    >
        <template #[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
        <v-btn
            :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            :text="isExpanded(internalItem) ? 'Fermer' : 'Voire'"
            class="text-none"
            color="medium-emphasis"
            size="small"
            variant="text"
            width="120"
            border
            slim
            @click="toggleExpand(internalItem)"
        ></v-btn>
        </template>
        <template #[`item.title`]="{ item }">
            
            <v-avatar
                size="36px"
                >
                <v-img
                    v-if="item.title"
                    alt="title"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                ></v-img>
                </v-avatar>
        </template>

        <template v-slot:expanded-row="{ columns, item }">
        <tr>
            <td :colspan="columns.length" class="py-2">
            <v-sheet rounded="lg" border>
                <v-table density="compact">
                <tbody class="bg-surface-light">
                    <tr>
                    <th>Notes</th>
                    <th>Description</th>
                    <th>Actions</th>
                    </tr>
                </tbody>

                <tbody>
                    <tr>
                    <td class="py-2">
                        <v-rating
                        :model-value="item.details.rating"
                        color="orange-darken-2"
                        density="comfortable"
                        size="small"
                        half-increments
                        readonly
                        ></v-rating>
                    </td>
                    
                    <td class="py-2">{{ item.details.synopsis }}</td>
                    
                        <v-btn
                        prepend-icon="mdi-check-circle"
                        variant="outlined"
                        flat
                        class="text-none font-weight-regular"
                        size="small"
                        color="medium-emphasis"
                        >
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>
                        Approuver
                        </v-btn>
                        <v-btn
                        prepend-icon="mdi mdi-close-circle-outline"
                        variant="outlined"
                        flat
                        class="text-none font-weight-regular"
                        size="small"
                        color="medium-emphasis"
                        >
                        <template v-slot:prepend>
                            <v-icon color="red"></v-icon>
                        </template>
                        Rejeter
                        </v-btn>
                    </tr>
                </tbody>
                </v-table>
            </v-sheet>
            </td>
        </tr>
        </template>
    </v-data-table>
    </v-card>

            </v-container-->
        </v-main>
    </v-responsive>
        </div>
        </v-app>
    </template>
    <script>
    import AppbarView from '@/components/AppbarView.vue';
    import MenueView from '@/components/MenueView.vue';
    export default {
        name:'CommentaireView',
        components: {
            AppbarView,
            MenueView
        }
    }
    </script>
    <!-- <script setup>
    const search = ref('')
    const headers = [
        { width: 80, title: 'Avantar', key: 'title', align: 'start', sortable: true },
        { width: 250, title: 'Nom', key: 'director' },
        { width: 150, title: 'Produit', key: 'genre' },
        { width: 100, title: 'Date', key: 'year', align: 'end' },
    
    ]

    const movies = [
        {
        title: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        director: 'Frank Darabont',
        genre: 'Nivea',
        year: 2026,
        details: {
            synopsis: 'Two imprisoned men bond over years, finding solace and redemption through acts of decency.',
            cast: ['Tim Robbins', 'Morgan Freeman'],
            rating: 3.5,
        },
        },
        {
        title: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        director: 'Ken',
        genre: 'Nivea',
        year: 2026,
        details: {
            synopsis: 'Two imprisoned men bond over years, finding solace and redemption through acts of decency.',
            cast: ['Tim Robbins', 'Morgan Freeman'],
            rating: 5,
        },
        },
    
    ]
    </script> -->

    <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const search = ref('');
const comments = ref([]);

// Colonnes adaptées pour correspondre aux propriétés de votre modèle Mongoose Comment
const headers = [
  { title: 'Auteur', key: 'author', align: 'start' },
  { title: 'Produit ciblé', key: 'productId.nom' }, // Grâce au .populate du backend
  { title: 'Statut', key: 'status', sortable: true },
  { title: 'Détails', key: 'data-table-expand', sortable: false, align: 'end' }
];

// Keep your existing state arrays functional


// 🎯 NOUVEAU : Reactive controller variables for the Admin moderation modal
const modDialog = ref(false);       // Controls visibility (true/false)
const modSuccess = ref(true);       // Switches graphic layouts (Success = true, Error = false)
const modMessage = ref('');          // Holds the status text message response strings

// Récupérer la totalité des avis pour la modération (unchanged)
const fetchAllComments = () => {
  axios.get('http://localhost:3000/api/comments/admin/all')
    .then(response => {
      comments.value = response.data;
      console.log(response.data);
    })
    .catch(error => console.error("Erreur de récupération admin :", error));
};

// Fonction déclenchée par vos boutons d'action - UPGRADED 🎯
const updateStatus = (id, newStatus) => {
  axios.put(`http://localhost:3000/api/comments/admin/moderate/${id}`, { status: newStatus })
    .then(() => {
      // 1. Configure the text message based on the chosen status string action (Approuvé / Rejeté)
      if (newStatus === 'approved') {
        modMessage.value = "Le commentaire a été validé avec succès. Il est désormais visible par tous les clients sur le catalogue public.";
      } else if (newStatus === 'rejected') {
        modMessage.value = "Le commentaire a été rejeté. Il a été retiré des flux publics et classé dans vos archives de modération.";
      } else {
        modMessage.value = `Le statut du commentaire a été mis à jour : ${newStatus}`;
      }

      // 2. Open the modal container in SUCCESS mode (Green state flags) 🎯
      modSuccess.value = true;
      modDialog.value = true;

      // 3. Instantly refresh data grids on the monitor layout screen
      fetchAllComments(); 
    })
    .catch(error => {
      console.error("Erreur de modération :", error);

      // 🎯 ERROR CONFIGURATION: Fallback to red graphics layout alert boxes
      modSuccess.value = false;
      modMessage.value = error.response?.data?.error || "Impossible de mettre à jour le statut. Une erreur de communication avec le serveur est survenue.";
      modDialog.value = true;
    });
};

onMounted(() => {
  fetchAllComments();
});
</script>
