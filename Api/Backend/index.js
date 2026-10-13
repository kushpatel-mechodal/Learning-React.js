import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "samsung s22",
      price: 30000,
      image: "https://www.pexels.com/photo/a-samsung-galaxy-s22-13780425/",
    },
    {
      id: 2,
      name: "samsung s23",
      price: 35000,
      image: "https://www.pexels.com/photo/get-ready-for-the-future-with-samsung-galaxy-s23-16149966/",
    },
  ];
  
  if(req.query.search){

   const productFilter =  products.filter(product => product.name.includes(req.query.search));
   res.send(productFilter);
   return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
