#!/usr/bin/env python
# coding: utf-8

# In[1]:


import mysql.connector


# In[2]:


con = mysql.connector.connect(user='username', password='password')


# In[3]:


#Creating a cursor object using the cursor() method
cur = con.cursor()

#Doping database MYDATABASE if already exists.
cur.execute("DROP database IF EXISTS Microtek")

#Preparing query to create a database
sql = "CREATE database Microtek";

#Creating a database
cur.execute(sql)

#Retrieving the list of databases
print("List of databases: ")
cur.execute("SHOW DATABASES")
print(cur.fetchall())


# In[4]:


cur.execute("use microtek")


# In[5]:


cur.execute('''CREATE TABLE service(
            date datetime, 
            state varchar(255), 
            product varchar(255), 
            problem varchar(255), 
            srs varchar(255), 
            srm varchar(255)
            );''')


# In[9]:


cur.execute('describe service;')


# In[10]:


cur.fetchall()


# In[11]:


import random
import datetime

from faker import Faker
fake = Faker()

start_date=datetime.date(year=2020, month=1, day=1)
end_date=datetime.date(year=2023, month=1, day=1)

fake.date_between(start_date,end_date).strftime('%Y-%m-%d')


# In[12]:


indian_state_codes = {
    "Andaman and Nicobar Islands": "in-an",
    "Andhra Pradesh": "in-ap",
    "Arunachal Pradesh": "in-ar",
    "Assam": "in-as",
    "Bihar": "in-br",
    "Chandigarh": "in-ch",
    "Chhattisgarh": "in-ct",
    "Dadra and Nagar Haveli and Daman and Diu": "in-dn",
    "Delhi": "in-dl",
    "Goa": "in-ga",
    "Gujarat": "in-gj",
    "Haryana": "in-hr",
    "Himachal Pradesh": "in-hp",
    "Jammu and Kashmir": "in-jk",
    "Jharkhand": "in-jh",
    "Karnataka": "in-ka",
    "Kerala": "in-kl",
    "Ladakh": "in-la",
    "Lakshadweep": "in-ld",
    "Madhya Pradesh": "in-mp",
    "Maharashtra": "in-mh",
    "Manipur": "in-mn",
    "Meghalaya": "in-ml",
    "Mizoram": "in-mz",
    "Nagaland": "in-nl",
    "Odisha": "in-or",
    "Puducherry": "in-py",
    "Punjab": "in-pb",
    "Rajasthan": "in-rj",
    "Sikkim": "in-sk",
    "Tamil Nadu": "in-tn",
    "Telangana": "in-tg",
    "Tripura": "in-tr",
    "Uttar Pradesh": "in-up",
    "Uttarakhand": "in-uk",
    "West Bengal": "in-wb"
}

state_codes_array = list(indian_state_codes.values())


# In[14]:


#define sample to insert in sql
s_state=state_codes_array
s_product=['Online UPS','UPS EB', 'Stabilizer', 'Jumbo', 'UPS E2', 'UPS XP', 'UPS 24X7', 'SOLAR PCU', 'Line Interactive UPS']
s_problem=['Charging Problem','No Output Voltage', 'Load Problem', 'Switch Problem', 'Mosfet Problem', 'Backup Problem', 'Installation Required', 'BEEP sound', 'No Display']
s_srs=['Set Registered','Assigned', 'Spare Parts Unavailable', 'Estimation Pending Approval', 'Pending Delivery', 'Pending', 'Closed', 'Cancel', 'Installation Done', 'Demo Done','Request for Microtek Approval' ]
s_srm=['Call', 'Call-center', 'Customer', 'Dealer', 'Whatsapp', 'Email', 'Carry-in', 'Distributor', 'PDI', 'President', 'Walkin','Web','SMS','Social Feedback']


for i in range(20000):
    v_date=fake.date_between(start_date,end_date).strftime('%Y-%m-%d')
    v_state=random.choices(s_state)[0]
    v_problem=random.choices(s_problem)[0]
    v_product=random.choices(s_product)[0]
    v_srs=random.choices(s_srs)[0]
    v_srm=random.choices(s_srm)[0]
    
    params = (v_date, v_state, v_product, v_problem, v_srs, v_srm)
    #if (i==20000):
        #cur.execute("INSERT INTO  VALUES(%s,%s,%s,%s,%s,%s);"%(date,state,product,problem,srs,srm))
    cur.execute("INSERT INTO service VALUES(%s,%s,%s,%s,%s,%s);",params)


# In[15]:


con.commit()


# In[ ]:




