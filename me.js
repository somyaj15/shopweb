var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user");
var Cart=require("./models/cart");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/shopdb");
var shopSchema= new mongoose.Schema({
    name: String,
    image :String,
    description :String
}) ;
var Shop=mongoose.model("Shop",shopSchema);



 /* Shop.create(
{name:"YELLOW SUNSHINE" , image:"https://img6.craftsvilla.com/image/upload/w_300,h_450/C/V/CV-36035-MCRAF22150605170-1578651787-Craftsvilla_1.jpg" ,
 description: "Price :- $25 ,   Style :- This suit is Ready to wear. Just select your size & order.    Fabric:-Faux Georgette .     Care Instructions:- Wash with hands or dry clean!!.   Size available-S,M,L and XL. " },
function(err,newdress){
    if(err){
        console.log(err);
    } else{
        console.log("new created:");
        console.log(newdress);
    }
}); */

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


//passport config
app.use(require("express-session")({
    secret:"once again",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("me");

});

/* var shopss=[
    {name:"salwar kamez" , image:"https://assets.panashindia.com/media/catalog/product/cache/1/small_image/262x377/9df78eab33525d08d6e5fb8d27136e95/2/5/2547sl07-6707.jpg"},
    {name:"salwar kamez" , image:"https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-net-abaya-style-suit-in-rose-gold-v1-kch1051_3.jpg"},
    {name:"salwar kamez" , image:"https://cdn.shopify.com/s/files/1/1384/4105/products/White-Floral-Printed-Dress_1024x1024.jpg?v=1571439255"},
    {name:"salwar kamez" , image:"https://handicraftsnmore.com/content/images/thumbs/0029023_zibra06-long-western-dresses-collection_400.jpeg"},
    {name:"salwar kamez" , image:"https://www.pavitraa.in/pub/media/catalog/product/cache/8386d3bce1498d4d669045dae69cc142/7/5/75564.jpg"},
    {name:"salwar kamez" , image:"https://www.meemfashions.com/image/cache/Indian%20Catalogs/Salwar%20Suits/Karma-15075-Series/15076-800x1200.jpg"},
    {name:"salwar kamez" , image:"https://images1.yosari.com/60900-thickbox_default/fabulous-peach-party-wear-gown-for-girls.jpg"},
    {name:"salwar kamez" , image:"https://i.pinimg.com/474x/54/2d/30/542d309b34c0c6490de43451663352e5.jpg"},
    {name:"salwar kamez" , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuIf1l5KlLqyuFuUVccVYKmhq17A_cse7TPiZEzcfjO5vUyq25&usqp=CAU"},
    {name:"salwar kamez" , image:"https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-cotton-punjabi-suit-in-black-v1-kch3812.jpg"},
    {name:"salwar kamez" , image:"https://img6.craftsvilla.com/image/upload/w_300,h_450/C/V/CV-36035-MCRAF22150605170-1578651787-Craftsvilla_1.jpg"},
    {name:"salwar kamez" , image:""},
    {name:"salwar kamez" , image:""},
    {name:"salwar kamez" , image:""},
    {name:"salwar kamez" , image:""}
] */






var allShop;
app.get("/shop",function(req,res){
    Shop.find({},function(err,allShop){
        if(err){
            console.log(err);
        }else{
            console.log(allShop);
            res.render("shop",{shops:allShop});
        }
    });
    

});
app.post("/shop",function(req,res){
    var name=req.body.name
    var image=req.body.image
    var newShop={name:name , image:image}
      
    Shop.create(newShop,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else
        {
            res.redirect("/shop");
        }
    });
});

app.get("/register",function(req,res){
    res.render("form");
});
app.get("/cart",isLoggedIn,function(req,res){
    res.render("cart");
});



app.post("/register",function(req,res){
    console.log("route");
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username }), req.body.password,function(err,user){
         if(err){
             console.log(err);
             return res.render(form)
         }
         passport.authenticate("local")(req,res,function(){
             console.log("successful");
            res.redirect("/cart"); 
   });
        });
    });

    app.get("/admin",function(req,res){
        res.render("admin.ejs");
    });
    //login
    app.get("/login",function(req,res){
        res.render("login");
    });

    app.post("/login",passport.authenticate("local",{
         successRedirect:"/cart",
         failureRedirect:"/login"
    }) ,function(req,res){

        
    });
    app.get("/logout",function(req,res){
        req.logout();
        res.redirect("/");
    });

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
     }
     res.redirect("/login");
    }

//-----------------------------------------------------------------------
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

module.exports = mongoose.model("Cart",cartSchema);



var cart;
    app.get("/cart/:id",function(req,res){
        Cart.findById(req.params.id,function(err,foundCart){
           if(err){
               console.log(err);
               console.log("some prob");
           }
           else
           {
            res.render("cart",{cart:foundCart});
            console.log("task done");
           }
        });
        
        
    });

let divcart=document.getElementById("mycart");
divcart.dataset.


//------------------------------------------------------------------------------------
    app.post("/cart",function(req,res){
        var name=req.body.name
        var image=req.body.image
        var newCart={name:name , image:image}
          
        Cart.create(newCart,function(err,newCreated){
           // newCart.save();
            if(err){
                console.log(err);
                console.log("prob");
            }else
            // {
                res.redirect("/shop");
                console.log("task done");
            }
        });
    });


    app.get("/shop/:id",function(req,res){
        Shop.findById(req.params.id,function(err,foundShop){
           if(err){
               console.log(err);
           }
           else
           {
            res.render("show",{shop:foundShop});
           }
        });
        });






   app.listen(3000,"localhost",function(){
    console.log("server started");
});