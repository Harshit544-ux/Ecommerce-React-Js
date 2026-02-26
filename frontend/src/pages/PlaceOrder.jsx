import { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../component/Title'
import CartTotal from './CartTotal'
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10'>

      {/* ------------- Left side: Delivery Information ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-2'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='Last name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='email' placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='number' placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='text' placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500 transition' type='number' placeholder='Phone' />
      </div>

      {/* ------------ Right side: Cart Total + Payment Method ----------- */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[400px]'>

        {/* Cart Total */}
        <CartTotal />

        {/* Payment Method */}
        <div>
          <div className='text-xl sm:text-2xl mb-4'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='flex flex-wrap gap-3'>

            {/* Stripe */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-2 border py-2 px-4 cursor-pointer rounded transition ${method === 'stripe' ? 'border-gray-400' : 'border-gray-200'}`}
            >
              <span className={`w-3.5 h-3.5 border rounded-full flex-shrink-0 ${method === 'stripe' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></span>
              <img src={assets.stripe_logo} className='h-5' alt='Stripe' />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-2 border py-2 px-4 cursor-pointer rounded transition ${method === 'razorpay' ? 'border-gray-400' : 'border-gray-200'}`}
            >
              <span className={`w-3.5 h-3.5 border rounded-full flex-shrink-0 ${method === 'razorpay' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></span>
              <img src={assets.razorpay_logo} className='h-5' alt='Razorpay' />
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-2 border py-2 px-4 cursor-pointer rounded transition ${method === 'cod' ? 'border-gray-400' : 'border-gray-200'}`}
            >
              <span className={`w-3.5 h-3.5 border rounded-full flex-shrink-0 ${method === 'cod' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></span>
              <p className='text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
            </div>

          </div>
        </div>

        {/* Place Order Button */}
        <div className='w-full text-end'>
          <button
            onClick={() => navigate('/orders')}
            className='bg-black text-white text-sm px-16 py-3 hover:bg-gray-800 transition-colors'
          >
            PLACE ORDER
          </button>
        </div>

      </div>

    </div>
  )
}

export default PlaceOrder