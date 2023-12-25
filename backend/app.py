import pymongo
import certifi

connection = "mongodb+srv://root:root1234@cluster0.2xl0z0f.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = pymongo.MongoClient(connection, tlsCAFile=certifi.where())
db=client.ec
collection=db.product

from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from bson import json_util

app = Flask(__name__)
CORS(app)

#商品查詢
@app.route('/product', methods=['GET', 'POST','OPTIONS'])
def info():
    if request.method == 'OPTIONS':
    # 返回支援的方法
        headers = {
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',  # 預檢請求的快取時間
            'Access-Control-Allow-Origin': '*',
        }
        return ('', 204, headers)
    elif request.method == 'POST':
        collection=db.product
        if request.json and "name" in request.json:
            name = request.json['name'] #輸入商品名稱
            data=collection.find_one({
                "name": name
            })
            if data: #回傳商品資料
                return jsonify({"name": data['name'], "price": data['price'], "type": data['type'], "url": data['url'], "description": data['description']} )
            else: #沒有資料
                message = {"Result": "NO RECORD."}
                return json.dumps(message)
        else:
            a = {}
            seq = 0
            cursor = collection.find()
            for doc in cursor:
                seq += 1
                a[seq] = doc
        
            return json.loads(json_util.dumps(a))

        
#購物車資料
@app.route('/cart', methods=['GET', 'POST','OPTIONS'])
def cart():
    if request.method == 'OPTIONS':
    # 返回支援的方法和允許的頭部
        headers = {
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',  # 預檢請求的快取時間
            'Access-Control-Allow-Origin': '*',
        }
        return ('', 204, headers)
    
    elif request.method == 'POST':
        collection=db.product #購物車
        #刪除購物車
        if request.json and "goid" in request.json:

            collection=db.cart
            id = request.json['goid']
            result = collection.delete_one({"id":id})

            return {"result":"購物車已刪除"}
        #加入購物車
        elif request.json and "name" in request.json and "amount" in request.json:
            
            name = request.json['name'] 
            amount = request.json['amount']    
            data=collection.find_one({
                "name": name #先找有沒有
            })

            price = data['price']
            total = price*amount
            collection=db.cart #購物車
            try:                
                last_id = collection.find({}, {"id": 1}, sort=[('id', -1)]).limit(1).next()
                id = last_id['id']+1
            except StopIteration:
                id = 1
            if data :
                result = collection.insert_one({"id":id, "name":name, "amount":amount, "price":price, "total":total} )

            return {"Result": "已加入購物車", "id":id, "name":name, "amount":amount, "price":price, "total":total}
        
        else: #全部購物車
            collection=db.cart #購物車
            a = {}
            seq = 0
            cursor = collection.find()
            for doc in cursor:
                seq += 1
                a[seq] = doc
            if a != {}:
                return json.loads(json_util.dumps(a))
            else:
                return {"result":"empty"}
        
        
@app.route('/check', methods=['GET', 'POST','OPTIONS'])
def check():
    if request.method == 'OPTIONS':
    # 返回支援的方法和允許的頭部
        headers = {
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',  # 預檢請求的快取時間
            'Access-Control-Allow-Origin': '*',
        }
        return ('', 204, headers)
    if request.method == 'POST':
        collection=db.cart #購物車

        if request.json and "goid" in request.json:

            goid = request.json['goid'] 
            data=collection.find_one({
                "id": goid
            })
            if data:
                name = data['name']
                price = data['price']
                amount = data['amount']
                total = data['total']
                cname = request.json['name']
                email = request.json['email']
                number = request.json['number']

                collection=db.check
                try:
                    last_id = collection.find({}, {"id": 1}, sort=[('id', -1)]).limit(1).next()
                    id = last_id['id']+1
                except StopIteration:
                    id = 130001
                #下單
                result = collection.insert_one({"id":id, "pname":name, "amount":amount, "price":price, "total":total, "name":cname, "email":email, "number":number} )
                
                #刪除購物車
                collection=db.cart
                id = request.json['goid']
                result = collection.delete_one({"id":id})

                return jsonify({"Result": "下單成功"})
            else:
                return jsonify({"Result": "NO CART"})
        
        else:
            collection=db.check
            name = request.json['name']
            number = request.json['number']
            email = request.json['email']

            a = {}
            seq = 0
            cursor = collection.find({
                "name": name,
                "number": number,
                "email": email,
            }

            )
            for doc in cursor:
                seq += 1
                a[seq] = doc
        
            return json.loads(json_util.dumps(a))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)