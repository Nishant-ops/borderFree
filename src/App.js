import './App.css';
import CSVupload from './Pages/CSVupload';
import ProductListPage from './Pages/ProductListPage';
import Product from './Components/Product';
import {BrowserRouter as Router,Routes,useRoutes,Route,BrowserRoute,Path} from 'react-router-dom';



const AppWrapper = () => {
  let routes = useRoutes([
    { path: "/", element: <CSVupload /> },
    { path: "/products", element: <ProductListPage /> },
    // ...
  ]);
  return routes;
};

const App= () => {
  return (
    <Router>
    <AppWrapper/>
    </Router>
  );
};

export default App;
