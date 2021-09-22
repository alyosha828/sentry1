<template>
    
   <v-navigation-drawer style="background:#331c3c;margin-top:64px;padding-top:10px" app>
       
       <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn
                color="transport"
                dark
                v-bind="attrs"
                v-on="on"
                > -->
                <div class="NavTopBar"
                v-bind="attrs" v-on="on">
                    <div class="NavTopBarIcon">
                        <span class="avatar e169svp62 css-11kp9nm ery3g4h1" type="letter_avatar" title="easy starfish" style="width: 32px; height: 32px;"><svg viewBox="0 0 120 120" class="css-1m9umwh ewkzefl0"><rect x="0" y="0" width="120" height="120" rx="15" ry="15" fill="#3fa372"></rect><text x="50%" y="50%" font-size="65" text-anchor="middle" fill="#FFFFFF" style="dominant-baseline: central;">ES</text></svg></span>
                    </div>
                    <div style="color:white;padding-left:50px;height: 50px;">
                        Easy Starfishi<v-icon right color="white">mdi-chevron-down</v-icon>
                        <div style="color:#7e6b8d;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;float:left;width:150px">User emaildfdfd fdfdfddfdfdffddfdsdsadasdasd</div>
                    </div>
                    
                </div>
                <!-- </v-btn> -->
            </template>
            <v-card>
                <div class="TopBarIconPopup">
                    <span class="avatar e169svp62 css-11kp9nm ery3g4h1" type="letter_avatar" title="easy starfish" style="width: 32px; height: 32px;"><svg viewBox="0 0 120 120" class="css-1m9umwh ewkzefl0"><rect x="0" y="0" width="120" height="120" rx="15" ry="15" fill="#3fa372"></rect><text x="50%" y="50%" font-size="65" text-anchor="middle" fill="#FFFFFF" style="dominant-baseline: central;">ES</text></svg></span>
                    
                    <span>
                        <span style="display: block;margin-left: 5px;">Easy Starfishi</span>
                        <span style="display: block;font-size: 12px;margin-left: 5px;color: gray;">5 Projects</span>
                    </span>
                    
                </div><br><br>
                
                <!-- <v-divider></v-divider> -->
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    >
                    <v-list-item-title><v-btn style="justify-content: left;padding: 0 0px;" text block>{{ item.title }}</v-btn></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
        <v-tabs vertical 
          slider-color="#6c5fc7"
            background-color="#331c3c"
            center-active
            v-model="active_tab"
            dark>
            <v-tab id=NavMenuItem >
                <router-link to="/projects">
                
                    <v-icon left red>
                    mdi-file-code
                    </v-icon>
                    Projects
                            
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/issues">
                    <v-icon left>
                    mdi-text-box-multiple-outline
                    </v-icon>
                    Isuues
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-lightning-bolt-outline
                    </v-icon>
                    Performance
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/release">
                    <v-icon left>
                    mdi-archive
                    </v-icon>
                    Releases
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-headset-dock
                    </v-icon>
                    User Feedback
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-alarm-light-outline
                    </v-icon>
                    Alerts
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-toy-brick-search
                    </v-icon>
                    Discover
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-chart-line
                    </v-icon>
                    Dashboard
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-view-compact-outline
                    </v-icon>
                    Activities
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-chart-box-outline
                    </v-icon>
                    Stats
				</router-link>
            </v-tab>
            <v-tab id=NavMenuItem>
                <router-link to="/projects">
                    <v-icon left>
                    mdi-cog-outline
                    </v-icon>
                    Settings
				</router-link>
            </v-tab>
        </v-tabs>
  </v-navigation-drawer>
</template>
<script>

import ".././assets/css/navigationdrawer.css";
export default {
    data: () => ({
        active_tab: 0,
        items: [
                { title: 'Oganization settings' },
                { title: 'Members' },
                { title: 'Teams' },
            ],
    }),
    setup() {
        
    },
}
</script>