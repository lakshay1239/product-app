import { useEffect, useState } from 'react'
import stationary from '../assets/stationary.jpeg'
import wearable from '../assets/wearable.jpeg'
import Alert from '@mui/material/Alert';
import shoes from '../assets/shoes.png';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AlertDialog from '../Atoms/Dialog';

function Cart() {

  const [total, setTotal] = useState(0)

  const [data,setData]=useState([])
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [showAlert,setShowAlert] = useState(false)
  const [alertMsg,setAlertMsg] = useState(false)
  

  useEffect( ()=>{
    async function fetchData(){
    const resp=await fetch('http://localhost:3000/cart/',{headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    
    // const products=JSON.parse(resp);
    const data = await resp.json();

    if(resp.status===403){
        setShowAlert(true)
        setAlertMsg('Session Timeout')
    }
    else {
      setData(data);
      let sum = 0;

      for (let i of data) {
        sum += i.price;
      }
      setTotal(sum);
      let categories = [];
      data.forEach(product => {
        if (!categories.includes(product.category))
          categories.push(product.category)
      });
      setCategories(categories);

    }
   

  }
  fetchData();
  },[])

//   const addItem=async (item)=>{
    
//      const response = await axios.post('http://localhost:3000/cart/addItem/', {
//       product:item
//     });
//   }

//   const navigateToCart = () => {
//     navigate('/cart')
//   }

  return (
    <Box>
      <h4>Cart Items</h4>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        {data.map(product => {

          return (
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>

              <Box sx={{
                display: 'flex', flexDirection: 'row'
                , width: 200, borderRadius: '4px'
              }}>
                <img style={{ height: 100 }} src={product.category == 'Stationery' ? stationary : product.name === 'Shoes' ? shoes : wearable} />
                <label style={{ margin: 10 }}>{product.name}</label>
              </Box>
              <Box sx={{ position: 'absolute', right: 70, margin: 1.25 }}>
                <label>Rs. {product.price}</label>
              </Box>
            </Box>
          )
        }
        )}
         <Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>

             <label style={{ margin: 10 }}>Total</label>
              <Box sx={{ position: 'absolute', right: 70, margin: 1.25 }}>
                <label>Rs. {total}</label>
              </Box>
        </Box>
        

      </Box>
      <AlertDialog
        open={showAlert}
        alertMsg={alertMsg}
        handleClose={()=>{setShowAlert(false);navigate('/')}}
      />
              
    </Box>
  )
}

export default Cart
