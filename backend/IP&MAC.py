import uuid
import socket
import time
import csv
from datetime import datetime

def get_mac_address():
    mac = ':'.join(['{:02x}'.format((uuid.getnode() >> elements) & 0xff) for elements in range(0, 2*6, 8)][::-1])
    return mac

def get_ip_address():
    try:
        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except Exception as e:
        return f"Error retrieving IP address: {e}"

def log_to_csv(timestamp, mac_address, ip_address):
    filename = "network_records.csv"
    file_exists = False
    try:
        with open(filename, mode='r') as file:
            file_exists = True
    except FileNotFoundError:
        pass
    
    with open(filename, mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["Time", "MAC Address", "IP Address"])
        writer.writerow([timestamp, mac_address, ip_address])

if __name__ == "__main__":
    while True:
        mac_address = get_mac_address()
        ip_address = get_ip_address()
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"Time: {current_time}")
        print(f"MAC Address: {mac_address}")
        print(f"IP Address: {ip_address}")
        print("-" * 40)
        
        log_to_csv(current_time, mac_address, ip_address)
        
        time.sleep(60)
