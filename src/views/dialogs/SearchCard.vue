<template >
  <v-form ref="form" v-model="valid">
  <v-card dark outlined >
    <v-card-title>
      Поиск
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4 sm4 md2>
            <v-text-field v-model="city.name" label="Название города" required></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-text-field v-model="city.coordinates.x" label="Координата X" hint="X" ></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-text-field
                v-model="city.coordinates.y"
                label="Координата Y"
                hint="Y"
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-text-field
                v-model="city.area"
                label="Площадь"
                hint="area"
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-select
                label="Климат"
                v-model="city.climate"
                :hint="`Климат`"
                :items="climateList"
                item-text="name"
                item-value="name"
                persistent-hint
                single-line
            ></v-select>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-select
                label="Уровень жизни"
                v-model="city.standardOfLiving"
                :hint="`уровень жизни`"
                :items="standardOfLivingList"
                item-text="name"
                item-value="name"
                persistent-hint
                single-line
            ></v-select>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <v-select
                label="Правление"
                v-model="city.government"
                :hint="`Правление`"
                :items="governmentList"
                item-text="name"
                item-value="name"
                persistent-hint
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs4 sm4 md2>
            <v-text-field
                v-model="city.creationDate"
                label="YYYY.MM.DD"
                hint="Дата основания"
                required
            ></v-text-field>
          </v-flex>

          <v-flex xs4 sm4 md2>
            <v-select
                label="Правитель"
                v-model="city.governor"
                :hint="`Правитель`"
                :items="governorList"
                item-text="birthday"
                item-value="id"
                return-object
                persistent-hint
                single-line
            ></v-select>
          </v-flex>

          <v-flex xs4 sm4 md2>
            <v-text-field
                v-model="city.metersAboveSeaLevel"
                label="Высота над уровнем моря"
                hint="metersAboveSeaLevel"
                required
            ></v-text-field>
          </v-flex>

          <v-flex xs4 sm4 md2>
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
      <v-btn color="primary"
             outlined
             @click="closeDialog">
        Закрыть
      </v-btn>
      <v-btn color="green"
             outlined
             @click="shearCity">
        Найти
      </v-btn>
    </v-card-actions>

  </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchCard",
  data: () => ({
    valid: true,
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
    filters: [],
    response: {},
    rules: {
      required: value => !!value || 'Поле обязательно для заполнения.',
      cordY: v => parseInt(v) <= 662 || 'Введите число <=662',
      celoe: v => /^\d+$/.test(v) || 'число должно быть целое',
      moreZero: v => parseInt(v) > 0 || 'Введите значение больше 0',
      cordX: v => parseInt(v) <= 182 || 'Введите число <=182',
      minLen: length => v => v.length >= length || `Минимум ${length} символов`,
      maxLen: length => v => v.length <= length || `Максимум ${length} символов`,

    },
  }),
  methods: {
    info() {
      console.log(this.select)
    },
    closeDialog() {
      this.$emit('updateTable')
      this.$refs.form.reset();
    },

    shearCity() {
      this.filters = []
      if (!this.valid) {
        return;
      }
      var send = {}

      if(this.city.name !=''){
        send.name = 'name'
        send.type = 'EQUALLY'
        send.value = this.city.name
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.coordinates.x !=''){
        send = {}
        send.name = 'x'
        send.type = 'EQUALLY'
        send.value = this.city.coordinates.x
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.coordinates.y !=''){
        send = {}
        send.name = 'y'
        send.type = 'EQUALLY'
        send.value = this.city.coordinates.y
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.area !=''){
        send = {}
        send.name = 'area'
        send.type = 'EQUALLY'
        send.value = this.city.area
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.climate !=''){
        send = {}
        send.name = 'climate'
        send.type = 'EQUALLY'
        send.value = this.city.climate
        this.filters.push(send)
        console.log('____CLIMATE___')
        console.log(this.filters)
      }
      if(this.city.government !=''){
        send = {}
        send.name = 'government'
        send.type = 'EQUALLY'
        send.value = this.city.government
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.creationDate !=''){
        send = {}
        send.name = 'creationDate'
        send.type = 'EQUALLY'
        send.value = this.city.creationDate
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.governor !=''){
        send = {}
        send.name = 'governor'
        send.type = 'EQUALLY'
        send.value = this.city.governor.id
        this.filters.push(send)
        console.log('ekadmjoierjvoimtjerjggsjo;sosrtmrtseghwrth')
        console.log(this.city.governor)
      }
      if(this.city.standardOfLiving !=''){
        send = {}
        send.name = 'standardOfLiving'
        send.type = 'EQUALLY'
        send.value = this.city.standardOfLiving
        this.filters.push(send)
        console.log('___STANDARTofLIVONF___')
        console.log(this.city.standardOfLiving)
        console.log(this.filters)
      }
      if(this.city.population !=''){
        send = {}
        send.name = 'population'
        send.type = 'EQUALLY'
        send.value = this.city.population
        this.filters.push(send)
        console.log(this.filters)
      }
      if(this.city.metersAboveSeaLevel !=''){
        send = {}
        send.name = 'metersAboveSeaLevel'
        send.type = 'EQUALLY'
        send.value = this.city.metersAboveSeaLevel
        this.filters.push(send)
        console.log(this.filters)
      }
      this.$emit('updateTable', this.filters)
      this.$refs.form.reset();

      // this.closeDialog();
    },

  },

  beforeMount() {
    this.city.government = '',
        this.city.climate = '',
        this.city.standardOfLiving = '',
        this.city.governor = '',
        this.city.name = '',
        this.city.coordinates.y = '',
        this.city.coordinates.x = '',
        this.city.area = '',
        this.city.creationDate = '',
        this.city.metersAboveSeaLevel = '',
        this.city.population = '',
        axios.create({
          baseURL: this.$store.state.baseUrl
        }).get('/humans')
            .then(resp => {
              this.governorList = resp.data
            })
  },

}
</script>

<style scoped>

</style>