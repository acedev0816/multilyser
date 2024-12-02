from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv


load_dotenv()
openai_api_key= os.getenv("OPENAI_API_KEY")

def gptResponse(contents_info, question):
    
    summmary_template= """
             I need you to analyze and use the below contents on certain website to answer the subsequent question.
            If the answer cannot be found, write that don't know.
            If the language of the contents is not English, you should translate to english to analyze.
            You must answer with 2-3 sentences simply.
            Contents:
            {contents_info}
            Question:
            {question}
            \n\
        """
    summmary_prompt= PromptTemplate(input_variables=["information"], template=summmary_template)

    llm = ChatOpenAI(temperature=0,model="gpt-4-1106-preview",openai_proxy="socks5://14a0bec72ede3:b887a5bd23@185.123.152.255:12324",openai_api_key=openai_api_key)

    chain = LLMChain(llm=llm, prompt=summmary_prompt)
    response_llm=chain.run(contents_info=contents_info,question=question)


    return response_llm

def gpt3response(contents_info):
    summmary_template="""
            I need you to analyze and summarize the below contents on certain website .
            If the language of the contents is not English, you should translate to english to analyze.
            You must answer with 4-5 sentences simply.
            You must only summarize the website content.
            Contents:
            {contents_info}
            \n\
        """
    summmary_prompt= PromptTemplate(input_variables=["information"], template=summmary_template)

    llm = ChatOpenAI(temperature=0,model="gpt-3.5-turbo-1106",openai_proxy="socks5://14a0bec72ede3:b887a5bd23@185.123.152.255:12324",openai_api_key=openai_api_key)

    chain = LLMChain(llm=llm, prompt=summmary_prompt)
    response_llm=chain.run(contents_info=contents_info)

    return response_llm



def gpt3TotalResponse(contents_info, question):
    
    summmary_template= """
          Translate both the provided content and question into English.
          Analyze the translated content and question to generate a concise response.
          If the information is not available or unclear, explicitly state that you do not know the answer.
          Use the following placeholders:
          Context: {contents_info}
          Question: {question}
        """
    summmary_prompt= PromptTemplate(input_variables=["information"], template=summmary_template)

    llm = ChatOpenAI(temperature=0,model="gpt-3.5-turbo-1106",openai_proxy="socks5://14a0bec72ede3:b887a5bd23@185.123.152.255:12324",openai_api_key=openai_api_key)

    chain = LLMChain(llm=llm, prompt=summmary_prompt)
    response_llm=chain.run(contents_info=contents_info,question=question)

    return response_llm


