import React, { useState, useEffect } from 'react';
import Navbar from "../../../common/navbar/Navbar";
import Footer from '../../../common/footer/Footer';
import SearchProductList from './SearchProductList';
import { useLocation } from 'react-router-dom';
import ProductApiService from '../../../../service/ProductApiService';

function SearchProductPage() {
   const location = useLocation();
   const { keyword } = location.state || {};
   const [products, setProducts] = useState([]);
    useEffect(() => {
       const fetchProducts = async () => {
           if (keyword) {
               try {
                   const results = await ProductApiService.getProductWithKeywordAll(keyword);
                   console.log(results);
                   setProducts(results.content);
               } catch (error) {
                   console.error("Error fetching products: ", error);
               }
           }
       };
        fetchProducts();
   }, [keyword]);
    return (
       <div>
           <Navbar />
           <div className="container mx-auto mt-5">
               <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{keyword}"</h2>
               <SearchProductList products={products} />
           </div>
           <Footer />
       </div>
   );
};

export default SearchProductPage;