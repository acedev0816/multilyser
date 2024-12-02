import requests
from bs4 import BeautifulSoup
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, To
import csv
import base64
import os
import requests
from bs4 import BeautifulSoup
from gpt import gptResponse, gpt3response, gpt3TotalResponse
from dotenv import load_dotenv
import tiktoken

# Load .env file
load_dotenv()

invalidWords = [
    ".png",
    ".jpg",
    ".jpeg",
    ".mp4",
    ".3gp",
    ".pdf",
    ".doc",
    ".svg"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def num_tokens_from_string(string: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding_name="cl100k_base"
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

def split_string(input_string, chunk_size):
    return [input_string[i:i+chunk_size] for i in range(0, len(input_string), chunk_size)]


def removeInvalidwords(inputArray):
    return [i for i in inputArray if not any(word in i for word in invalidWords)]

def Filter(string, substr):
	return [str for str in string if
			any(sub in str for sub in substr)]

def listToString(s):
	str1 = " "
	return (str1.join(s))

#   make url with https://www._______, lowercase
def validationRedirectUrl(domain):
    findHTTP = "http"
    # findHTTPS = "https"
    findWWW = "www"
    if findHTTP in domain:
        if findWWW in domain:
            validDomain = domain
        else:
            splitList = domain.split("//")
            validDomain = splitList[0] + "//" + "www." + splitList[1]
        # if findHTTPS in validDomain:
        #     validDomain =  validDomain
        # else:
        #     splitList = validDomain.split("//")
        #     validDomain = "https:" + "//" + splitList[1]
        print(validDomain)
        return(validDomain)
    else:
        if findWWW in domain:
            validDomain = "https://" + domain
        else:
            validDomain = "https://www." + domain
        print(validDomain)
        return(validDomain)
   
def getResponseFromRequest(domain):
    responseArray = {}
    try:
        response = requests.get(domain, headers = headers, timeout=5)
        responseArray["responseCode"] = response.status_code
        if responseArray["responseCode"] == 200:
            responseArray["responseContent"] = response.content
        else:
            responseArray["responseContent"] = "Sorry! Failed to retrieve the page. So prompts can't be made."
        return responseArray
    except:
        responseArray["responseCode"] = 404
        responseArray["responseContent"] = "Sorry! We ran into a 404 server error, So prompts can't be made."
        return responseArray
    
def scrapeContents(domain):
    response = getResponseFromRequest(domain)
    if response["responseCode"] == 200:
        content = response["responseContent"]
        html = BeautifulSoup(content, 'html.parser')
        siteContent = html.get_text().replace("\n", "").replace("  ", "")        
        return(siteContent)
    else:
        return(response["responseContent"])

def scrapeAllaTags(domain):
    response = getResponseFromRequest(domain)
    if response["responseCode"] == 200:
        content = response["responseContent"]
        html = BeautifulSoup(content, 'html.parser')
        links = html.find_all('a')
        return(links)
    else:
        return(response["responseContent"])
    
def getSubDomainsFromDomain(domain):
    domain = validationRedirectUrl(domain)
    subDomains = []
    aTagArrayObj = scrapeAllaTags(domain)
    for i in range(len(aTagArrayObj)):
        linkArray = str(aTagArrayObj[i]).split(" ")
        linkFilterArray = ['href="']
        filterArray = Filter(linkArray, linkFilterArray)
        subDomain = Filter(listToString(filterArray).split('"'), ['/'])
        for i in subDomain:
            i = str(i)
            if i[0] == "/":
                completedDomain = domain + i
                subDomains.append(completedDomain)
            elif "http" in i:
                subDomains.append(i)
            elif "https" in i:
                subDomains.append(i)
            else:
                continue
    outSubdomains = removeInvalidwords(list(set(subDomains)))
    return(outSubdomains)

def getAllSubDomainsAndContents(domainTosubdomains, domainCount, domainToContents):
    
    for i in domainTosubdomains:
        if(len(domainTosubdomains) >= domainCount):
            return True
        subDomains = getSubDomainsFromDomain(i)
        for subDomain in subDomains:
            domainTosubdomains.append(subDomain)
        if(len(domainTosubdomains) >= domainCount):
            for i in domainTosubdomains[:domainCount]:
                childContent = scrapeContents(i) 
                domainToContents += childContent
        else:
            continue
    getAllSubDomainsAndContents(domainTosubdomains, domainCount, domainToContents)

def scrape(domain, domainCount):
    domainTosubdomains = []
    domainToContents = ""
    newContent = scrapeContents(domain)
    domainTosubdomains.append(domain)
    domainToContents += newContent+"\n"
    subDomains = getSubDomainsFromDomain(domain) 
    if(len(subDomains) > 0):
        if(len(domainTosubdomains) < domainCount):
            for i in subDomains:
                domainTosubdomains.append(i)
            if(len(domainTosubdomains) >= domainCount):
                for i in domainTosubdomains[:domainCount]:
                    appendedContents = scrapeContents(i)
                    domainToContents += appendedContents+"\n"
            else:
                getAllSubDomainsAndContents(domainTosubdomains, domainCount, domainToContents)
        print(domainToContents)
        return(domainToContents)
    else:
        print(domainToContents)
        return(domainToContents)

def write_csv(csv_file_path,row_data):
    with open(csv_file_path, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(row_data)

def sendEmail(to_emails,file_path):
    message = Mail(
                from_email='hello@multilyser.com',
                to_emails=[To(to_emails), To('hello@multilyser.com')],
                subject='Summarizing Websites Result',
                is_multiple=True,
                html_content='<strong>This is the result of your websites</strong>')

    with open(file_path, 'rb') as fd:
        b64data = base64.b64encode(fd.read())
        attachment = Attachment()
        attachment.file_content = str(b64data,'utf-8')
        attachment.file_name = "summarize.csv"
        message.add_attachment(attachment)

    try:
        sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
        sg = SendGridAPIClient(api_key = sendgrid_api_key)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)

        try:
            os.remove(file_path)
            print(f"The file '{file_path}' has been deleted.")
        except OSError as e:
            print(f"Error: {e.file_path} - {e.strerror}")
            
        return response.status_code
    except Exception as e:
                print(e)    

def scrapeDomain(domain, slider, question, email,payment_intent_id,isEnd):

    file_path=f"{payment_intent_id}.csv"
    base_domain = domain
    #if job started satus in database is empty , set job started status

    lengthOfDomain = len(domain)
    if domain[lengthOfDomain - 1] == "/":
        domain = domain[0:lengthOfDomain-1]
    domain = domain.lower()

    redirectedUrl = validationRedirectUrl(domain)
    responseFromRequest = getResponseFromRequest(redirectedUrl)
    if responseFromRequest["responseCode"] == 200:
        website_content = scrape(redirectedUrl, slider)
        token_count=num_tokens_from_string(website_content)
        answer=''
        if token_count > 15000:
            chunked_contents=split_string(website_content, 15000)
            answer=gpt3TotalResponse(chunked_contents[0],question)
        else:
            answer=gpt3TotalResponse(website_content, question)
        write_csv(file_path, [base_domain, redirectedUrl, responseFromRequest["responseCode"], slider, question, answer])
    else:
        write_csv(file_path, [base_domain, redirectedUrl, responseFromRequest["responseCode"], slider, question, responseFromRequest["responseContent"]])

    if isEnd == True:
        #log job finished(jib id = payment intent_id)
        sendEmail(email,file_path)

