from urllib.parse import quote

import xmltodict
from bs4 import BeautifulSoup

import urllib3
import json

from Api.dtos.book import book_dto_input


class BookScrapper:
    isbnsearch: bool
    value: str
    http = urllib3.PoolManager()
    response = book_dto_input.parse_obj({
        "title": "",
        "isbn": "",
        "author": "",
        "language": "",
        "genre": "",
        "desc": "",
        "coverUrl": "",
        "publisher": ""
    })

    def __init__(self, value: str, type: str):
        if type == "ISBN":
            self.isbnsearch = True
        elif type == "TITLE":
            self.isbnsearch = False
        self.value = value

    def getFromGoogle(self):

        # build search parameter
        if self.isbnsearch:
            query = f"isbn:{self.value}"
        else:
            query = f"title:{quote(self.value)}"

        # make request to google books api
        responseJson = self.http.request('GET', f"https://www.googleapis.com/books/v1/volumes?q={query}")
        responseObj = json.loads(responseJson.data)

        # if none found on google, return None
        if int(responseObj["totalItems"]) == 0:
            return None

        # Set all attribute to response template
        bookitem = responseObj["items"][0]["volumeInfo"]
        self.response.title = bookitem["title"]
        self.response.isbn = bookitem["industryIdentifiers"][0]["identifier"]
        self.response.author = bookitem["authors"][0]
        self.response.language = bookitem["language"]
        self.response.genre = bookitem["categories"][0]
        self.response.publisher = bookitem["publisher"]
        self.response.desc = ""
        self.response.coverUrl = bookitem["imageLinks"]["thumbnail"]

        return self.response

    def getFromGoodreads(self):

        # get goodreads bookID from given querry
        book_id = self.__getGoodreadsBookId__()

        # if we dont get the goodreads bookId, mean no found
        if book_id is None:
            return None

        # go to goodreads book page given bookID, and scrape the info
        # if anything goes wrong, return response as it is
        self.__goodreadsCrawler__(book_id)
        return self.response

    def __getGoodreadsBookId__(self):
        if self.isbnsearch:
            # get bookId from ISBN
            # directly through isbn_to_id endpoints
            try:
                url = f"https://www.goodreads.com/book/isbn_to_id?key=WrPLusbWMHumHx23rDe1A&isbn={self.value}"
                book_id = str(self.http.request('GET', url).data, 'utf-8')
            except:
                return None

            if book_id is "":
                return None
        else:
            # get bookId from title query
            # through search
            url = f"https://www.goodreads.com/search/index.xml?key=WrPLusbWMHumHx23rDe1A&q={self.value}"
            try:
                res_xml = str(self.http.request('GET', url).data, 'utf-8')
                res_dict = xmltodict.parse(res_xml)
                res_obj = res_dict['GoodreadsResponse']['search']

                # return None if search found 0
                if res_obj['total-results'] is "0":
                    return None

                book_id = res_obj['results']['work'][0]['id']['#text']
            except:
                return None

        return book_id

    def __goodreadsCrawler__(self, book_id):
        gd_url = f"https://www.goodreads.com/book/show/{book_id}"

        # goto site and parse html with bs4
        page = self.http.request('GET', gd_url).data
        soup = BeautifulSoup(page, "html.parser")

        # --- Get book title ---
        try:
            book_title_dirty = soup.find('h1', attrs={'id': 'bookTitle'})
            book_title_dt = book_title_dirty.text.strip()
            book_title = " ".join(book_title_dt.split())
        except:
            pass
        else:
            self.response.title = book_title

        # --- get book cover ---
        try:
            book_cover_dirty = soup.find('img', attrs={'id': 'coverImage'})
            cover = book_cover_dirty['src']
        except:
            pass
        else:
            self.response.coverUrl = cover

        # get author
        try:
            author_dirty = soup.find('span', attrs={'itemprop': 'name'})
            author = author_dirty.text.strip()
        except:
            pass
        else:
            self.response.author = author

        # get book description
        try:
            desc_dirty = soup.find('div', attrs={'id': 'description'})
            desc = desc_dirty.text.strip()
            desc = desc.replace("\n", "")
            description = desc.replace("...more", "")
        except:
            pass
        else:
            self.response.desc = description

        # get book language
        try:
            lang_dirty = soup.find('div', attrs={'itemprop': 'inLanguage'})
            language = lang_dirty.text.strip()
        except:
            pass
        else:
            self.response.language = language

        # get book publisher
        try:
            pub_dirty = soup.find('div', attrs={'id': 'details'})
            pub = pub_dirty.text.strip()
            pub = " ".join(pub.split())
            sep = 'More Details...'
            rest = pub.split(sep, 1)[0]
            x = rest.split(' ')
            x.pop(0)
            x.pop(0)
            x.pop(0)
            publisher = " ".join(x)
        except:
            pass
        else:
            self.response.publisher = publisher


        # get book isbn
        try:
            isbn = ""
            pub_dirty = soup.find('div', attrs={'id': 'details'})
            pub = pub_dirty.text.strip()
            pub = " ".join(pub.split())
            sep = 'More Details...'
            rest = pub.split(sep, 1)[1]
            restList = rest.split(' ')
            for i in range(len(restList)):
                if "ISBN" in restList[i]:
                    isbn = ''.join(filter(str.isdigit, restList[i+1]))
        except:
            pass
        else:
            self.response.isbn = isbn
