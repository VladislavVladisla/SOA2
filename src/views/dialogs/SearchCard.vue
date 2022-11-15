<template >
  <v-card dark outlined >
    <v-card-title>
      Поиск
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md2>
            <v-text-field v-model="city.name" label="Название города" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-text-field v-model="city.coordinates.x" label="Координата X" hint="X" ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-text-field
                v-model="city.coordinates.y"
                label="Координата Y"
                hint="Y"
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-text-field
                v-model="city.area"
                label="Площадь"
                hint="area"
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-select
                label="Климат"
                v-model="city.climate"
                :hint="`Климат`"
                :items="climateList"
                item-text="name"
                item-value="name"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-select
                label="Правление"
                v-model="city.government"
                :hint="`Правление`"
                :items="governmentList"
                item-text="name"
                item-value="name"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md2>
            <v-text-field
                v-model="city.creationDate"
                label="YYYY.MM.DD"
                hint="Дата основания"
                required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md2>
            <v-select
                label="Правитель"
                v-model="city.governor"
                :hint="`Правитель`"
                :items="governorList"
                item-text="birthday"
                item-value="id"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md2>
            <v-select
                label="Уровень жизни"
                v-model="city.standardOfLiving"
                :hint="`Правитель`"
                :items="standardOfLivingList"
                item-text="name"
                item-value="name"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>


          <v-flex xs12 sm6 md2>
            <v-text-field
                v-model="city.metersAboveSeaLevel"
                label="Высота над уровнем моря"
                hint="metersAboveSeaLevel"
                required
            ></v-text-field>
          </v-flex>


          <v-flex xs12 sm6 md2>
            <v-text-field
                v-model="city.population"
                label="Население"
                hint="Население"
                required
            ></v-text-field>
          </v-flex>

          <!--          <v-flex xs12>-->
          <!--            <v-checkbox v-model="habitability" label="Обитаемость"></v-checkbox>-->
          <!--          </v-flex>-->

        </v-layout>

      </v-container>

    </v-card-text>
    <v-card-actions>
      <v-btn color="primary"
             outlined
             @click="closeDialog">
        Закрыть
      </v-btn>
      <v-btn color="green"
             outlined
             @click="saveCity">
        Найти
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchCard",
  data: () => ({
    standardOfLivingList: [{name: 'ULTRA_HIGH'}, {name: 'MEDIUM'}, {name: 'LOW'}, {name: 'NIGHTMARE'}],
    climateList: [{name: 'DESERT'}, {name: 'MONSOON'}, {name: 'HUMIDCONTINENTAL'}],
    governmentList: [{name: 'GERONTOCRACY'}, {name: 'IDEOCRACY'}, {name: 'MONARCHY'}],
    governorList: [],
    city: {
      climate: {},
      government: {},
      standardOfLiving: {},
      governor: {},
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
    response: {},


  }),
  methods: {
    info() {
      console.log(this.select)
    },
    closeDialog() {
      this.$emit('updateTable')
    },

    saveCity() {
      this.city.climate = this.city.climate.name
      this.city.government = this.city.government.name
      this.city.standardOfLiving = this.city.standardOfLiving.name
      axios.create({
        baseURL: this.$store.state.baseUrl
      }).post('/cities', this.city)
          .then(resp => {
            this.response = resp.data
            console.log(resp.data)
          })
      this.closeDialog();
    },

  },

  beforeMount() {
    this.city.government = '',
        this.city.governor = '',
        this.city.name = '',
        this.city.coordinates.y = '2',
        this.city.coordinates.x = '3',
        this.city.area = '34',
        this.city.creationDate = '2022-11-12',
        this.city.metersAboveSeaLevel = '0',
        this.city.population = '56',
        axios.create({
          baseURL: this.$store.state.baseUrl
        }).get('/humans')
            .then(resp => {
              console.log(resp)
              this.governorList = resp.data
            })
  },

}
</script>

<style scoped>

</style>