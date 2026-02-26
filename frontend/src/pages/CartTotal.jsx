import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';

const CartTotal = ({ checkoutLink, buttonText }) => {
  const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = delivery_fee || 0;
  const totalAmount = subtotal + shipping;

  return (
    <div className='w-full'>
      <div className='text-xl sm:text-2xl mb-4'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 text-sm text-gray-700'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {shipping.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between font-semibold text-base'>
          <p>Total</p>
          <p>{currency} {totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Optional checkout button — only shown when checkoutLink is provided (e.g. Cart page) */}
      {checkoutLink && buttonText && (
        <div className='w-full text-end mt-6'>
          <Link to={checkoutLink}>
            <button className='bg-black text-white text-sm px-16 py-3 hover:bg-gray-800 transition-colors'>
              {buttonText.toUpperCase()}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
