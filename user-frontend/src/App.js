import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

// Intro folder imports
import LandingPage from './pages/Intro/LandingPage';
import Signup from './pages/Intro/Signup';
import Home from './pages/Intro/Home';
import Login from './pages/Intro/Login';
import Logout from './pages/Intro/Logout';

// Content folder imports 
import About from './pages/content/About';
import Contact from './pages/content/Contact';

// Account folder imports
import DeleteAccount from './pages/Account/DeleteAccount';
import DisplayAccount from './pages/Account/DisplayAccount';
import EditAccount from './pages/Account/EditAccount';

// BuyNow folder imports
import BuyOptions from './pages/BuyNow/BuyOptions';
import BuyAirtime from './pages/BuyNow/BuyAirtime/BuyAirtime';
import AirtimeReceipt from './pages/BuyNow/BuyAirtime/AirtimeReceipt';
import BuyData from './pages/BuyNow/BuyData/BuyData';
import DataReceipt from './pages/BuyNow/BuyData/DataReceipt';
import BuyElectricity from './pages/BuyNow/Buyelectricity/BuyElectricity';
import ElectricityReceipt from './pages/BuyNow/Buyelectricity/ElectricityReceipt';
import PayWaterBill from './pages/BuyNow/Paywaterbill/PayWaterBill';
import WaterBillReceipt from './pages/BuyNow/Paywaterbill/WaterBillReceipt';

// PayBeneficiaries imports
import PayBeneficiary from './pages/PayBenafcieries/PayBeneficiary';

// Wallet import 
import Wallet from './pages/WalletFolder/Wallet';

const App = () => {
  
  return(
    <div>
      <Navbar />

      <Routes>
        {/*Intro folder routes*/}
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/home' element={<Home hasFooter={true} />} />

        {/* content folder routes */}
        <Route path='/about' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />

        {/*PayBeneficiaries folder routes*/}
        <Route path='/pay-beneficiary' element={<PayBeneficiary />} />

        {/*Wallet folder routes*/}
        <Route path='/wallet' element={<Wallet />} />

        {/*Account folder routes*/}
        <Route path='/delete-account' element={<DeleteAccount />} />
        <Route path='/display-account' element={<DisplayAccount />} />
        <Route path='/edit-account' element={<EditAccount />} />

        {/*BuyNow folder routes*/}
        <Route path='/buy-options' element={<BuyOptions />} />
        <Route path='/buy-airtime' element={<BuyAirtime />} />
        <Route path='/airtime-receipt' element={<AirtimeReceipt />} />
        <Route path='/buy-data' element={<BuyData />} />
        <Route path='/data-receipt' element={<DataReceipt />} />
        <Route path='/buy-electricity' element={<BuyElectricity />} />
        <Route path='/electricity-receipt' element={<ElectricityReceipt />} />
        <Route path='/pay-water-bill' element={<PayWaterBill />} />
        <Route path='/water-bill-receipt' element={<WaterBillReceipt />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  )
}

export default App