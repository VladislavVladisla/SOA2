<template>
  <v-card dark outlined>
    <v-card-title class="text-h5">Изменение города:  <h3 style="color: red"> {{refactorRow.name}}</h3>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="city.name" label="Название города" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="city.coordinates.x" label="Координата X" hint="X" ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field
                v-model="city.coordinates.y"
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
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
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
          <v-flex xs12 sm6 md4>
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

          <v-flex xs12 sm6 md4>
            <v-text-field
                v-model="city.creationDate"
                label="YYYY.MM.DD"
                hint="Дата основания"
                required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-select
                label="Правитель"
                v-model="city.governor"
                :hint="`${city.governor.birthday}, ${city.governor.id}`"
                :items="governorList"
                item-text="birthday"
                item-value="id"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-select
                label="Уровень жизни"
                v-model="city.standardOfLiving"
                :hint="`${city.standardOfLiving}}`"
                :items="standardOfLivingList"
                item-text="name"
                item-value="name"
                persistent-hint
                return-object
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-text-field
                v-model="city.metersAboveSeaLevel"
                label="Высота над уровнем моря"
                hint="metersAboveSeaLevel"
                required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-text-field
                v-model="city.population"
                label="Население"
                hint="Население"
                required
            ></v-text-field>
          </v-flex>

        </v-layout>

      </v-container>

    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" outlined  @click="closeDelete">Закрыть</v-btn>
      <v-btn color="red"  outlined  @click="deleteItem(refactorRow.id)">Удалить</v-btn>
      <v-btn color="green"
             outlined
             @click="saveCity">
        Сохранить
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import axios from "axios";
import EventBus from "@/event-bus";

export default {
  name: "DeleteCity",
  props:{
    refactorRow:{},
    flfl:{},
  },
  data: () => ({
    // city2:{},
    standardOfLivingList: [{name: 'ULTRA_HIGH'}, {name: 'MEDIUM'}, {name: 'LOW'}, {name: 'NIGHTMARE'}],
    climateList: [{name: 'DESERT'}, {name: 'MONSOON'}, {name: 'HUMIDCONTINENTAL'}],
    governmentList: [{name: 'GERONTOCRACY'}, {name: 'IDEOCRACY'}, {name: 'MONARCHY'}],
    governorList: [],
    city: {
      climate: {},
      government: {},
      standardOfLiving: {},
      governor: {
        birthday:{}
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
    response: {},
  }),
  update(){
    this.city = this.refactorRow
    console.log('555555555')
  },
  beforeMount() {
    EventBus.$on("callMethodInChild", () => {
      // this.city = this.refactorRow
      // this.city = this.refactorRow
      // console.log('dsfsdfdsfsdfsdfsdfgds')
      // this.update()
    });
    axios.create({
      baseURL: this.$store.state.baseUrl
    }).get('/humans')
        .then(resp => {
          console.log(resp)
          this.governorList = resp.data
        })
    console.log('----------------')
    console.log(this.refactorRow)
    this.city = this.refactorRow
  },
  methods:{
    saveCity() {
      this.city.climate = this.city.climate.name
      this.city.government = this.city.government.name
      this.city.standardOfLiving = this.city.standardOfLiving.name
      axios.create({
        baseURL: this.$store.state.baseUrl
      }).put('/cities', this.city)
          .then(resp => {
            this.response = resp.data
            console.log(resp.data)
          })
      this.closeDialog();
    },
    closeDelete(){
      this.$emit('updateTable')
      this.onUnmounted();
    },
    deleteItem(id){
      axios.create({
        baseURL: this.$store.state.baseUrl
      }).delete(`/cities/${id}`)
          .then(resp => {
            console.log(resp)
          })
      this.$emit('updateTable')
    },
  },

}
</script>

<style scoped>

</style>