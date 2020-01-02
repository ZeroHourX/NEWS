import PostList from "@/components/PostList";


export default {
    name: "index",
    data() {
        return {
            active: localStorage.getItem("token") ? 1 : 0,
            category: [],
            cid: 999,
            pageIndex: 1,
            pageSize: 10
        };
    },
    methods: {
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                const categores = this.category[this.active];
                // 文章列表
                this.$axios({
                    url: `/post?pageIndex=${categores.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
                }).then(res => {
                    const { data } = res.data;
                    if (data.length < this.pageSize) {
                        // 数据全部加载完成
                        categores.finished = true;
                    }

                    categores.post = [...categores.post, ...data];

                    categores.pageIndex++;
                    // 加载状态结束
                    categores.loading = false;
                });
            }, 500);
        }
    },
    mounted() {
        //栏目
        const config = { url: "/category" };

        if (localStorage.getItem("token")) {
            config.headers = {
                Authorization: localStorage.getItem("token")
            };
        }
        this.$axios(config).then(res => {
            const { data } = res.data;
            const newData = [];
            data.forEach(v => {
                v.post = [];
                v.loading = false;
                v.finished = false;
                v.pageIndex = 1;
                newData.push(v);
            });
            this.category = newData;
            // 文章列表
            this.$axios({
                url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
            }).then(res => {
                this.category[this.active].post = res.data.data;
                this.category[this.active].pageIndex++;
            });
        });
    },
    watch: {
        active() {
            this.cid = this.category[this.active].id;
            this.onLoad();
        }
    },
    components: {
        PostList
    }
};