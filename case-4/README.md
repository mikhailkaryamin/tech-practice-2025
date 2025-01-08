# Кейс-задача № 4

## Запуск

1. Скомпилируйте Java-файлы
В Терминале перейдите в папку, где лежат ваши .java-файлы, и выполните:

```bash
javac DataRecord.java DataProcessor.java
```

Если всё прошло успешно, в этой же папке появятся файлы .class, для текущей реализации это DataRecord.class и DataProcessor.class

2. Запустите программу

```bash
java DataProcessor
```

Программа запустится, и в Терминале вы увидите вывод (например, сообщения о чтении данных из файла, результат сортировки, фильтрации и т. п.).

## Подробный анализ выполнения задачи

1. Чтение и парсинг данных
> * В методе readFromFile используется класс Files для чтения строк из файла.
> * Каждая строка разбивается на части по разделителю «запятая».
> * Производится приведение типов (строковое значение к int для возраста).

2. Обработка данных (сортировка)
> * Для сортировки используется метод sort с Comparator.comparing(DataRecord::getName).
> * Реализована алфавитная сортировка по имени (учитывая регистр и локальные особенности).

3. Обработка данных (фильтрация)
> * Для фильтрации по городу применяется метод filter, доступный в Stream API (filter(record -> ... )).
> * Получаем новый список, не изменяя оригинальные данные, что удобно для аналитических задач.

4. Объектно-ориентированный подход
> * Создан специальный класс DataRecord для хранения структуры (Имя, Возраст, Город).
> * Класс DataProcessor содержит логику чтения, сортировки, фильтрации и сохранения.
> * Разделение на два класса улучшает читаемость и масштабируемость кода.

5. Демонстрация работы
> * В main после чтения файла выводятся результаты сортировки и фильтрации.
> * Результаты выводятся на экран методом printAllRecords.

6. Добавление пользовательских данных
> * Программа спрашивает у пользователя, хочет ли он добавить новую запись.
> * При подтверждении пользователь вводит данные (Имя, Возраст, Город).
> * Новая запись добавляется в список существующих данных.

7. Сохранение результатов

> * Все данные (включая добавленные вручную) сохраняются в файл output.txt.
> * Используется BufferedWriter для записи строк в файл.

## Рекомендации по устранению выявленных ошибок

1. Проверка корректности входных данных
> * Убедитесь, что в файле input.txt нет строк с некорректным форматом, например, больше или меньше трёх элементов, нечисловое значение возраста и т.д. Если такие данные встречаются, нужно либо пропускать строку, либо сигнализировать об ошибке.

2. Обработка ошибок чтения/записи
> * Если при чтении или записи файла возникает IOException, проверьте пути к файлам, права доступа к директории и корректность имён файлов.

3. Проверка вводимых пользователем данных
> * При считывании возраста с клавиатуры может возникнуть NumberFormatException, если пользователь введёт нечисловое значение. Можно предусмотреть повторный запрос, если введённые данные некорректны.

4. Улучшение логирования
> * Вместо простых System.out.println можно использовать логгер (например, java.util.logging или Log4j) для более подробного описания возникающих ошибок и действий.

5. Валидация полей
> * Если возраст не может быть отрицательным или слишком большим, можно добавить проверки в сеттеры или в месте парсинга данных.

6. Тестирование и отладка
> * Добавить юнит-тесты (с использованием JUnit) для методов сортировки, фильтрации и чтения/записи, чтобы убедиться, что программа корректно обрабатывает граничные случаи.