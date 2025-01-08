import java.io.*;
import java.util.*;
import java.nio.file.*;
import java.util.stream.Collectors;

public class DataProcessor {
    private List<DataRecord> records = new ArrayList<>();

    /**
     * Метод для чтения данных из текстового файла.
     * Ожидается формат строк: "Имя, Возраст, Город"
     */
    public void readFromFile(String filePath) {
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath));
            for (String line : lines) {
                // Пропускаем пустые или некорректные строки
                if (line.trim().isEmpty()) {
                    continue;
                }
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    String name = parts[0].trim();
                    int age = Integer.parseInt(parts[1].trim());
                    String city = parts[2].trim();
                    records.add(new DataRecord(name, age, city));
                }
            }
            System.out.println("Данные успешно прочитаны из файла: " + filePath);
        } catch (IOException e) {
            System.out.println("Ошибка при чтении файла: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Ошибка формата числа в файле: " + e.getMessage());
        }
    }

    /**
     * Метод для сортировки записей по имени (алфавитно).
     */
    public void sortByName() {
        records.sort(Comparator.comparing(DataRecord::getName));
        System.out.println("Данные отсортированы по имени.");
    }

    /**
     * Метод для фильтрации записей по городу.
     * Возвращает новый список, не изменяя исходный.
     */
    public List<DataRecord> filterByCity(String city) {
        return records.stream()
                .filter(record -> record.getCity().equalsIgnoreCase(city))
                .collect(Collectors.toList());
    }

    /**
     * Метод для сохранения данных в файл.
     */
    public void saveToFile(String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (DataRecord record : records) {
                writer.write(record.toString());
                writer.newLine();
            }
            System.out.println("Данные успешно сохранены в файл: " + filePath);
        } catch (IOException e) {
            System.out.println("Ошибка при сохранении файла: " + e.getMessage());
        }
    }

    /**
     * Метод для добавления новой записи в список данных.
     */
    public void addRecord(DataRecord record) {
        records.add(record);
    }

    /**
     * Метод для демонстрации всех записей.
     */
    public void printAllRecords() {
        if (records.isEmpty()) {
            System.out.println("Список записей пуст.");
        } else {
            for (DataRecord record : records) {
                System.out.println(record);
            }
        }
    }

    /**
     * Возвращает список всех записей (для дополнительной обработки, если нужно).
     */
    public List<DataRecord> getRecords() {
        return records;
    }

    public static void main(String[] args) {
        DataProcessor processor = new DataProcessor();

        // 1. Чтение данных из текстового файла
        processor.readFromFile("input.txt");

        // 2. Сортировка по имени
        processor.sortByName();

        // 3. Фильтрация по определённому городу
        String cityToFilter = "Москва";
        List<DataRecord> filtered = processor.filterByCity(cityToFilter);
        System.out.println("\nФильтрация по городу: " + cityToFilter);
        for (DataRecord record : filtered) {
            System.out.println(record);
        }

        // 4. Демонстрация текущих данных в памяти
        System.out.println("\nВсе данные после сортировки:");
        processor.printAllRecords();

        // 5. Возможность ввода данных пользователем
        Scanner scanner = new Scanner(System.in);
        System.out.println("\nХотите добавить новую запись? (y/n)");
        String answer = scanner.nextLine();
        if (answer.equalsIgnoreCase("y")) {
            System.out.print("Введите имя: ");
            String name = scanner.nextLine();

            System.out.print("Введите возраст: ");
            int age = Integer.parseInt(scanner.nextLine());

            System.out.print("Введите город: ");
            String city = scanner.nextLine();

            DataRecord newRecord = new DataRecord(name, age, city);
            processor.addRecord(newRecord);

            System.out.println("Новая запись добавлена!");
        }

        // 6. Сохранение итоговых данных в файл
        processor.saveToFile("output.txt");
    }
}
