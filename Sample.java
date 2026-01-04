import java.util.Arrays;

public class Sample {
    public static void main(String[] args) {
        int[] arr = { -3, 3 };
        int left = 0;
        int right = 1;

        while (left < arr.length && right < arr.length) {
            if (left % 2 != 0) {
                if (arr[left] > 0) {
                    swap(left, right, arr);
                    right++;
                } else {
                    left++;
                    right = left + 1;
                }
            } else {
                if (arr[left] < 0) {
                    swap(left, right, arr);
                    right++;
                } else {
                    left++;
                    right = left + 1;
                }
            }
        }

        System.out.println(Arrays.toString(arr));
    }

    public static void swap(int first, int second, int[] arr) {
        int temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;
    }
}