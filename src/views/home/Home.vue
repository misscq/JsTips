<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-controll :titles="['流行','新款','精选']" 
                        ref="tabControl1" 
                        @tabClick="tabClick" 
                        class="tab-controll" v-show="isTabFixed"/>
        <scroll class="content" ref="scroll" 
                :probeType="3" :pull-up-load="true"
                @scroll="scrollClick" @pullingUp="pullingupClick">
            <home-swiper :banners="banners" @swiperClick="swipperClick"/>
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-controll :titles="['流行','新款','精选']" 
                            ref="tabControl" 
                            @tabClick="tabClick" />
            <goods-list :goods="showGoods" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    import TabControll from 'components/content/tabControll/TabControll'
    import GoodsList from 'components/content/goods/GoodsList' 
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'
    import {getHomeMultidata , getHomeGoods}  from 'network/home' 
    // import {debounce} from 'common/utils'
    import {itemImgLinstenerMixin} from 'common/mixin'
    export default{
        name:"Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControll,
            GoodsList,
            Scroll,
            BackTop

        },
        data() {
            return{
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0,list: []},
                    'new': {page: 0,list: []},
                    'sell': {page: 0,list: []}
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffSetTop: 0,
                isTabFixed: false,
                saveY: 0,
            }
        },
        created() {
            //请求数据
            this.getHomeMultidata();
            //请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
            
        },
        mounted(){

        },
        mixins: [itemImgLinstenerMixin],
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0);
            this.$refs.scroll.refresh();
        },
        deactivated(){
            this.saveY = this.$refs.scroll.getScrollY();
            this.$bus.$off('itemImgClick',this.itemImgLinstener);
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list;
            }
        },
        methods:{
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res =>{
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    this.$refs.scroll.finishPullUp();
                })
            },

            
            tabClick(index){
                switch(index){
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl.currentIndex = index;
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0);
            },
            scrollClick(position){
                //回到顶部按钮的隐藏与显示
                this.isShowBackTop = (-position.y) > 1000;
                //tabControll是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffSetTop;
            },
            pullingupClick(){
                this.getHomeGoods(this.currentType);
            },
            swipperClick(){
                this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop;
            }

        }
    }
</script>
<style scoped>
    #home{
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: white;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-controll{
        position: relative;
        z-index: 9;
    }
</style>