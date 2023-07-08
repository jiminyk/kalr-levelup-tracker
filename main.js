/* import { inject } from '@vercel/analytics';
 
inject(); */

const app = Vue.createApp({
    data() {
        return {
            currentEnergy: null,
            currentXP: null,
            xpToLevelUp: null,
            timeToLevelUp: 0,
            xpPerEnergy: 10,
            totalEnergyRequired: 0,
            energyRegenRate: 1 / 5 // energy regenerated per minute
        };
    },
    computed: {
        formattedTimeToLevelUp() {
            let hours = Math.floor(this.timeToLevelUp / 60);
            let minutes = this.timeToLevelUp % 60;

            if (hours > 0) {
                return `${hours} hour(s) ${minutes} minute(s)`;
            } else {
                return `${minutes} minute(s)`;
            }
        }
    },
    methods: {
        calculateTimeToLevelUp() {
            let xpNeeded = this.xpToLevelUp - this.currentXP;
            let energyNeeded = Math.ceil(xpNeeded / this.xpPerEnergy);
            let minEnergySpend = 3; // Minimum energy that can be spent at a time
            
            // This will ensure that even if less than 3 energy is needed, it will still show a minimum of 3 energy required
            energyNeeded = Math.max(energyNeeded, minEnergySpend);
        
            let energyDeficit = Math.max(0, energyNeeded - this.currentEnergy);
            this.totalEnergyRequired = energyNeeded;
            let finalTimeToLevelUp = Math.round(energyDeficit / this.energyRegenRate);
        
            this.timeToLevelUp = 0;
            let intervalId = setInterval(() => {
                this.timeToLevelUp++;
                if (this.timeToLevelUp >= finalTimeToLevelUp) {
                    clearInterval(intervalId);
                }
            }, 50); // Adjust this value to change the speed of the count up
        }
    }
});

app.mount('#app');
