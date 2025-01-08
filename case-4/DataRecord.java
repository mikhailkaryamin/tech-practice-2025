public class DataRecord {
    private String name;
    private int age;
    private String city;

    public DataRecord(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getCity() {
        return city;
    }

    @Override
    public String toString() {
        return String.format("%s, %d, %s", name, age, city);
    }
}
