# e-commerce with RAJA ONGKIR
---
User Table\
firstName: REQUIRED\
lastName: REQUIRED\
username: REQUIRED\
email: REQUIRED\
password: REQUIRED

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /register | | firstName, lastName, username, email, password | Manual Registration | Object { _id, firstName, lastName, username, email, password } | Object { message: ... } 500 (Internal Server Error) |
2 | POST | /login | | username, password | Manual Login | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /google || Google Id_Token | Google Sign In | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
---
Product Table\
productName: REQUIRED\
productPicture: Not Required\
shortDescriptions: Not Required\
brand: Brands - schema.Types.ObjectId\
tags: ARRAY\
productDescriptions: REQUIRED\
normalPrice: REQUIRED\
price: REQUIRED\
quantity: REQUIRED\
weight: REQUIRED

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /products/upload | token | productName, shortDescription, tags, brand, productImage, productDescription, normalPrice, price, quantity, weight | Create a Product | res.status(201) | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /products | | | Get All Product | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
3 | GET | /products/:id | | | Get Single Product | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
---
Brand Table\
brandName: REQUIRED\
brandPicture: REQUIRED\
ProductId: Products - schema.Types.ObjectId

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /brands | token | brandName, brandImage | Create a Brand | res.status(201) | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /brands | | | Get All products | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
---
Cart Table\
UserId: Users - schema.Types.ObjectId\
ProductId: ARRAY

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /products | token | productId | Add Image to Cart | res.status(201) | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /products | token | | Get items in carts | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /products/verify-stock | token | items, quantity | Check stock before checkout | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
4 | DELETE | /products/:id | token | | Delete cart items | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
---
Address Table\
addressName: REQUIRED\
penerima: REQUIRED\
contact: REQUIRED\
alamat:REQUIRED\
cityId: REQUIRED\
cityName: REQUIRED\
provinceId: REQUIRED\
provinceName: REQUIRED\
postalCode: REQUIRED\
UserId: REQUIRED

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | GET | /couriers | token | | Get all indonesia area | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
2 | POST | /couriers | token | addressName, penerima, contact, alamat, cityId, cityName, provinceId, provinceName, postalCode | Create delivery address | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
3 | GET | /couriers/address | token | | | Get saved addresses | Object { message: ... } 500 (Internal Server Error) |
4 | POST | /couriers/cost | token | | | Get delivery cost | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
---
Transaction Table\
UserId: REQUIRED\
ProductId: Products - schema.Types.ObjectId
totalBelanja: REQUIRED\
alamatPengiriman: Address - schema.Types.ObjectId\
ongkir: REQUIRED\
totalPembayaran: REQUIRED\
statusPengiriman: REQUIRED\
statusPenerimaan: REQUIRED\
metodePembayaran: REQUIRED\
metodePengiriman: REQUIRED\
servicePengiriman: REQUIRED\
statusPembayaran: REQUIRED\
resiKirim: Not Required\
linkPembayaran: Not Required\
createdAt: Date

Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /purchase | token | allitems, items, quantity, totalBelanja, totalCost, serviceCost, fixedCourier, fixedService, pembayaran, pengiriman | Create transaction | res.status(201) | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /purchase | token | | Get all transaction | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
3 | GET | /purchase/all | | | Get all transaction (for admin) | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
4 | PUT | /purchase/:id | token | Bukti Bayar | Upload Bukti Bayar | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
5 | PUT | /purchase/resi-kirim/:id | token | resiKirim | Update resi courier | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
6 | PUT | /purchase/selesai/:id | token | | Update transaksi selesai | res.status(200) | Object { message: ... } 500 (Internal Server Error) |