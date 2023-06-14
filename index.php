<?php
//1 задание
function numbersDescriptions() {
    $number = 0;

    do {
        if ($number == 0) {
            echo $number . " - это ноль." . "\n";
        } elseif ($number % 2 == 0) {
            echo $number . " - чётное число." . "\n";
        } else {
            echo $number . " - нечётное число." . "\n";
        }

        $number++;
    } while ($number <= 10);
}


//2 задание
function regionCity() {
    $regions = array(
        "Московская область" => array("Москва", "Зеленоград", "Клин"),
        "Ленинградская область" => array("Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"),
        "Рязанская область" => array("Рязань", "Касимов", "Сасово")
    );

    foreach ($regions as $region => $cities) {
        echo $region . ":" . "\n";

        foreach ($cities as $city) {
            echo $city . ", ";
        }

        echo "\n\n";
    }
}

//3 задание
function transliterate_string($input_string) {
    $translit_map = array(
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z',
        'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r',
        'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'kh', 'ц' => 'ts', 'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch',
        'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya'
    );

    $translation = strtr($input_string, $translit_map);
    return $translation;
}

//4 задание
$menu = [
    [
        'title' => 'Главная',
        'link' => '/',
    ],
    [
        'title' => 'О нас',
        'link' => '/about-us',
    ],
    [
        'title' => 'Подменю',
        'link' => '',
        'children' => [
            [
                'title' => 'Подменю1',
                'link' => '',
                'children' => [
                    [
                        'title' => 'Подменю1.1',
                        'link' => '',
                    ],
                    [
                        'title' => 'Подменю1.2',
                        'link' => '',
                    ]
                ]
            ],
            [
                'title' => 'Подменю2',
                'link' => '',
            ]
        ]
    ]
];

function generateMenu($menuItems) {
    echo '<ul>';
    foreach ($menuItems as $item) {
        echo '<li>';
        echo '<a href="' . $item['link'] . '">' . $item['title'] . '</a>';
        if (isset($item['children']) && !empty($item['children'])) {
            generateMenu($item['children']); // Рекурсивный вызов функции для вывода подменю
        }
        echo '</li>';
    }
    echo '</ul>';
}

//6 задание
function regionCitySymbolK()
{
    $regions = [
        'Московская область' => ['Москва', 'Зеленоград', 'Клин'],
        'Ленинградская область' => ['Санкт-Петербург', 'Всеволожск', 'Павловск', 'Кронштадт'],
        'Рязанская область' => ['Рязань', 'Касимов', 'Скопин', 'Шацк'],
    ];

    foreach ($regions as $region => $cities) {
        echo $region . ":\n";
        $filteredCities = array_filter($cities, function ($city) {
            return mb_substr($city, 0, 1, 'UTF-8') === 'К';
        });
        echo implode(', ', $filteredCities) . "\n";
    }
}
?>


