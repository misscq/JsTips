import {debounce} from './utils'
export const itemImgLinstenerMixin ={
	data(){
		return{
			itemImgLinstener: null
		}
	},
	mounted(){
		let refresh = debounce(this.$refs.scroll.refresh,200);
		this.itemImgLinstener = () =>{
			refresh();
		}
		this.$bus.$on('itemImgClick',this.itemImgLinstener);
	}
	
}