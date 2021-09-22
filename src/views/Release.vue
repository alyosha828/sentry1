<template>
  <!-- <hello-world /> -->
  <div>
    
    <div>
      <v-form>
        <v-flex xs12>
          <v-row
            align="center"
            justify="center"
          >
            <v-col style="padding-right: 0px">
              <v-select
                solo
                :items="projectTypes"
                clearable
                label="My Projects"
              ></v-select>
            </v-col>
            <v-col style="padding-left: 0px;padding-right: 0px;">
              <v-select
                solo
                :items="projectTypes"
                clearable
                label="All Environments"
              ></v-select>
            </v-col>
            <v-col style="padding-left: 0px;">
              <v-select
                solo
                :items="projectTypes"
                clearable
                label="Last 14 Days"
              ></v-select>
            </v-col>
          </v-row>
          
          <h1>Releases</h1><br><br>
          <v-row
              class="pa-4"
              align="center"
              justify="center"
            >
            <v-col class="text-center">
              <v-autocomplete
                style="background:rgba(0,0,0,0)"
                color="white"
                solo
                dense
                hide-no-data
                hide-selected
                item-text="Description"
                item-value="state"
                label="Search"
                placeholder=""
                prepend-inner-icon="mdi-magnify"
                return-object
                append-icon=""
                >
              </v-autocomplete>
            </v-col>
            <v-col class="text-center" md="1">
              <v-autocomplete
                style="background:rgba(0,0,0,0);widht:100px"
                color="white"
                solo
                :items="states"
                dense
                filled
                label="Status"
                >
              </v-autocomplete>
            </v-col>
            <v-col class="text-center" md="1">
              <v-autocomplete
                style="background:rgba(0,0,0,0);widht:100px"
                color="white"
                solo
                :items="sorts"
                dense
                filled
                label="Sort By"
                >
              </v-autocomplete>
            </v-col>
            <v-col class="text-center" md="1">
              <v-autocomplete
                style="background:rgba(0,0,0,0);widht:100px"
                color="white"
                solo
                :items="displays"
                dense
                filled
                label="Display"
                >
              </v-autocomplete>
            </v-col>
          </v-row>
          
        </v-flex>
      </v-form>
    </div>
    
    <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
        >
          <v-list-item-title>
            <v-card class="mx-auto" style="margin:5px" outlined>
              <div class="releaseCellLeft">
                <span>3.2</span><br>
                <span>checkout-app</span><br>
                <span>a day ago</span>
              </div>
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
              

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        PROJECT NAME
                      </th>
                      <th class="text-left" :width="100">
                        ADOPTION <span style="magin-left:auto;float:right">24H 14D</span> 
                      </th>
                      <th class="text-left">
                        CRASH FREE RATE
                      </th>
                      <th class="text-left">
                        CRASHES
                      </th>
                      <th class="text-left">
                        NEW ISSUES
                      </th>
                      <th class="text-left">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in releases"
                      :key="item.name"
                    >
                      <td>
                        <v-icon outlined style="border-radius:5px;margin-right:5px;"
                              color="#ffffff">
                              {{ "mdi-" + item.type }}
                              {{ item.color }}
                              
                            </v-icon>
                            {{ item.name }}
                            </td>
                      <td style="display: flex;height: 80px;align-items: center;" >
                        {{item.percent}}
                        <div class="releaseChart">
                          <chart-bar :height="80" :data="barChartData"></chart-bar>
                        </div>
                      </td>
                      <td><v-icon outlined style="border-radius:5px;margin-right:5px;"
                              color="#ff0000">
                              mdi-fire
                            </v-icon>
                            {{ item.crash }}
                            </td>
                      <td>{{ item.crashes}}</td>
                      <td>{{item.issues}}</td>
                      <td><v-btn small outlined>View</v-btn></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>  
            </v-card>
          </v-list-item-title>
        </v-list-item>
      </v-list>
  
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

import ".././assets/css/release.css";
import ChartBar from ".././Chart/ChartBarSmall"
  export default {
    name: 'Home',

    components: {
      ChartBar,
    },
    data () {
      let srcs = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''//https://lorempixel.com/400/200/
      }
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
        ],
        releases: [
        {
          id: 0,
          type: 'android',
          color: 'green light',
          name: 'android',
          percent: '50.0%',
          crash: '99%',
          crashes: '9966',
          issues: '3',
          src: 'backgrounds/bg.jpg',
        },
        {
          id: 1,
          type: 'apple',
          color: 'black',
          name: 'ios',
          percent: '56.0%',
          crash: '99.5%',
          crashes: '9966',
          issues: '3',
          src: 'backgrounds/md.jpg',
        },
        {
          id: 2,
          type: 'language-python',
          color: 'blue light',
          name: 'python',
          percent: '60.9%',
          crash: '99%',
          crashes: '9966',
          issues: '3',
          src: 'backgrounds/bg-2.jpg',
        },
        {
          id: 3,
          type: 'react',
          color: 'blue',
          name: 'react',
          percent: '50.%',
          crash: '99%',
          crashes: '9966',
          issues: '3',
          src: 'backgrounds/md2.jpg',
        },
        {
          id: 4,
          type: 'react',
          color: 'blue',
          percent: '50.09%',
          crash: '99%',
          crashes: '9966',
          name: 'react-native',
          issues: '3',
          src: 'backgrounds/md2.jpg',
        },
      ],
        
        barChartData: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
            datasets: [{
              label: "Sales",
              backgroundColor: '#a59ddb',
              borderWidth: 0,
              borderSkipped: false,
              borderRadius: 0,
              data: [850, 600, 500, 620, 900, 500, 900, 630, 900],
              maxBarThickness: 20,
            }, {
              label: "myTest",
              backgroundColor: '#d0cad8',
              borderWidth: 0,
              borderSkipped: true,
              borderRadius: 0,
              data: [250, 800, 400, 520, 1000, 100, 900, 630, 1200],
              maxBarThickness: 20,
            }],
        },
        searchString:"",
        isUpdating: false,
        people: [
          { header: 'Sellers' },
          { name: 'Sandra Adams', group: 'Sellers', avatar: srcs[1] },
          { name: 'Willy Wonka', group: 'Sellers', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Sellers', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Sellers', avatar: srcs[2] },
          { divider: true },
          { header: 'Products' },
          { name: 'Remote V12X32', group: 'Products', seller: 'Arnold Systems', avatar: srcs[4] },
          { name: 'Crunchy tab', group: 'Products', seller: 'Willy Wonka', avatar: srcs[5] },
          { name: 'Love potion (potent)', group: 'Products', seller: 'Severus Snape', avatar: srcs[1] },
          { name: 'Mechanical Kitty', group: 'Products', seller: 'Me Me', avatar: srcs[3] }
        ],
        title: 'The summer breeze',
        states: ['Active', 'Inactive'],
        sorts: ['Data Created', 'Total Sessions', 'Active Sessions', 'Crash Free Sessions'],
        displays: ['Sessions', 'Users'],
        projectTypes: 
            ["android","ios","python","react","react-native"],
        
      }
    },
    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      }
    },
    methods:{
      helo(){
        console.log(this.searchString);
      },
    }
  }
</script>
