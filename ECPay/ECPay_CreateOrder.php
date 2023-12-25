<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require_once 'ECPay.Payment.Integration.php';

$obj = new \ECPay_AllInOne();
 
//服務參數
//$obj->ServiceURL  = $_POST['ServiceURL'];

$obj->MerchantID  = '2000132';
$obj->HashKey     = '5294y06JbISpM5x9';
$obj->HashIV      = 'v77hoKGq4kWxNNIS';

 
//
// 檢查是否有 POST 資料
// if ($_SERVER["REQUEST_METHOD"] === "POST") {
//     // 印出所有 POST 資料
//     echo "Received POST data:\n";
//     foreach ($_POST as $key => $value) {
//         echo $key . ": " . $value . "\n";
//     }
// } else {
//     echo "No POST data received.";
// }

$obj->Send['MerchantTradeNo'] = $_POST['MerchantTradeNo'];
$obj->Send['MerchantTradeDate'] = $_POST['MerchantTradeDate'];
$obj->Send['PaymentType'] = $_POST['PaymentType'];
$obj->Send['TotalAmount'] = (int)$_POST['TotalAmount'];
$obj->Send['TradeDesc'] = $_POST['TradeDesc'];
$obj->Send['ChoosePayment'] = $_POST['ChoosePayment'];
//$obj->Send['CreditInstallment'] = $_POST['CreditInstallment'];

$obj->ServiceURL = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";
$obj->Send['ReturnURL'] = "https://ble.com.tw/test/ECPay_ReturnURL.php";
//$obj->Send['OrderResultURL'] = "https://ble.com.tw/test/ECPay_OrderResultURL.php";
 
$obj->Send['ClientBackURL'] = "http://127.0.0.1:3000/do-do-house/confirm"; //ECPay顯示交易結果頁.裡面帶出返回商店按鈕
 
$obj->Send['CustomField1']      = date('Y/m/d H:i:s');  	//額外的欄位
$obj->Send['CustomField2']      = "";  				  	//額外的欄位
 
//訂單的商品資料//寫個迴圈
$ItemName = $_POST['ItemName'];

// 將 JSON 字符串轉換為 PHP 陣列
$itemArray = json_decode($ItemName, true);

// 初始化 Send['Items'] 陣列
$obj->Send['Items'] = [];

// 遍歷 $itemArray 中的每個元素
foreach ($itemArray as $item) {
    // 取得每個元素的相關信息
    $name = $item['name'];
    $price = $item['price'];
    $amount = $item['amount'];

    // 添加到 Send['Items'] 陣列中
    array_push($obj->Send['Items'], array(
        'Name' => $name,
        'Price' => (int)$price,
        'Currency' => "元",
        'Quantity' => (int)$amount
    ));
}
 
//產生訂單(auto submit至ECPay)
//$obj->CheckOut();
$Response = (string)$obj->CheckOutString();
echo $Response; 
// 自動將表單送出
echo '<script>document.getElementById("__ecpayForm").submit();</script>';