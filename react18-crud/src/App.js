import './App.css';
import Layout from './components/shared/Layout';
import ListTvShow from './pages/ListTvShow';
import AddTvShow from './pages/AddTvShow';
import UpdateTvShow from './pages/UpdateTvShow';
import { Route, Routes } from "react-router-dom";
 
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListTvShow />} />
      </Routes>
      <Routes>
        <Route path="/add-tvshow" element={<AddTvShow />} />
      </Routes>
      <Routes>
        <Route path="/update-tvshow/:id" element={<UpdateTvShow />}/>
      </Routes>
    </Layout>
  );
}
 
export default App;