import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Berlangsung from './pages/Berlangsung';
import Tambah from './pages/Tambah';
import { useEffect, useState } from 'react';
import Celengan from './pages/Celengan';
import Selesai from './pages/Selesai';

function App() {

  const getCelengan = () => {
    let celengan = JSON.parse(localStorage.getItem("celenganku") || "[]")
    if (celengan) {
      return celengan
    }
    return []
  }
  const [celengans, setCelengans] = useState(getCelengan())
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      localStorage.setItem("celenganku", JSON.stringify(celengans))
     }
     else{
      alert("Harap Menggunakan Hp untuk Pengalaman yang lebih baik")
      return
     }
     
   
  }, [celengans])

  
  return (
    <div className="bg-gray-800 min-h-screen">
      <Router>
        <Routes>
          <Route path='/' element={<Berlangsung celengans={celengans} setCelengans={setCelengans} />} />
          <Route path='/tercapai' element={<Selesai celengans={celengans} />} />
          <Route path='/tambah' element={<Tambah celengans={celengans} setCelengans={setCelengans} />} />
          <Route path='/celenganku/:id' element={<Celengan celengans={celengans} setCelengans={setCelengans} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
