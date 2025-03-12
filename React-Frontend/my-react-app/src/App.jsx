import Signup from "./components/authentication/sign-up";


function App(){
return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Login/>} />
            <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
);
}

export default App;