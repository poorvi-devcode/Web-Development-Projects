import openpyxl
from openpyxl import Workbook
import os

# File name
file_name = "userdata.xlsx"

# Check if file exists, else create it with headers
if not os.path.exists(file_name):
    wb = Workbook()
    ws = wb.active
    ws.title = "UserData"
    ws.append(["Name", "Email", "Phone"])  # Header row
    wb.save(file_name)

def save_user_data(name, email, phone):
    wb = openpyxl.load_workbook(file_name)
    ws = wb.active
    ws.append([name, email, phone])
    wb.save(file_name)
    print("✅ Data saved successfully!")

# Example usage
while True:
    name = input("Enter Name: ")
    email = input("Enter Email: ")
    phone = input("Enter Phone: ")

    save_user_data(name, email, phone)

    choice = input("Do you want to add another user? (y/n): ")
    if choice.lower() != 'y':
        break
