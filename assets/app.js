class Product{

    constructor(title,imageUrl,description,price)
    {
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }
    
}

class ElementAttribute{
    constructor(attrName,attrValue){
        this.name=attrName;
        this.value=attrValue;
    }
}
class Component {
    constructor(renderHookId,shouldRender=true){
        this.hookId=renderHookId;
        if(shouldRender)
        {
            this.render();
        }
        //will call child class render as method overridden
    }

    render(){}

    createRootElement(tag,cssClasses,attributes){
        const rootElement=document.createElement(tag);
        if(cssClasses){
            rootElement.className=cssClasses;
        }
        if(attributes && attributes.length>0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name,attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}
class ShoppingCart extends Component{
    items=[];

    //getter
    get totalAmount() {
        const sum= this.items.reduce((prevValue,currItem)=>{
            return prevValue+currItem.price;
        },0);
        return sum;
    }
    constructor(renderHookId){
        super(renderHookId);
    }

    addProduct(product) {
        this.items.push(product);
        this.totalOutput.innerHTML=`<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    orderProducts(){
        console.log("ORDERING");
        console.log(this.items);
    }

    render() {
        const cartEl=this.createRootElement("section",'cart');
        cartEl.innerHTML= `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput=cartEl.querySelector('h2');

        const orderButton=cartEl.querySelector("button");
        orderButton.addEventListener("click",()=>this.orderProducts());
    }
}

//class for rendering single product item
class ProductItem extends Component{

    constructor(product,renderHookId){
        super(renderHookId,false);
        this.product=product; 
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render(){
        const prodEl=this.createRootElement('li','product-item');
        prodEl.innerHTML=`
            <div>
                <img src="${this.product.imageUrl}"alt="${this.product.title}" >
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton=prodEl.querySelector('button');
        addCartButton.addEventListener("click",this.addToCart.bind(this))
        
    }
}

class ProductList extends Component{

    products = [];

    constructor(renderHookId){ 
        super(renderHookId);
        this.fetchProducts();
    }

    fetchProducts() {
        this.products= [
            new Product('Complete Bedding','/Mini-Shop-Using-JS-HTMLCSS/img/Complete Bedding.webp','Martha Stewart Complete Collection for a Luxurious Bed',999.99),

            new Product('A Bedspread','/Mini-Shop-Using-JS-HTMLCSS/img/Bedspread.webp','Beautiful things for beautiful peoples',410.11),


            new Product('A Pillow','/Mini-Shop-Using-JS-HTMLCSS/img/Soft-Pillow-Green.jpg','A Soft Pillow',19.99),
    
            new Product('A Crapet','/Mini-Shop-Using-JS-HTMLCSS/img/Carpet.webp','A Carpet especially made for special',99.60),
    
            new Product('A Blanket','/Mini-Shop-Using-JS-HTMLCSS/img/Blanket.jpg','A Pure Woolen Blanket',229.85),

            new Product('A Comforter','/Mini-Shop-Using-JS-HTMLCSS/img/comforter.jpg','Keep yourself cosy & warm with our "All Weather Comforter"',350.69),

            
        ] ;
        this.renderProducts();
    }

    renderProducts() {
        for(const prod of this.products)
        {
            new ProductItem(prod,'prod-list');
        }
    }

    //rendering all product items
    render(){    
        this.createRootElement('ul',"product-list",[new ElementAttribute('id','prod-list')]);

        if(this.products && this.products.length>0){
            this.renderProducts();
        } 
    }  
}

class Shop {

    constructor(){
        this.render();
    }

    render(){
        this.cart=new ShoppingCart("app");
        new ProductList("app");
    }
}

class App{
    static cart;
    static init() {
        const shop=new Shop();
        this.cart=shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();

