/**
 * Created by renaudlessardlarouche on 2014-04-26.
 */

function add_product_to_cart(product)
{
    /*
def AddProductToCart(self, _product):
        br = self.GetHandle()
        sProductUrl = self.GetProductQuickListUrl(_product)


        # Method 2?
        '''
        from selenium import webdriver
        browser = webdriver.Firefox()
        browser.get(sProductUrl)
        '''

        # Method 1 (not working)
        '''
        elem = browser.find_element_by_id('ctl00_MainContent_AddQuickListButton')
        html = br.open(sProductUrl)
        br.follow_link(list(br.links())[1])
        '''

        #for link in br.links():
        #    print link
        #soup = BeautifulSoup(html)
        #btn = next(iter(soup.findAll('a', attrs={"id" : "ctl00_MainContent_AddQuickListButton"})), None)
        webbrowser.open(sProductUrl)


        return br
        */
}


function find_product()
{
    /*
    def FindProductsOnline(self, _sProductName):
        br = self.GetHandle()

        # Compute search query (escape special characters)
        sSearchQuery = _sProductName.replace('%', '').replace('(', '').replace(')', '').replace('+', '') # Remove invalid characters
        sSearchQuery = urllib.quote(sSearchQuery)

        # Compute url
        path = "http://magasin.iga.net/Search/BasicSearch.aspx?Search={0}".format(sSearchQuery)
        logging.info(path)
        html = br.open(path)
        soup = BeautifulSoup(html)

        tagsProducts = soup.findAll('span', attrs={"class" : 'productName'})
        tagsIDs = soup.findAll('a', attrs={"class" : "buy"})
        tagsPhotos = soup.findAll('img', attrs={"class" : "productsListImage"})
        aProductNames = self._Extract_ProductNames(tagsProducts)
        aProductIDs = self._Extract_ProductID(tagsIDs)
        aProductPhotos = self._Extract_ProductPhoto(tagsPhotos)

        aReturn = []
        for sName, sID, sImg in zip(aProductNames, aProductIDs, aProductPhotos):
            aReturn.append(Product(sID, [sName], _image=sImg))
        return aReturn
     */

}

function list_command()
{
/*
    # Return an array with the longName of each items in the command _id
    def ListCommand(self, _id):
        br = self.GetHandle()
        html = br.open("http://magasin.iga.net/Member/Orders/OrderDetails.aspx?tn={0}".format(_id)).read()
        soup = BeautifulSoup(html)
        return self._Extract_ProductNames(soup.findAll('span', attrs={"class" : 'productName'}))
 */
}