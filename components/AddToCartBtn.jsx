'use client'
import { Minus, Plus } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { CartItem } from './atoms/userAuth'
import { toast } from './ui/use-toast'

const addToCartBtn = ({data}) => {
    const [counter, setcounter] = useState(1)
    const [ cartInfo , setCartInfo ] = useRecoilState(CartItem)
    const cartItems = {
        id:data._id,
        name:data.name,
        img:data.Img,
        price:data.price,
        qty:counter
        
    }
    let existingCartItems

    if (typeof window !== 'undefined') {
         existingCartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
        
    }
    const cartItemHandler = ()=>{
        if(existingCartItems.length===0){
            toast({
                className:"bg-primary text-black ",
                description:"Added to Cart"
            })
            existingCartItems.push(cartItems)
            localStorage.setItem("cartItem",JSON.stringify(existingCartItems))
            setCartInfo(existingCartItems)
        } else {
            const cartCheck = existingCartItems.filter((item)=>item.id!==cartItems.id)
            cartCheck.push(cartItems)
            localStorage.setItem("cartItem",JSON.stringify(cartCheck))
            toast({
                className:"bg-primary text-black  ",
                description:"Added to Cart"
            })
            setCartInfo(cartCheck)
        }   
    }
        useEffect(()=>{

        },[cartItemHandler])
  return (
    <Fragment>
    <div className='flex flex-col gap-24 ' style={{userSelect:"none"}}   >
    <div className='flex' >
        <div className='cursor-pointer' onClick={()=>{if(counter>1){setcounter(counter - 1)}}} >
            <Minus/>
        </div>
        <div className='px-5 font-bold disabled: ' >
            {counter}
        </div>
        {/* add condition to compare stock w counter */}
        <div className='cursor-pointer' onClick={()=>{setcounter(counter + 1)}} >
        <Plus/>
        </div>
    </div>
    <div  className='text-md h-[10px]' onClick={cartItemHandler} > <button className='bg-primary py-2 px-4 rounded-sm '  > Add to Cart </button> </div>
    </div>
    </Fragment>

  )
}

export default addToCartBtn