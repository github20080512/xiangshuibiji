class Page {
    constructor() {
        this.curPage = 1
        this.pagesize = 3
        this.curRoute = '#/index/users'
    }
    setCurPage(curPage) {
        this.curPage = curPage
    }
    reset() {
        this.curPage = 1
        this.pagesize = 3
    }
    setCurRoute(route) {
        this.curRoute = route
    }
}
export default new Page()