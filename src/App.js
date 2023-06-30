import Directory from './components/directory/directory.component';
import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';

const Shop = () => {
  return <h2>I am an H2, hello</h2>
}

const App = () => {

  return (
    <Routes>
      <Route path='/home' element={<Home />}>
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
