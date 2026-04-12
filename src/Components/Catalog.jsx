import React, { useEffect, useState } from 'react'
import stationary from '../assets/stationary.jpeg'
import wearable from '../assets/wearable.jpeg'
import cart from '../assets/cart.png'
import shoes from '../assets/shoes.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertDialog from '../Atoms/Dialog'
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers=
{
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  
};

function Catalog() {

  const [count, setCount] = useState(0)
  const [categories, setCategories] = useState([])
  const [category,setCategory] = useState('')
  const [data,setData]=useState([])
  const [pageData,setPageData]=useState([])
  const navigate = useNavigate();
  const [showAlert,setShowAlert] = useState(false)
  const [alertMsg,setAlertMsg] = useState(false)
  const itemsPerPage=4
  const [page, setPage] = React.useState(1);
  const [showSuccess,setShowSuccess] = useState(false)

  const handleChange = (event, value) => {
    setPage(value);
    getPageDataForCategory(category,value)
  };

  useEffect( ()=>{
    async function fetchData(){
    const resp=await fetch('http://localhost:3000/products/',{headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    
    // const products=JSON.parse(resp);
    const data = await resp.json();

    if(resp.status===403){
       setAlertMsg("Session Timeout")
       setShowAlert(true)
       return;
    }
    setData(data);
    let categories=[];
    data.forEach(product => {
      if(!categories.includes(product.category))
        categories.push(product.category)
    });
    setCategories(categories);

  }
  fetchData();
  },[])

  const addItem = async (item) => {
    try {
      const response = await axios.post('http://localhost:3000/cart/addItem/', {
        product: item
      },{
      headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }});
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 6000)
    }
    catch (e) {

      const statusCode = e.response?.status;
      console.error(`Error ${statusCode}: ${e.message}`);
      if (statusCode == 403) {
        setShowAlert(true)
        setAlertMsg("Session Timeout")
      }
     
    }


  }

  const navigateToCart = () => {
    navigate('/cart')
  }

  const getPage = (items, pageNumber, pageSize) => {
    const start = (pageNumber - 1) * pageSize;
    return items.slice(start, start + pageSize);
  };

  const getPageDataForCategory =async (category,pageNumber)=> {

    const resp=await fetch('http://localhost:3000/products/'+category+'/'+pageNumber,{headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    
    // const products=JSON.parse(resp);
    const data = await resp.json();
    setPageData(data)

  }

// getPage(items, 2, 10) returns the 11th through 20th items.


  return (
    <>
    <Box sx={{ width: 120,mt:4,ml:2,display:'flex',flexDirection:'row' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={e=>{setCategory(e.target.value);getPageDataForCategory(e.target.value,1);setPage(1)}}
        >
          {categories.map(category=>
            <MenuItem value={category}>{category}</MenuItem>
          )}
          
        </Select>
        
      </FormControl>
      {showSuccess && <Alert severity="success" sx={{ right: 100,position:'fixed'}}>Item added to cart</Alert>}
      {!showSuccess && <img src={cart} style={{    height: 30,
        alignSelf: "center",
        right: 100,
        position: "absolute" }} onClick={()=>navigateToCart()}/>}

    </Box>
    <Grid container spacing={2} >
     
      { pageData.map(product =>{
        if(product.category==category){
          return (
            <Grid size={{ xs: 12, sm:6,md: 4 }}>
            
              <Box sx={{display:'flex',flexDirection:'column',border:'0.5px solid blue'
              , m:2, width:200,borderRadius:'4px'
            }}>
              <img style={{height:120}} src={category=='Stationery'?stationary:product.name==='Shoes'?shoes:wearable} />
              <label>{product.name}</label>
              <label>Rs. {product.price}</label>
              <button style={{width:160, margin:20,backgroundColor: "aliceblue",border:'0.5px solid black',
                borderRadius: '3px',
                padding: '3px',
              }} onClick={()=>addItem(product)}>Add to Cart</button>
            </Box>
            </Grid>
          )
        } else return <></>
      })
       
      }
    </Grid> 
    <Pagination page={page}
     count={Math.round(data.length/itemsPerPage)} 
     color="primary" 
     sx={{m:2,marginLeft:"40%"}} 
     onChange={handleChange}
     />

     <AlertDialog
        open={showAlert}
        alertMsg={alertMsg}
        handleClose={()=>{setShowAlert(false);navigate('/')}}
     />
        
     
    </>
  )
}

export default Catalog
