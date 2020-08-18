import Vue from "vue";
import Flickity from 'vue-flickity';

new Vue({
    el: '#reviews-component',
    template: '#reviews',
    components: {
        Flickity
    },
    data(){
        return {
            reviews: [],
            flickityOptions: {
                groupCells: true,
                prevNextButtons: false
            },
        }
    },
    created(){
        this.reviews=require('../data/reviews.json');
    },
    methods: {
        requireImg(){
            this.reviews = this.reviews.map(review =>{
                review.photo = require(`../images/content/${review.photo}`).default;
                return review;
            })
        },
        next() {
            this.$refs.flickity.next();
        },
        previous() {
            this.$refs.flickity.previous();
        }
    },
    mounted(){
        this.requireImg();
        let ref = this.$refs;
        ref.prevButton.classList.add('reviews__btn_disable');
        this.$refs.flickity.on('settle', function(position){
            if (position == this.slides.length - 1){
                ref.nextButton.classList.add('reviews__btn_disable');
            } else{
                ref.nextButton.classList.remove('reviews__btn_disable');
            }
            if(position == 0){
                ref.prevButton.classList.add('reviews__btn_disable');
            }
            else{
                ref.prevButton.classList.remove('reviews__btn_disable');
            }
        })
    }
})