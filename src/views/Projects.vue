<template>
  <div class="Projects">
    <h1>Projects</h1>
    <v-btn class="createProjectBtn" disabled tile outlined color="black">
      <v-icon left>mdi-plus-circle-outline</v-icon> Create Projects
    </v-btn><br>
    <div class="projectsIconTitle">
      <div class="projectsIcon">
          ES
      </div>#easy-starfish
      <div>

      </div>
      
      <div class="projectsUserList">
        <v-flex v-for="item in this.members" :key="item.id">
              <v-avatar style="margin-left:-10px" outlined color="brown"
                      size="48">
                <img style="border-style: solid;
                            border-color: #ffffff;
                            border-width: 3px;"
                  :src="item"
                  alt="John"
                >
                <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
              </v-avatar>
        </v-flex>
      </div><br /><br />
    </div>
    
                
    <v-item-group v-model="selected"
        multiple>
      <v-container>
        <v-row>
          <v-col
            v-for="item in projects"
            :key="item.id"
            cols="12"
            md="6"
          >
            <v-item v-slot="{ active, toggle }">
              <v-card
                class="text-right"
                height="400"
              >
                <div class="projectsCell">
                  <v-icon outlined style="border-radius:5px;margin-right:5px;"
                    color="#ffffff">
                    {{ "mdi-" + item.type }}
                    {{ item.color }}
                    
                  </v-icon>
                  {{ item.name }}
                </div>
                <v-btn
                  icon
                  light
                >
                  <v-icon 
                    @click="toggle">
                    {{ active ? 'mdi-star' : 'mdi-star-outline' }}
                  </v-icon>
                  </v-btn><br>
                <div class="projectCellDetail">
                  errors:178 | transactions:0
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      
                      <v-icon right 
                        dark
                        v-bind="attrs"
                        v-on="on" color="#A0A0A0" small>mdi-help-circle-outline
                      </v-icon>
                    </template>
                    <div style="text-align:center">
                      <span>Click here to learn more about <br> performance monitoring</span>
                    </div>
                  </v-tooltip>
                  <!-- <v-icon right color="#A0A0A0" small>mdi-help-circle-outline
                    
                  </v-icon> -->
                </div><br><br>
                <div class="projectsChart">
                   <chart-bar :height="110" :data="barChartData1"></chart-bar>
                   <chart-bar :height="110" :data="barChartData2"></chart-bar>
                </div>
                <div class="projectsCellFooter">
                  <v-row justify="space-around">
                    <div style="text-align: left;line-height: normal;">
                      <span class="cellName">Crash Free Sessions</span><br>
                      <span class="percenteValue">95%</span><br>
                      <span class="projectsDown"><v-icon style="float: left;" color="red" left small>mdi-arrow-down</v-icon>1%</span>
                    </div>
                    <div style="text-align: left;
                    ">
                      <span class="cellName">Latest Deploys</span><br>
                      <v-btn
                        class="ma-2;float:left"
                        outlined
                        color="#bdb1ca"
                        small
                        @click="loader = 'loading'"
                        href="https://docs.sentry.io/product/releases/" target="_blank"
                      >
                        Track Deploys
                      </v-btn>
                      </div>
                  </v-row>
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    
  </div>
</template>
<script>
import ChartBar from ".././Chart/ChartBar"
import ".././assets/css/projects.css";
const members = [ 'https://cdn.vuetifyjs.com/images/john.jpg', 
'https://cdn.vuetifyjs.com/images/john.jpg', 
'https://cdn.vuetifyjs.com/images/john.jpg', 
'https://cdn.vuetifyjs.com/images/john.jpg']
export default {
  components: {
    ChartBar,
  },
  data:()=>({
    members,
    projects: [
        {
          id: 0,
          type: 'android',
          color: 'green light',
          name: 'android',
          src: 'backgrounds/bg.jpg',
        },
        {
          id: 1,
          type: 'apple',
          color: 'black',
          name: 'ios',
          src: 'backgrounds/md.jpg',
        },
        {
          id: 2,
          type: 'language-python',
          color: 'blue light',
          name: 'python',
          src: 'backgrounds/bg-2.jpg',
        },
        {
          id: 3,
          type: 'react',
          color: 'blue',
          name: 'react',
          src: 'backgrounds/md2.jpg',
        },
        {
          id: 4,
          type: 'react',
          color: 'blue',
          name: 'react-native',
          src: 'backgrounds/md2.jpg',
        },
      ],
    items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selected: [],
      barChartData1: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
					datasets: [{
						label: "Sales",
						backgroundColor: '#a59ddb',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 0,
						data: [5, 8, 14, 16, 6, 17, 8, 1, 15, 5, 8, 14, 16, 6, 17, 8, 1, 15],
						maxBarThickness: 30,
					// }, {
					// 	label: "myTest",
					// 	backgroundColor: '#d0cad8',
					// 	borderWidth: 0,
					// 	borderSkipped: true,
					// 	borderRadius: 0,
					// 	data: [250, 800, 400, 520, 1000, 100, 900, 630, 1200],
					// 	maxBarThickness: 20,
					}],
				},
        barChartData2: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09","01", "02", "03", "04", "05", "06", "07", "08", "09"],
					datasets: [{
						label: "myTest",
						backgroundColor: '#d0cad8',
						borderWidth: 0,
						borderSkipped: true,
						borderRadius: 0,
						data: [8, 17, 3, 4, 11, 2, 11, 16, 2, 8, 17, 3, 4, 11, 2, 11, 16, 2],
						maxBarThickness: 30,
					}],
				},
    }),
  setup() {
    
  },
  mounted() {
  },
}
</script>