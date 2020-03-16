import Vue from 'vue';
import { mdiImageMultiple, mdiOpenInNew, mdiChevronLeft } from '@mdi/js'

export default Vue.component('home', {
  data: () => ({
    loadingAlbums: false,
    loadingPhotos: false,
    selectedAlbum: null,
    selectedPhoto: null,
    showPhotoDialog: false,
    searchValue:'',
    albums: [],
    photos:[],
    albumIcon: mdiImageMultiple,
    openInNewIcon: mdiOpenInNew,
    closeNavDrawerIcon: mdiChevronLeft,
    drawer: false,
    mini: false
  }),
  computed: {
    filteredPhotos() {
      if(this.photos && this.selectedAlbum) {
        return this.photos.filter(o => o.albumId === this.selectedAlbum.id && (!this.searchValue || (o.title && o.title.includes(this.searchValue))))
      }
      return []
    }
  },
  methods: {
    showPhoto(photo) {
      this.selectedPhoto = photo
      this.showPhotoDialog = true
    },
    closeDrawer() {
      if(this.$vuetify.breakpoint.xsOnly) {
        this.mini = true
      }
    }
  },
  beforeMount() {
    if(!this.$store.state.username) {
      this.$router.push("/")
    }

    if(this.$vuetify.breakpoint.xsOnly) {
      this.mini = true
    }
  },
  mounted:function() {
    this.loadingAlbums = true
    fetch("https://jsonplaceholder.typicode.com/albums",{
      method:'get'
    })
    .then((response)=> {
      return response.json()
    })
    .then((jsonData) => {
      this.albums = jsonData
      this.loadingAlbums = false
      if(this.albums && this.albums.length > 0) {
        this.selectedAlbum = this.albums[0]
      }
   })
   this.loadingPhotos = true
   fetch("https://jsonplaceholder.typicode.com/photos",{
      method:'get'
    })
    .then((response)=> {
      return response.json()
    })
    .then((jsonData) => {
      this.loadingPhotos = false
      this.photos = jsonData
   })
  },
  template: `
    <v-container fl>
      <v-row justify="center" v-if="loadingAlbums || loadingPhotos">
        <v-col class="text-center" cols="12">Loading...</v-col>
      </v-row>
      <v-row v-else>
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
          height="600"
        >
          <v-list-item class="px-2">
            <v-list-item-avatar size="30">
              <v-icon color="primary">{{ albumIcon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-title>Albums</v-list-item-title>

            <v-btn
              v-if="$vuetify.breakpoint.xsOnly"
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>{{ closeNavDrawerIcon }}</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list>
            <v-list-item v-for="album in albums" :key="album.id" @click="selectedAlbum = album; closeDrawer()">
              <v-list-item-content v-if="!mini">
                {{ album.title }}
              </v-list-item-content>
              <span v-else>...</span>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      
        <v-col>
          <v-card>
            <v-card-title>Photos
            <v-spacer/>
            <v-text-field label="Search" v-model="searchValue"></v-text-field>
            </v-card-title>
            <v-card-subtitle v-if="selectedAlbum">
              {{ selectedAlbum.title }}
            </v-card-subtitle>
            <v-card-text>
              <v-row wrap>
                <v-col v-for="photo in filteredPhotos" :key="photo.id"style="cursor:pointer" @click="showPhoto(photo)">
                  <v-img :src="photo.thumbnailUrl">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center"justify="center">
                        <v-progress-circular indeterminatecolor="primary"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <span>{{ photo.title }}</span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="showPhotoDialog" width="80vh">
        <v-img v-if="selectedPhoto" :src="selectedPhoto.url">
        </v-img>
      </v-dialog>
    </v-container>
  `
})