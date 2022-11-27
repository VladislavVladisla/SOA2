<template>
  <v-form ref="form" v-model="valid">
    <v-card dark outlined>
      <v-card-title>
        Добавить новый город
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
                  v-model="city.name"
                  :rules="[rules.required, rules.minLen(1), rules.maxLen(20)]"
                  label="Название города">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                  v-model="city.coordinates.x"
                  :rules="[rules.required, rules.minLen(1), rules.cordX]"
                  label="Координата X"
                  hint="X"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                  v-model="city.coordinates.y"
                  :rules="[rules.required, rules.minLen(1), rules.cordY]"
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
                  :rules="[rules.required, rules.minLen(1),rules.moreZero]"
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
                  :rules="[rules.required,rules.moreZero]"
                  label="Высота над уровнем моря"
                  hint="metersAboveSeaLevel"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field
                  v-model="city.population"
                  :rules="[rules.required, rules.minLen(1),rules.moreZero]"
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
               @click="saveCity">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>

import axios from "axios";

export default {
  name: "AddCity",
  // для vuelidate
  data: () => ({
    valid: true, // для vuetify
    standardOfLivingList: [{name: 'ULTRA_HIGH'}, {name: 'MEDIUM'}, {name: 'LOW'}, {name: 'NIGHTMARE'}],
    climateList: [{name: 'DESERT'}, {name: 'MONSOON'}, {name: 'HUMIDCONTINENTAL'}],
    governmentList: [{name: 'GERONTOCRACY'}, {name: 'IDEOCRACY'}, {name: 'MONARCHY'}],
    governorList: [],
    city: {
      climate: '',
      government: '',
      standardOfLiving: '',
      governor: {birthday:'2022-11-12', id: 1 },
      name: '',
      coordinates: {
        y: '',
        x: '',
      },
      area: '',
      creationDate: '',
      metersAboveSeaLevel: '',
      population: '',
      add: false,
    },
    response: {},
    // для vuetify
    // примеры: https://vuetifyjs.com/en/components/forms/#validation-with-submit-26-clear
    rules: {
      required: value => !!value || 'Поле обязательно для заполнения.',
      cordY: v => parseInt(v) <= 662 || 'Введите число <=662',
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
      this.$emit('updTable', this.city)
      this.city.government = '',
      // this.city.governor = '',
      this.city.climate = '',
      this.city.name = '',
      this.city.coordinates.y = '',
      this.city.coordinates.x = '',
      this.city.area = '',
      this.city.metersAboveSeaLevel = '',
      this.city.population = '',
      this.$refs.form.reset();
      this.city.add = false
    },

    // для vuelidate
    getErrors(name, model) {
      const errors = [];
      if (!model.$dirty) return errors;

      switch (name) {
        case "area":
          if (model.required.$invalid) {
            errors.push("Поле area обязательно для заполнения");
          }
          if (model.minValue.$invalid) {
            errors.push(`Значение в поле area должно быть не менее ${model.minValue.$params.min}`);
          }
          break;
        default:
          break;
      }
      return errors;
    },

    saveCity() {
      // для vuelidate
      // this.v$.$touch();
      // if (this.v$.$invalid) {
      //   return;
      // }
      // для vuetify
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      this.city.creationDate = undefined
      axios.create({
        baseURL: this.$store.state.baseUrl
      }).post('/cities', this.city)
          .then(resp => {
            console.log('addCity')
            this.response = resp.data
            this.city.add = true
            this.closeDialog();
          })
    },

  },

  beforeMount() {
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
