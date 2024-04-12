
import { BrowserRouter as Router ,Route , Routes, Navigate} from "react-router-dom"
import { HomePage } from "./pages/homePage"
import "./global.css"
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { PostPage } from "./pages/postPage";
export const Routing = () => {
    return  (
        <Router>
            <Routes>
                <Route path='/Home' element={<HomePage/>}>
                </Route>
                <Route path='/Register' element={<RegisterPage/>}>
                </Route>
                <Route path='/Login' element={<LoginPage/>}>
                </Route>
                <Route path='/Post' element={<PostPage/>}>
                </Route>
                <Route path='' element = {<Navigate to="/Home" />}>
                </Route>
            </Routes>
        </Router>


    );
}