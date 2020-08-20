const Methods = {

    /**
     * @description跳转到设置页面
     */

    settingClick() {
        this.$router.push({ name: 'Setting' })
    },
    /**
     * @description通过被选中的标签来更新table
     * 1.改变tableTitle、tableColumns、buttonList的数据来更新table
     */
    activeClick(index) {
        this.$router.push('/home/table' + index);
    },

    /**
     * @description鼠标点击左侧导航栏的下拉选项来更新table上面的面包屑的文字
     * 1.e.key是鼠标点击导航栏时下拉选项的key值,注意：不是标题的key值
     * 2.e.key == 0时对应的title为'我的部员';e.key == 1时对应的title为'一面';其他同理
     */
    handleClick(e) {
        e.key *= 1;
        if (e.key === 0) {
            this.clickedTitle = this.title[0];
        } else if (e.key === 4) {
            this.clickedTitle = this.title[4];
        } else if (e.key === 5) {
            this.clickedTitle = this.title[1];
        }
        else {
            this.clickedTitle =
                e.key <= 6 && e.key > 4 ? this.title[2] : this.title[3];
        }
        this.current = e.key + '';
        this.clickedHandle = this.handle[e.key];
    },

    /**
     * @description鼠标点击左侧导航栏的标题来更新table上面的面包屑文字
     */
    titleClick(e) {
        e.key *= 1;
        this.clickedTitle = this.title[e.key];
        this.clickedHandle = "";
    },

    /**
     * @description更改主题颜色
     */
    changeTheme() {
        this.theme = (this.theme === 'dark') ? 'light' : 'dark'
    },

    /**
    * @description退出登录
    * 把vuex中的login改为false
    */
    logOut() {
        this.$store.commit({
            type: "LOG_OUT"
        });
        this.$router.push({ name: 'Login' })
    }
}

export default Methods