import React, { Fragment} from 'react'
import ProductCard from './productCard'
import PaginationComponent from './PaginationComponent'
import axios from 'axios';

async function getData(params,category,price) {
  try {
     const { data } = await axios.get(`http://localhost:3000/api/allProducts?page=${params ?? "1"} ${category ? `&category=${category}` : "" } ${price ? `&price=${price}` : ""} `);
     const { data:data2 } = await axios.get(`http://localhost:3000/api/adminallProducts`);
     if(data.success==='false'){
      throw new Error('failed to fetch data')
     }
     return {data,data2}
   } catch (error) {
     console.log('failed to fetch data',error)
   }
    
 } 
 
 const ProductList = async({params,category,price}) => {
   const {data , data2} = await getData(params,category,price); 
  return (
   <Fragment>
    <div className='flex flex-wrap w-[100%] m-auto justify-evenly gap-0 ' >
      {
        data.products.length === 0 ?
        <div className='text-2xl grid justify-center items-center h-[500px] w-[100%] font-bold ' >
        No Products Found
        </div>
        :       
              data.products.map((plant)=>(
                <ProductCard id={plant._id} img={plant.Img} key={plant._id} name={plant.name} price={plant.price} plant={plant} />       
              )
          )       
        }
     </div>
        <PaginationComponent currentPageNo={params} productList={data2.products.length} category={category} price={price}  />
   </Fragment>
  )
}


export default ProductList

