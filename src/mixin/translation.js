import {  mapGetters } from "vuex";
const whiteList = ["/", "/login", "/signup"];
// mapActions,
export default {
    computed: {
        ...mapGetters(["translations", "locale"]),
    },
    methods: {
        // ...mapActions(["getTranslations"]),
    },
    watch: {
        locale() {
            if (whiteList.indexOf(this.$route.path) === -1) {
                console.log(12354);
                // this.getTranslations();
            } else {
                return false;
            }
        }
    },
    async created() {
        console.log(this.$route);
        if (whiteList.indexOf(this.$route.path) === -1) {
            console.log(12354);
            // await this.getTranslations();
        } else {
            return false;
        }
    },
};
