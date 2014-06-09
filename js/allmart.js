
/**************** ANGULAR PORT ****************/

// Todo: display product thumbnail

(function() {
var app = angular.module('all_mart', []);
var products = [
    { name:'Molson M', code: '000000000000229679', thumbnail:'http://magasin.iga.net/productimages/small/0005632700583.jpg'},
    { name:"Jus d'orange", code: '000000000000181993', thumbnail:'http://magasin.iga.net/productimages/small/0004850001835.jpg' },
    { name:'Crème de poulet', code: '000000000000534971', thumbnail:'http://magasin.iga.net/productimages/small/0006000082910.jpg'},
    { name:'Dentifrice', code: '000000000000402029', thumbnail:'http://magasin.iga.net/productimages/small/0006533300821.jpg'},
    { name:'Café', code: '000000000000057066', thumbnail:'http://magasin.iga.net/productimages/small/0005500012597.jpg' },
    { name:'Fromage', code: '000000000000223319',thumbnail:'http://magasin.iga.net/productimages/small/0005574250219.jpg' },
    { name:'Lait', code: '000000000000243255', thumbnail:'http://magasin.iga.net/productimages/small/0006820001012.jpg' },
    { name:'Pain', code: '000000000000500359', thumbnail:'http://magasin.iga.net/productimages/small/0006340003035.jpg' },
    { name:'Muffins Anglais', code: '000000000000580961', thumbnail:'http://magasin.iga.net/productimages/small/0006340026017.jpg' },
    { name:'Champignons', code:'000000000000446708', thumbnail:'http://magasin.iga.net/productimages/small/0005574236011.jpg' }
];
    
app.controller('StoreController', function(){
    this.products = products;
    this.cart = [];
    this.dbname = 'allmart_data';
    this.list_input = "";
    
    this.add_list_to_cart = function()
    {
        items = this.list_input.split('\n'); // todo: support multiple syntax
        
        for(var i=0; i < items.length; i++)
        {
            var item = items[i];
            if (item.length > 0)
            {
                var product = this.find_product(item)
                if (product == null)
                {
                    product = {name:item};
                    this.products.push(product); // add to cart and db
                }
                this.cart.push(product);
            }
        }
    };
    
    this._product_match_name = function(product, name)
    {
        var tokens = product.name.split(','); // todo: support multiple syntax
        for (var t=0; t < tokens.length; t++)
        {
            token = this._simplify_name(tokens[t]);
            if (name == token)
            {
                return true;   
            }
        }
        return false;
    };
    
    this._simplify_name = function(name)
    {
        return name.toLowerCase().replace(' ', '');
    };
    
    this.find_product = function(name)
    {
        name = this._simplify_name(name);   
        for(var i=0; i < this.products.length; i++)
        {
            if (this._product_match_name(this.products[i], name))
            {
                return this.products[i];
            }
        }
        return null;
    };
    
    this.buy = function()
    {
        for (i = 0; i < this.cart.length; i++) // We skip the first line
        {
            product = this.cart[i];
            if(product.code.length == 18)
            {
                var url = "http://magasin.iga.net/Member/AddToQuickList.aspx?ProductID=" + product.code + "&Quantity=1";
                window.open(url, '_blank');
            }
        }
    }
    
    this.save = function()
    {
        localStorage.setItem(this.dbname, JSON.stringify(this.products));
    };
    
    this.load = function()
    {
        this.products = JSON.parse(localStorage.getItem(this.dbname));
    };
    
    this.export = function()
    {
      window.open("data:Application/octet-stream," + encodeURIComponent (JSON.stringify(this.products, null, '\t')));
    };
    
    this.import = function()
    {
        // todo: verify it work
        alert('not implemented!');
    };
    
    this.debug = function()
    {
      alert(JSON.stringify(this.products));  
    };
    
    //this.load();
    
});
})();



// FILE IMPORT LOGIC BEGIN

function callback_button_import()
{
    $("#file_database").trigger('click');
}

function _callback_database_file_imported(event)
{
    var new_data = null;
    new_data = event.target.result;
    // todo: add data validation?
    localStorage.setItem("allmart_data", new_data);
}

function _callback_database_file_error(event)
{
    alert("Error reading file!");
    //document.getElementById("fileContents").innerHTML = "error reading file";
}

function callback_databasefile_changed()
{
    var file = document.getElementById("file_database").files[0];
    if (file) 
    {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = _callback_database_file_imported
        reader.onerror = _callback_database_file_error
    }
}

// FILE IMPORT LOGIC END
