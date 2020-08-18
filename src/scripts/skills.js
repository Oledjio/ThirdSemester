import Vue from "vue";




const skillsItem ={
    props: ['skill'],
    template: '#skills-item',
    mounted(){
        const circle = this.$refs["colored-circle"];
        const dashArray = parseInt(
            getComputedStyle(circle).getPropertyValue("stroke-dasharray")
        );

        const percent = (dashArray / 100) * (100 - this.skill.percent);
        circle.style.strokeDashoffset = percent;
    }
}

const skillsRow = {
    props: ['category'],
    template: '#skills-row',
    components: {
        skillsItem
    }
}

new Vue ({
    el: '#skills-component',
    template: '#skills-list',
    components: {
        skillsRow
    },
    data() {
        return{
            skills: []
        }
    },
    created(){
        this.skills = require('../data/skills.json');
    }
})
