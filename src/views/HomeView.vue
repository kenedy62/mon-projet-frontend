  <template>
  <v-app>
  <div class="HomeView">
    <v-app-bar  color="white" flat scroll-target="#scrolling-techniques-7">
    <v-container fluid>
      <v-row>
        <v-col class="order-6">
          <v-sheet class="pa-2">
            <v-layout style="height: 50px;">
              <v-row>
                <v-bottom-navigation>
                <v-btn color="black" text="Produits" value="Produits" @click="goTo('#produit')"></v-btn>
                <v-btn value="Avantages" text="Avantages" @click="goTo('#avantage')"></v-btn>
                <v-btn value="Ingrédients" text="Ingrédients" @click="goTo('#ingredient')"></v-btn>
                  <v-btn value="Contact" text="Contact" @click="goTo('#contact')"></v-btn>
                </v-bottom-navigation>
              </v-row>
            </v-layout>
          </v-sheet>
        </v-col> 
        <v-col class="order-12">
          <v-sheet class="pa-2">
            <!--router-link to="/about">Admi</router-link-->
          </v-sheet>
        </v-col>
        <v-col class="order-1">
          <v-sheet class="pa-2">
            <v-app-bar-title class="text-headline-large font-weight-light mt-0 mb-2" ><p class="">Chermical promotion SSD</p></v-app-bar-title>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <!--AppView></AppView-->
  <v-carousel :show-arrows="false" hide-delimiters>
    <v-sheet color="orange-lighten-5" height="100%" tile>
        <v-row class="fill-height"  align="center" justify="center">
          <v-card  class="mx-auto" color="orange-lighten-5"  flat>
            <v-card-text align="center">
              <div class="d-flex justify-center ga-2">
              <v-chip class="fill-height text-orange-darken-4" color="#FFFFFF" variant="flat">Nouvelle collection</v-chip><br><br></div>
              <p class="text-h2 text--primary" :style="{ fontWeight: 'bold' }">Cosmétiques<br></p>
              <div class="text-h2"><p class="text-orange-darken-4">d'exception</p><br></div>
              <div class="font-weight-light mb-2" ><p calss="text-h2">Découvrez notre sélection de Produits de luxe aux Ingrédients naturel, pensés pour reveler</p></div>
              <p>votre beauté authentique</p>
            </v-card-text>
          </v-card>
        </v-row>
        </v-sheet>  
    </v-carousel>
    <v-container  class="ma-2"></v-container>
    <div id="produit">
      <v-container fluid class="mb-6">
      <v-sheet>
        <v-row class="fill-height"  align="center" justify="center">
          <v-card  class="mx-auto" text flat>
            <v-card-text class="pt-6" align="center">
              <p class="text-h3 text--primary" :style="{ fontWeight: 'bold' }">Nos produits phares<br></p>
              <div calss="text-h5 ms-4 ga-2"><p>Cliquez sur un produit pour voir tous ses bienfaits et lire les avis de nos clients</p></div>
            </v-card-text>
      </v-card>
      </v-row>
    </v-sheet><v-container  class="ma-2"></v-container>
      <v-container fluid>
      <v-row density="comfortable">
          <v-col v-for="card in cards"  :key="card.title"  cols="12" md="3" lg="3">
          <v-hover v-slot="{isHovering ,props}"  open-delay="200">
            
            <v-card to="/about"  max-width="370" v-bind="props" :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 4 : 1" flat hover  height="540">
          
              <v-img :src="card.src" class="align-end text-right pa-1"  height="270">
                  <div class="d-flex justify-center ga-2">
                  <v-chip class="fill-height" color="orange-darken-4" variant="flat">Nouveau</v-chip>
              </div>    
              </v-img>
              <v-row class="ms-2 ma-2"><div class="text-orange-darken-4 ms-3" v-text="card.title"></div></v-row>
              <v-row class="ms-2 ma-2"> <div class="text-h4 text--primary ms-3" v-text="card.title1"></div></v-row>
              <v-card-text>
                <v-row >
          <v-rating :model-value="3.5" class="ms-2" color="amber" density="compact" size="small" half-increments readonly></v-rating>
          <div class="text-grey ms-4">4.5 (413)</div>
        </v-row>
          </v-card-text>
          <v-row class="ms-2 ma-2"><div class="font-weight-light text-grey text-title-large mb-2" v-text="card.title2"></div><br></v-row>
          <v-row class="ms-2 ma-2"><div class="text-h5 " v-text="card.title3"></div></v-row>
            </v-card>
          </v-hover>
          </v-col>
        </v-row>
    </v-container>
    </v-container>
    </div>
    <v-container  class="ma-2"></v-container>
    <div id="avantage">
      <v-container height="500" class="ma-9" fluid>
      <v-sheet id="avantages" class="fill-height mb-6" >
        <v-row  align="center" justify="center">
          <v-card  class="mx-auto" text flat>
            <v-card-text align="center">
              <p class="text-h3 text--primary" :style="{ fontWeight: 'bold' }">Une formule révolutionnaire<br></p>
            </v-card-text>
      </v-card>
      </v-row>
      
      <v-row >
        <v-col cols="12" md="3">
          <v-card width="310" outlined="5" class="ma-2" border flat height="170"><br>
            <v-sheet rounded="rounded" class="ms-4" color="orange-darken-4" height="40" width="40">
            <div><v-icon class="ma-1" size="x-large">mdi mdi-star-four-points-outline</v-icon></div>
          </v-sheet>
              <v-row class="ma-1"><p class="text-h5 text--primary text-title-large">Eclat instantané</p>
               <p class="text-small">Une peau radieuse et limineuse dès la prémière application</p>
              </v-row>
              <v-row class="ms-1" ></v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card width="300" outlined="5" class="ma-1" border flat height="170"><br>
            <v-sheet rounded="rounded" class="ms-4" color="green-accent-4" height="40" width="40">
            <div><v-icon class="ma-1" color="white" size="x-large">mdi  mdi-flower-tulip-outline </v-icon></div>
          </v-sheet>
          <v-card-text>
              <p class="text-h5 text--primary text-title-large">100% Naturel<br></p>
              <div calss="text-headline-small ms-1"><p class="text-grey">Formule avec les ingrédients biologiques et durable</p></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card width="300" outlined="5" class="ma-1" border flat height="170"><br>
            <v-sheet rounded="rounded" class="ms-4" color="orange-darken-4" height="40" width="40">
            <div><v-icon class="ma-1" color="white" size="x-large">mdi mdi-heart-outline</v-icon></div>
          </v-sheet>
          <v-card-text>
              <p class="text-h5 text--primary text-title-large">Hydratation profonde<br></p>
              <div calss="text-headline-small ms-1"><p class="text-grey">Nourrit et hydrate votre peau en profondeur pendant 24h</p></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card width="300" outlined="5" class="ma-1" border flat height="170"><br>
            <v-sheet rounded="rounded" class="ms-4" color="red" height="40" width="40">
            <div><v-icon class="ma-1" color="white" size="x-large">mdi mdi-shield-outline</v-icon></div>
          </v-sheet>
          <v-card-text>
              <p class="text-h5 text--red text-title-large">Protection avancée<br></p>
              <div calss="text-headline-small ms-1"><p class="text-grey">Protège contre les agression extérieures et le veillessement</p></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
      </v-container>
    </div>
    <v-container  class="ma-3"></v-container>
    <div id="ingredient">
      <v-row height="200">
      <v-col cols="12" sm="5">
        <v-sheet class="ms-4">
        <v-row class="fill-height">
          <v-card text flat>
            <v-card-text>
              <p class="text-h3 text--primary " :style="{ fontWeight: 'bold' }">Des ingrédients d'exception<br></p>
              <div calss="text-h5 ma-4"><p class="font-weight-light text-title-x-large mt-0">Nous sélections avec soin les meilleurs ingrédients naturels pour créer les formules éfficaces et respecteuses de votre peau </p></div>
            </v-card-text>
      </v-card>
      </v-row>
    </v-sheet>
          <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Acide hyaluronique - Hydration intense
      </v-sheet>
      <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Vitamine C - Eclat et anti oxydant
      </v-sheet>
      <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Huile de rose musquée - Régénération
      </v-sheet>
        <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Extré de thé vert - Protection
      </v-sheet>
      <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Peptides - Anti-âge
      </v-sheet>
      <v-sheet class="ma-2">
            <v-icon class="ma-1" color="orange-darken-4" size="large">mdi mdi-checkbox-marked-circle</v-icon>
        Aloé vera - Apaisant
      </v-sheet>

      </v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="4"> 
        <v-sheet  elevation="20" opacity="3" rounded="xl">
          <v-img src='https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg' 
          width="700" rounded="xl"  aspect-ratio="16/16"  ></v-img>
        </v-sheet>
      </v-col>
    </v-row>
    </div>
    <v-row>
      <v-container class="ma-9"></v-container>
      <v-sheet class="ma-2" fluid>
        <v-card class="ms-3" flat height="100" color="green-lighten-5">
          <v-card-text class="green-lighten-5">
            <v-shep class="green-lighten-5 text-h5 text--primary text-title-large">
            <v-icon class="ma-1 green" color=" text-primary" :style="{ fontWeight: 'bold' }" size="x-large">mdi  mdi-flower-tulip-outline</v-icon>
            Certificat biologique
          </v-shep>
          <div calss="text-headline-small ms-1"><p class="text-grey">Tous nos produits sont cerfiés bio crulty-free. Nous nous engageons pour une beauté responsable et durable </p></div>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-row>
    <v-container class="ma-9"></v-container>
    <div id="contact">
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
            <v-form  v-model="form"
          @submit.prevent="onSubmit"
  >
                <v-row>
        <v-text-field density="compact"   v-model="email"
            :readonly="loading"
            :rules="[required]" clearable
        label="E-mail"  prepend-inner-icon="mdi-email-outline"  variant="outlined" class="ma-3"
        ></v-text-field>
        <v-btn :disabled="!form"
            :loading="loading" type="submit" class="text-none font-weight-regular ma-3 text-orange-darken-4"> S'incrire</v-btn>
            </v-row>
            </v-form>
          </v-card>
        </v-card>
        </v-row>
        </v-sheet>  
    </v-carousel>
    </div>
    <HelloWorld></HelloWorld>
  </div>
  </v-app>
    
  </template>

  <script>

  import HelloWorld from '../components/HelloWorld.vue'
  //import AppView from'../components/AppView.vue'

  export default {
    name: 'HomeView',
    components: {
      //HelloWorld,
      //AppView
    }
  }
  //  import { ref } from 'vue'

  //   const value = ref(0)

    
  </script>
  <script setup >
  //  import { ref } from 'vue'

  //   const tab =ref('produits')
  
  import { useGoTo } from 'vuetify'
  import { ref } from 'vue'

    const form = ref(false)
    const email = ref(null)
    const loading = ref(false)

    function onSubmit () {
      if (!form.value) return
      loading.value = true
      setTimeout(() => (loading.value = false), 2000)
    }
    function required (v) {
      return !!v || 'Field is required'
    }
    
  const goTo = useGoTo()
  const cards = [
      { title: 'Soin de visage',title1:'Serum', title2:'un produit deficacite endurence eclesicente beaute forme travaille aime par tous', title3:'500F', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NIVEA_logo_2021.svg/960px-NIVEA_logo_2021.svg.png'},
      { title: 'Soin de visage',title1:'Serum', title2:'Un produit de tres bonne calite', title3:'500F', src: 'https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg'},
      { title: 'Soin de visage',title1:'Serum', title2:'un produit deficacite endurence eclesicente beaute forme travaille aime par tous', title3:'500F', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NIVEA_logo_2021.svg/960px-NIVEA_logo_2021.svg.png'},
      { title: 'Soin de visage',title1:'Serum', title2:'Un produit de tres bonne calite', title3:'500F', src: 'https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg'},
      { title: 'Soin de visage',title1:'Serum', title2:'un produit deficacite endurence eclesicente beaute forme travaille aime par tous', title3:'500F', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NIVEA_logo_2021.svg/960px-NIVEA_logo_2021.svg.png'},
      { title: 'Soin de visage',title1:'Serum', title2:'Un produit de tres bonne calite', title3:'500F', src: 'https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg'},
      { title: 'Soin de visage',title1:'Serum', title2:'un produit deficacite endurence eclesicente beaute forme travaille aime par tous', title3:'500F', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NIVEA_logo_2021.svg/960px-NIVEA_logo_2021.svg.png'},
      { title: 'Soin de visage',title1:'Serum', title2:'Un produit de tres bonne calite', title3:'500F', src: 'https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg'},
      { title: 'Soin de visage',title1:'Serum', title2:'un produit deficacite endurence eclesicente beaute forme travaille aime par tous', title3:'500F', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/NIVEA_logo_2021.svg/960px-NIVEA_logo_2021.svg.png'},
      { title: 'Soin de visage',title1:'Serum', title2:'Un produit de tres bonne calite', title3:'500F', src: 'https://target.scene7.com/is/image/Target/GUEST_083385f4-031d-4152-aa7d-da27e1e6bc01?wid=300&hei=300&fmt=pjpeg'},
    ]


    //  function onScroll () {
    //   goTo({container: '#avantages'} )
    // }
    // function onClick1() {
    //   goTo({container: '#avantages'} )
    // }
  </script>
  <style lang="sass" scoped>
  .v-card.on-hover.v-theme--dark
    background-color: rgba(#4f4d4d, 0.9)
    >.v-card__text
      color: #080808
  </style>
