<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="assets/styles/style.css">
</head>
<body>
<?php
require_once('./assets/config/config.php');

function generateProductCardHTML($product)
{
    return "
        <div class='product-card'>
            <img class='product-card__image' src='assets/img/{$product['image']}' alt='{$product['name']}' />
            <h2 class='product-card__name'>{$product['name']}</h2>
            <p class='product-card__description'>{$product['description']}</p>
            <p class='product-card__price'>Цена: {$product['price']} ₽</p>
            <a class='product-card__button' href='?id={$product['id']}'>Подробнее</a>
        </div>";
}

function generateCatalogHTML($products)
{
    $html = "<h1>Каталог</h1>";
    foreach ($products as $product) {
        $html .= generateProductCardHTML($product);
    }
    return $html;
}

function ProductDetails($product)
{
    echo "<h1>{$product['name']}</h1>";
    echo "<img class='product-details__image' src='assets/img/{$product['image']}' alt='{$product['name']}' />";
    echo "<p class='product-details__description'>{$product['description']}</p>";
    echo "<p class='product-details__price'>Цена: {$product['price']} ₽</p>";
}

try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (PDOException $e) {
    echo $e->getMessage();
}

if (!isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM products");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo generateCatalogHTML($products);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $query = $pdo->prepare('INSERT INTO reviews (product_id, author, text) VALUES (:product_id, :author, :text)');
        $query->bindParam(':product_id', $_POST['product_id'], PDO::PARAM_INT);
        $query->bindParam(':author', $_POST['author'], PDO::PARAM_STR);
        $query->bindParam(':text', $_POST['text'], PDO::PARAM_STR);
        $query->execute();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id=:id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    ProductDetails($product);

    $stmt = $pdo->prepare("SELECT * FROM reviews WHERE productId=:id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<h2>Отзывы</h2>";
    if (empty($reviews)) {
        echo "<p>Нет отзывов</p>";
    } else {
        foreach ($reviews as $review) {
            echo "<div class='review'>";
            echo "<p>{$review['review']}</p>";
            echo "<p>Автор: {$review['nameAuthor']}</p>";
            echo "</div>";
        }
    }

    echo "<a class='product-card__button' href='index.php'>Вернуться на главную страницу</a>";
}
?>
</body>
</html>