
import Login from '@/page/Login'
import Registration from "@/page/Registration"
import Personal from "@/page/Personal"
import EditProfile from "@/page/EditProfile"
import UserFollows from "@/page/UserFollows"
import UserComments from "@/page/UserComments"
import UserStar from "@/page/UserStar"
import ListIndex from "@/page/ListIndex"
import ListDetail from "@/page/ListDetail"

const routes = [
    // dynamic segments start with a colon
    { path: '/login', component: Login },
    { path: '/registration', component: Registration },
    { path: '/personal', component: Personal },
    { path: '/edit_profile', component: EditProfile },
    { path: '/user_follows', component: UserFollows },
    { path: '/user_comments', component: UserComments },
    { path: '/user_star', component: UserStar },
    { path: '/', component: ListIndex },
    { path: '/list_detail/:id', component: ListDetail },
]

export default routes;