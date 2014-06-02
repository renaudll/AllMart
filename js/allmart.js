function class_item(name, id)
{
    this.name = name;
    this.id = id;
}

var default_items = [
    new class_item("Molson M", "000000000000229679"),
    new class_item("Jus d'orange", "000000000000181993"),
    new class_item("Crème de poulet", "000000000000534971"),
    new class_item("Dentifrice", "000000000000402029"),
    new class_item("Café", "000000000000057066"),
    new class_item("Fromage", "000000000000223319"),
    new class_item("Lait", "000000000000243255"),
    new class_item("Pain", "000000000000500359")
];

function add_item(name, id)
{
    var element = document.createElement('li');
    var link = document.createElement('a');

    link.href = "http://magasin.iga.net/Member/AddToQuickList.aspx?ProductID=" + id + "&Quantity=1";
    link.target = "_blank";
    link.appendChild(document.createTextNode(name));

    element.appendChild(link);
    document.getElementById("list_iga").appendChild(element);
}

function add_default_items()
{
    for (i = 0; i < default_items.length; ++i)
    {
        current_item = default_items[i];
        add_item(current_item.name, current_item.id);
    }
}

function callback_button_apply()
{
    items = JSON.parse(localStorage.getItem("allmart_data"));
    
    myTable = document.getElementById("database");
    
    var num_added_items = 0;
    for (i = 1; i < myTable.rows.length; i++) // We skip the first line
    {
        var cells = myTable.rows.item(i).cells;

        item_name = cells.item(0).children[0].innerHTML; // todo: future proof link skipping
        item_code = cells.item(1).innerHTML;
        
        // Todo: set invalid codes in red!
        if(item_code.length == 18)
        {
            item = search_item_by_name(item_name, items);
            if (item == null)
            {
                item = new class_item(item_name, item_code);
                items.push(item);
                num_added_items += 1;
            }
        }
    }
    
    if (num_added_items > 0)
    {
        localStorage.setItem("allmart_data", JSON.stringify(items));
        
    }
    alert(num_added_items + " entries have been updated!");
}

function callback_button_buy()
{
    // todo: simply code (also used in callback_button_apply)
    myTable = document.getElementById("database");
    
    var num_added_items = 0;
    for (i = 1; i < myTable.rows.length; i++) // We skip the first line
    {
        var cells = myTable.rows.item(i).cells;

        item_name = cells.item(0).innerHTML;
        item_code = cells.item(1).innerHTML;
        
        // Todo: set invalid codes in red!
        if(item_code.length == 18)
        {
            var url = "http://magasin.iga.net/Member/AddToQuickList.aspx?ProductID=" + item_code + "&Quantity=1";
            window.open(url, '_blank');
        }
    }
}

function callback_button_debug()
{
    alert(localStorage.getItem("allmart_data"));
}

function create_database_table(items) 
{
    //var parent_of_table = document.getElementById("content");
    var table = document.getElementById("database");
    
    var baseRow = document.createElement('tr');
    var baseCell_name = document.createElement('td')
    var baseCell_code = document.createElement('td')
    baseCell_code.setAttribute("contentEditable", true);

    for(var i = 0; i < items.length; i++){
        //Create a new row
        current_item = items[i];
        current_item_isvalid = current_item.id != null;
        
        var myRow = baseRow.cloneNode(false);
        if (!current_item_isvalid)
        {
         myRow.id = "invalid";   
        }

        var cell_name = baseCell_name.cloneNode(false);
        
        // Create link
        var a = document.createElement('a');
        var linkText = document.createTextNode(current_item.name);
        a.appendChild(linkText);
        a.target = "iframe_iga";
        if (current_item_isvalid)
        {
            a.href = "http://magasin.iga.net/Member/AddToQuickList.aspx?ProductID=" + item.id + "&Quantity=1";         
        }
        else
        {
            a.href = "http://magasin.iga.net/Search/BasicSearch.aspx?Search=" + current_item.name + "&Quantity=1";  
        }
        cell_name.appendChild(a);


        var cell_id = baseCell_code.cloneNode(false);
        //cell_id.onblur = callback_button_debug; // todo: handle change realtime!
        if(current_item_isvalid)
        {
            cell_id.innerHTML = current_item.id;
        }
        else
        {
            cell_id.innerHTML = "???";   
        }

        //Append new cell
        myRow.appendChild(cell_name);
        myRow.appendChild(cell_id);

        //Append new row
        table.appendChild(myRow);
    }   
}

function search_item_by_name(name, items)
{
    for (var i=0; i < items.length; i++)
    {
        cur_item = items[i];
        tokens = cur_item.name.split(',');
        for (var t=0; t < tokens.length; t++)
        {
            token = tokens[t]
            if (name == token)
            {
                return cur_item;   
            }
        }
    }
    return null;
}


function get_items_by_names(names_to_add)
{
    return_value = [];
    items = JSON.parse(localStorage.getItem("allmart_data"));

    for (var i=0; i < names_to_add.length; i++)
    {
        name = names_to_add[i];
        item = search_item_by_name(name, items);

        if (item == null)
        {
            item = new class_item(name, null)
        }
        return_value.push(item);
    }
    
    return return_value;
}

function on_list_button_submit()
{
    text = document.getElementById("input_list").value;
    items_names = text.split('\n');
    cart_items = get_items_by_names(items_names);
    create_database_table(cart_items);
}

function export_database_json()
{
    alert("Not Implemented!");
}

function import_database_json()
{
    alert("Not Implemented!");   
}

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

function callback_button_export()
{
    window.open("data:Application/octet-stream," + encodeURIComponent (localStorage.getItem("allmart_data")));
}

function callback_window_onload()
{
    
    
    // Ensure we got data to start with
    //var allmart_data = localStorage.getItem("allmart_data");
    //if (allmart_data == null)
    //{
        localStorage.setItem("allmart_data", JSON.stringify(default_items));
    //}
    
    //items = JSON.parse(localStorage.getItem("allmart_data"));
    
    //add_default_items();
    
    // Setup import button
    //$("#button_import_database").click(function(){
    //   $("#file_database").trigger('click');
    //   return false;
    //});
}

window.onload = callback_window_onload;

