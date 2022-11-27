<template>
  <v-row class="no-gutters">
    <v-dialog persistent v-model="deleteflag" max-width="600px">
      <v-form ref="form" v-model="valid">
        <v-card dark outlined style="border-bottom: 100px">
          <v-card-title class="text-h5">Изменение города
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.name"
                      :rules="[rules.required]"
                      label="Название города">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.coordinates.x"
                      :rules="[rules.required, rules.cordX]"
                      label="Координата X"
                      hint="X"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.coordinates.y"
                      :rules="[rules.required, rules.cordY]"
                      label="Координата Y"
                      hint="Y"
                      required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.area"
                      label="Площадь"
                      hint="area"
                      :rules="[rules.required,rules.moreZero]"
                      required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                      label="Климат"
                      v-model="city.climate"
                      :rules="[rules.required]"
                      :hint="`Климат`"
                      :items="climateList"
                      item-text="name"
                      item-value="name"
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                      label="Правление"
                      v-model="city.government"
                      :rules="[rules.required]"
                      :hint="`Правление`"
                      :items="governmentList"
                      item-text="name"
                      item-value="name"
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-select
                      label="Правитель"
                      v-model="city.governor"
                      :rules="[rules.required]"
                      :hint="`Правитель`"
                      :items="governorList"
                      item-text="birthday"
                      item-value="id"
                      return-object
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-select
                      label="Уровень жизни"
                      v-model="city.standardOfLiving"
                      :rules="[rules.required]"
                      :hint="`Правитель`"
                      :items="standardOfLivingList"
                      item-text="name"
                      item-value="name"
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.metersAboveSeaLevel"
                      :rules="[rules.required, rules.moreZero]"
                      label="Высота над уровнем моря"
                      hint="metersAboveSeaLevel"
                      required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                      v-model="city.population"
                      :rules="[rules.required,rules.moreZero]"
                      label="Население"
                      hint="Население"
                      required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" outlined @click="deleteclose">Закрыть</v-btn>
            <v-btn color="red" outlined @click="deleteItem(city.id)">Удалить</v-btn>
            <v-btn color="green darken-1" dark outlined @click="updateItem()">
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <SearchCard v-if="searchFlag" @updateTable="search"></SearchCard>
    <tbody>
    <tr>
      <v-alert
          v-model="alert"
          dismissible
          color="red"
          elevation="2"
      >
        {{ message }}
      </v-alert>
    </tr>

    <tr>
      <v-btn color="green darken-1" dark outlined @click="addflag = true">
        Добавить город
      </v-btn>
      <v-btn v-if="!searchFlag" color="yellow darken-1" dark outlined @click="searchFlag = true">
        Поиск
      </v-btn>
    </tr>

    <tr style="width: 100%">
    </tr>
    <tr style="width: 100%">
      <v-data-table
          @click:row="handleClick"
          class="elevation-1"
          color="green darken-1" dark outlined
          style="width: 100%; position: absolute"
          :headers="headers"
          :items="citiesList"
          :footer-props="{'items-per-page-options': itemsPerPage}"
          :options.sync="options"
          :server-items-length="this.totalElements"
          @update:page="log"
          @update:items-per-page="log"
          @update:sort-desc="log"
      >

      </v-data-table>
    </tr>
    </tbody>
    <v-dialog persistent v-model="addflag" max-width="600px">
      <AddCity @updTable="closeDialog"></AddCity>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import AddCity from "@/views/dialogs/AddCity";
import SearchCard from "@/views/dialogs/SearchCard";

export default {

  name: "TableMain",
  components: {SearchCard, AddCity},
  data() {
    return {
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения.',
        cordY: v => parseInt(v) <= 662 || 'Введите число <=662',
        moreZero: v => parseInt(v) > 0 || 'Введите значение больше 0',
        cordX: v => parseInt(v) <= 182 || 'Введите число <=182',
        minLen: length => v => v.length >= length || `Минимум ${length} символов`,
        maxLen: length => v => v.length <= length || `Максимум ${length} символов`,

      },
      valid: true, // для vuetify
      message: 'просто ошибка', //для вывода ошибок
      alert: false,
      searchFlag: false,
      options: {
        page: 1,
        itemsPerPage: 5,
        pageStart: 1,
        pageStop: 1,
        sortBy: ['id'],
        sortDesc: [true],
      },
      userListPost: {
        limit: 5,
        page: 1,
        sort: Object,
        filters: []
      },
      sortTable: {
        name: '',
        sortType: ''
      },
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'area', value: 'area'},
        {text: 'climate', value: 'climate'},
        {text: 'population', value: 'population'},
        {text: 'standardOfLiving', value: 'standardOfLiving'},
        {text: 'meterAboveSea', value: 'metersAboveSeaLevel'},
        {text: 'government', value: 'government'},
        {text: 'governor', value: 'governor.birthday'},
        {text: 'x', value: 'coordinates.x'},
        {text: 'y', value: 'coordinates.y'},
        {text: 'creationDate', value: 'creationDate'},

      ],
      citiesList: [],
      addflag: false,
      deleteflag: false,
      deletecity: {},

      standardOfLivingList: [{name: 'ULTRA_HIGH'}, {name: 'MEDIUM'}, {name: 'LOW'}, {name: 'NIGHTMARE'}],
      climateList: [{name: 'DESERT'}, {name: 'MONSOON'}, {name: 'HUMIDCONTINENTAL'}],
      governmentList: [{name: 'GERONTOCRACY'}, {name: 'IDEOCRACY'}, {name: 'MONARCHY'}],
      governorList: [],
      city: {
        climate: {},
        government: {},
        standardOfLiving: {},
        governor: {
          birthday: {}
        },
        name: {},
        coordinates: {
          y: {},
          x: {},
        },
        area: {},
        creationDate: {},
        metersAboveSeaLevel: {},
        population: {},
      },

      city2: {
        climate: {},
        government: {},
        standardOfLiving: {},
        governor: {
          birthday: {}
        },
        name: {},
        coordinates: {
          y: {},
          x: {},
        },
        area: {},
        creationDate: {},
        metersAboveSeaLevel: {},
        population: {},
      },
      index: {},
      totalElements: 0,
      totalPages: {},
      sortflag: true,
      itemsPerPage: [5, 10, 30]
    }
  },
  methods: {
    log() {
      console.log('LOG!!!LOG')
      console.log(this.options)

      if (this.options.sortDesc[0] === true) {
        this.sortTable.sortType = "LESS_TO_MORE"
        this.sortTable.name = this.options.sortBy[0]
      } else if (this.options.sortDesc[0] === false) {
        this.sortTable.sortType = "MORE_TO_LESS"
        this.sortTable.name = this.options.sortBy[0]
      } else {
        this.userListPost.sort = Object
      }
      if (this.options.sortBy[0] === 'coordinates.x') {
        this.sortTable.name = 'x'
      } else if (this.options.sortBy[0] === 'coordinates.y') {
        this.sortTable.name = 'y'
      }
      this.userListPost.sort = this.sortTable
      this.userListPost.page = this.options.page
      this.userListPost.limit = this.options.itemsPerPage
      this.getCitiesInfo()

    },
    search(data) {
      this.userListPost.filters = data
      this.getCitiesInfo()
      this.userListPost.filters = Object
      this.searchFlag = false
    },
    deleteclose() {
      this.deleteflag = false
      this.$refs.form.reset()

    },
    deleteItem(id) {
      this.deleteflag = false
      console.log(this.index)
      this.citiesList.splice(this.index, 1)

      axios.create({
        baseURL: this.$store.state.baseUrl
      }).delete(`/cities/${id}`)
          .then(resp => {
            console.log(resp)
          })
      this.$emit('updateTable')
    },

    updateItem() {
      // this.citiesList.splice(this.index, 1)
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      this.deleteflag = false

      axios.create({
        baseURL: this.$store.state.baseUrl
      }).put(`/cities/`, this.city)
          .then(resp => {
            console.log(resp)
            this.getCitiesInfo()
          })

    },
    handleClick(value) {
      const index = this.citiesList.indexOf(value)
      console.log(index)
      // this.getCitiesInfo()
      this.city = JSON.parse(JSON.stringify(value));
      this.index = index;
      this.deleteflag = true;


    },
    closeDialog(data) {
      if (data.add) {
        console.log('true')
        this.getCitiesInfo()
      }
      console.log('закрылось')
      this.addflag = false
    },

    getCitiesInfo() {
      this.citiesList = []
      axios.create({
        baseURL: this.$store.state.baseUrl
      }).post('/cities/filter', this.userListPost)
          .then(resp => {
            this.citiesList = resp.data.content
            this.totalElements = resp.data.totalElements
            this.options.pageStop = resp.data.totalPages
            this.options.pageStart = 1
            console.log(this.citiesList)
          }).catch(() => {
        console.warn('Not good man :(');
        this.message = 'Не получилось загрузить список городов, попробуйте еще раз'
        this.alert = true;
      })
    },
  },
  beforeMount() {
    axios.create({
      baseURL: this.$store.state.baseUrl
    }).get('/humans')
        .then(resp => {
          if (resp)
            console.log(resp)
          this.governorList = resp.data
        }).catch(() => {
      console.warn('Not good man :(');
      this.message = 'Не получилось загрузить список городов, попробуйте обновить страницу'
      this.alert = true;
    })
    this.getCitiesInfo();
  }


}
</script>

<style scoped>

</style>