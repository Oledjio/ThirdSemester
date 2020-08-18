import Vue from 'vue';


const thumbs = {
    props: ['works', 'currentWork'],
    template: "#preview-thumbs"
}

const btns = {
    template: "#preview-btns"
}

const display = {
    props: ['currentWork', 'works', 'currentIndex'],
    template: "#preview-display",
    components: {thumbs, btns},
    computed: {
        reversedWorks(){
            const works =[...this.works]
            return works.reverse();
        }
    }
}

const tags = {
    props: ["tags"],
    template: "#preview-tags"
}

const info = {
    props: ['currentWork'],
    template: "#preview-info",
    components: {tags},
    computed:{
        tagsArr(){
            return this.currentWork.skills.split(",");
        }
    }
}

new Vue ({
    el: "#preview-component",
    template: "#preview-container",
    components: {display, info},
    data(){
        return{
            works: [],
            currentIndex: 0
        }
    },
    computed:{
        currentWork(){
            return this.works[this.currentIndex];
        }
    },
    watch: {
        currentIndex(value){
            this.infiniteIndex(value);
        }
    },
    methods: {
        infiniteIndex(index){
            const worksNumber = this.works.length - 1
            if(index < 0){
                this.currentIndex = worksNumber;
            }
            if(index > worksNumber){
                this.currentIndex = 0;
            }
        },
        requireImg(data){
            return data.map(item =>{
                const requireImages = require(`../images/content/${item.photo}`).default;
                item.photo = requireImages;
                return item;
            });
        },
        slide(direction){
            switch(direction){
                case 'next':
                    this.currentIndex++;
                    break
                case 'prev': 
                    this.currentIndex--;
                    break
            }
        },
        handleBtnImage(workId) {
            this.works.forEach((element, index) => {
                if (element.id === workId) {
                    return this.currentIndex = index;
                }
            });
        },
    },
    created(){
        const data = require('../data/works.json');
        this.works = this.requireImg(data);
    }
});