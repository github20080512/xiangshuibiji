import BackTop from "components/content/backTop/BackTop";
export const backTopMixin={
  components:{
        BackTop
    },
    data(){
      return{
        isShowBackTop: false,
      }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
          },
          isListenShowBackTop(position){
         
            if (Math.abs(position.y) > 1000) {
                this.isShowBackTop = true;
              } else {
                this.isShowBackTop = false;
              }
          }
    },
}