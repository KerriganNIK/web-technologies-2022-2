<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<?php
// Задание 1 и 2
function generateGallery($imagesFolderPath)
{
    $bigImagesFolder = $imagesFolderPath . 'big/';
    $smallImagesFolder = $imagesFolderPath . 'small/';
    if (is_dir($bigImagesFolder) && is_dir($smallImagesFolder)) {
        $imageFiles = array_slice(scandir($bigImagesFolder), 2);

        foreach ($imageFiles as $image) {
            $bigImagePath = $bigImagesFolder . $image;
            $smallImagePath = $smallImagesFolder . $image;

            echo '<a target="_blank" href="' . $bigImagePath . '"><img src="' . $smallImagePath . '"></a>';
        }
    }
}

generateGallery('upload/');
?>

<!-- Задание 3 -->
<form method="post" enctype="multipart/form-data" action="upload.php">
    <input type="file" name="image" accept=".jpeg,.png,.jpg">
    <input type="submit" value="Загрузить">
</form>
</body>
</html>

<?php
$messages = [
    'ok' => "Файл загружен успешно",
    'error' => "Ошибка загрузки",
];
if (!empty($_GET['status'])) {
    echo '<p>' . $messages[$_GET['status']] . '</p>';
}
?>


<?php
// Задание 4 и 5
$logFilePath = 'logs/log.txt';
$maxLogsPerFile = 10;

if (file_exists($logFilePath)) {
    $numOfLogs = count(file($logFilePath));

    if ($numOfLogs >= $maxLogsPerFile) {
        $nextLogFileNum = count(glob('logs/log*.txt'));
        $newLogFileName = 'logs/log' . $nextLogFileNum . '.txt';
        rename($logFilePath, $newLogFileName);
    }
}

file_put_contents($logFilePath, date('H:i:s d-m-Y') . PHP_EOL, FILE_APPEND);
