<template>
    <div class="detailNavBar">
        <nav-bar>
            <div slot="left" class="tab-left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="" />
            </div>
            <div slot="center" class="tab-center">
                <div v-for="(item,index) in titles" class="tab-center-item"
                    :class="{active: index === currentIndex}"
                    @click="tabClick(index)" >{{item}}</div> 
            </div>
        </nav-bar>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default{
        name: "DetailNavBar",
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        components:{
            NavBar
        },
        methods:{
            tabClick(index){
                this.currentIndex = index;
            },
            backClick(){
                this.$router.back();
            }
        }
    }
 </script>
 <style scoped>
     .tab-left{
         margin-top: 6px;
         height: 20px;
     }
     .tab-center{
         display: flex;
         font-size: 14px;
     }
     .tab-center-item{
         flex: 1;
     }
     .active{
         color: var(--color-high-text);
     }
 </style>