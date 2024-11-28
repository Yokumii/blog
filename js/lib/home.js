// mixins.home = {
//     mounted() {
//         let background = this.$refs.homeBackground;
//         let images = background.dataset.images.split(",");
//         let id = Math.floor(Math.random() * images.length);
//         background.style.backgroundImage = `url('${images[id]}')`;
//         this.menuColor = true;
//     },
//     methods: {
//         homeClick() {
//             window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
//         },
//     },
// };

mixins.home = {
    mounted() {
        // 调用获取图片的接口
        this.fetchImages().then((images) => {
            if (images && images.length > 0) {
                // 随机选择一张图片
                let id = Math.floor(Math.random() * images.length);
                // 设置背景图片
                let background = this.$refs.homeBackground;
                background.style.backgroundImage = `url('${images[id]}')`;
                this.menuColor = true; // 设置初始菜单颜色状态
            } else {
                console.error("图片列表为空");
            }
        }).catch((error) => {
            console.error("获取图片失败", error);
        });
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
        async fetchImages() {
            try {
                // 替换为真实接口地址
                const response = await fetch("https://www.loliapi.com/acg/pc/");
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                const data = await response.json();
                // 假设返回的数据结构为 { images: ["url1", "url2", "url3"] }
                return data.images || [];
            } catch (error) {
                console.error("接口调用失败", error);
                return [];
            }
        },
    },
};