import { useEffect, useState } from 'react'
import stationary from './assets/stationary.jpeg'
import wearable from './assets/wearable.jpeg'
import './App.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

function App() {

  const [count, setCount] = useState(0)
  const [categories, setCategories] = useState([])
  const [category,setCategory] = useState('')
  const [data,setData]=useState([])

  useEffect( ()=>{
    async function fetchData(){
    const resp=await fetch('http://localhost:3000/products/')
    // const products=JSON.parse(resp);
    const data = await resp.json();
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

  return (
    <>
    <Box sx={{ width: 120,mt:4,ml:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={e=>setCategory(e.target.value)}
        >
          {categories.map(category=>
            <MenuItem value={category}>{category}</MenuItem>
          )}
          
        </Select>
      </FormControl>
    </Box>
    <Grid container spacing={2} >
     
      {data.map(product =>{
        if(product.category==category){
          return (
            <Grid size={{ xs: 12, sm:6,md: 4 }}>
            
              <Box sx={{display:'flex',flexDirection:'column',border:'0.5px solid blue'
              , m:2, width:200
            }}>
              <img src={category=='stationery'?stationary:wearable} />
              <label>{product.name}</label>
              <label>{product.price}</label>
            </Box>
            </Grid>
          )
        } else return <></>
      })
       
      }
    </Grid> 
    </>
  )
}

export default App
