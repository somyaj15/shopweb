/* var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/shopdb");

var cartSchema= new mongoose.Schema({
    name: String,
    image: String,
    description:String
    
});

var Cart=mongoose.model("Cart",cartSchema);

Cart.create({
    name:"YELLOW SUNSHINE" , image:"https://img6.craftsvilla.com/image/upload/w_300,h_450/C/V/CV-36035-MCRAF22150605170-1578651787-Craftsvilla_1.jpg" ,
 description: "Price :- $25 ,   Style :- This suit is Ready to wear. Just select your size & order.    Fabric:-Faux Georgette .     Care Instructions:- Wash with hands or dry clean!!.  Size available-S,M,L and XL." 
},function(err,newcart){
    if(err){
        console.log(err);
    } else{
        console.log("new car pro created:");
        console.log(newcart);
    }
}); 





module.exports = mongoose.model("Cart",cartSchema);  */