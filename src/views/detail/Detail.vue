<template>
    <div id="detail">
        <detail-nav-bar />
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shopInfo"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo" />
            <detail-comment-info :commentInfo="commentInfo" />
            <goods-list :goods="recommendList"></goods-list>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    import itemImgLinstenerMixin from 'common/mixin'
    export default{
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shopInfo: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommendList: Array
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            Scroll

        },
        created(){
            this.iid = this.$route.params.iid;
            //获取详情信息
            getDetail(this.iid).then(res => {
                console.log(res);
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                 //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                //获取店铺信息
                this.shopInfo = new Shop(data.shopInfo);
                //商品详细信息
                this.detailInfo = data.detailInfo;
                //商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
                //获取评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
	            }
            })

            //获取推荐信息
            getRecommend().then(res =>{
                this.recommendList = res.data.list;
            })

           
        },
        mixins: [itemImgLinstenerMixin],
        mounted(){

        },
        destoryed(){
            this.$bus.$off('itemImgClick',this.itemImgLinstener);
        },
        methods:{
            imageLoad(){
                this.$refs.scroll.refresh();
            }
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #ffffff;
        height: 100vh;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>